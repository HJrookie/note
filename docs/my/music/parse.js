let fs = require("fs");
let request = require("request");
let path = require("path");
const async = require("async");
const cheerio = require("cheerio");
const cookie_val = "Cookie: bbs_sid=5pmb8jukg4d5ne9puo2apj6iai; ";
request = request.defaults({ jar: true });
var j = request.jar();
var cookie = request.cookie(cookie_val);
const { log: l } = console;
const { resolve } = require("path");
const quotedPrintable = require("quoted-printable");
const musics = ["00-09.txt", "10-19.txt", "80-89.txt", "90-99.txt"];
const utf8 = require("utf8");
const errorData = [];
const headers = {
    accept: "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    range: "bytes=0-",
    "sec-ch-ua": '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "audio",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
    // 'Date': 'Mon, 03 Oct 2022 04:03:33 GMT',
    "Content-Type": "audio/mp4",
};
const errorFilePath = "./hanman-error.txt";
const datapath = "./data.txt";
function downloadMp3(url, pathAndName, callback) {
    // j.setCookie(cookie, encodeURI(url));

    let req = request({
        url: encodeURI(url),
        method: "get",
        headers,
        timeout: 10000,
    });

    req.on("error", (error) => {
        // fs.appendFileSync(errorFilePath, url + "\n");
        console.log("error---> ", error);

        const musicInfo = {
            filePath: pathAndName,
            musicSrc: url,
        };
        fs.appendFileSync(errorFilePath, JSON.stringify(musicInfo) + "\n");

        callback && callback(null, pathAndName);
    });

    req
        .pipe(
            fs.createWriteStream(pathAndName, {
                flags: "w",
                autoClose: true,
            })
        )
        .on("close", () => {
            callback && callback(null, pathAndName);
        })
        .on("complete", (resp, body) => {
            callback && callback(null, pathAndName);
        });
}

function encodePrintableCode(str) {
    str = quotedPrintable.encode(utf8.encode(str));
    return `https://www.hifini.com/search-${str
        .replace(/ /g, "_20")
        .replace(/\s/g, "")
        .replace(/==/, "=")
        .replace(/=/g, "_")}-1.htm`;
}
function parseHtmlAndGetData(body, user) {
    const parser = cheerio.load(body);
    const results = [...parser(".media-body .subject  a")]; //  -
    if (!results.length) {
        return null;
    }
    const resultStrArray = results.map((result) => {
        return {
            link: result.attribs.href ?? "",
            hrefName: [...result.children]
                .reduce((prev, cur) => {
                    if ("children" in cur) {
                        return prev + cur.children[0].data;
                    }
                    return prev + cur.data;
                }, "")
                .replace(/\./g, ""),
        };
    });
    user = user.toLocaleLowerCase().replace(/\./g, "");
    const targetMusic = resultStrArray.find((item) =>
        item.hrefName.toLocaleLowerCase().includes(user)
    );
    if (targetMusic) {
        return `https://www.hifini.com/${targetMusic.link}`;
    } else {
        // 选择第一个
        if (resultStrArray.length) {
            return `https://www.hifini.com/${resultStrArray[0].link}`;
        }
        return `null`;
    }
}

function getMusicSrc(body) {
    const parser = cheerio.load(body);
    const scripts = [...parser("#player4 ~ script")];
    let script = scripts[scripts.length - 1];
    let src = script?.children?.[0].data?.toString()?.match(/(?<=url\:\s\')(.*)(?=\')/)?.[0] ?? "";
    let musicSrc = src.startsWith("get") ? `https://www.hifini.com/${src}` : src;
    // console.log(333, musicSrc);
    return musicSrc;
}

function getNameAndUser(line) {
    let name = line.slice(line.indexOf(".") + 1, line.lastIndexOf("-")).replace(/\s/g, "");
    let user = line
        .slice(line.indexOf("-") + 1)
        .replace(/\s/g, "")
        .replace(/&/g, "/");
    return [name, user];
}

musics.reduce((prevM, music, ii) => {
    const data = fs.readFileSync(music, "utf-8");
    const curPath = `${music.slice(0, music.length - 4)}`;
    fs.mkdirSync(curPath, {
        recursive: true,
    });
    const lines = data.split("\n").map((v) => v.trim());
    // if ([0, 1,].includes(ii)) {
    //     return Promise.resolve();
    // }
    return prevM.then(() => {
        return new Promise((res1, rej1) => {
            lines.reduce((prev, line, i) => {
                if (i === 0) {
                    return Promise.resolve();
                }
                // if (ii === 2) {
                //     if (i <= 93) {
                //         return Promise.resolve();
                //     }
                // }
                let [musicName, user] = getNameAndUser(line);
                return prev.then(() => {
                    return new Promise((resolve, reject) => {
                        console.log(1, musicName, user, encodePrintableCode(musicName));
                        request(
                            {
                                url: encodePrintableCode(musicName),
                            },
                            (error, response, body) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                const url = parseHtmlAndGetData(body, user);
                                // console.log(2, url);
                                if (url == "null") {
                                    fs.appendFileSync(
                                        datapath,
                                        JSON.stringify({
                                            name: musicName,
                                            filePath: `${curPath}/${line}.mp3`,
                                            musicSrc: "null",
                                        }) + "\n"
                                    );
                                    resolve();
                                    return;
                                }
                                request(
                                    {
                                        url,
                                    },
                                    (error, response, body) => {
                                        if (!body) {
                                            fs.appendFileSync(errorFilePath, musicName + "  url error->" + url + "\n");
                                        }
                                        const musicSrc = getMusicSrc(body);
                                        const musicInfo = {
                                            name: musicName,
                                            filePath: `${curPath}/${line}.mp3`,
                                            musicSrc: "null",
                                        };

                                        console.log(3, musicSrc, new Date().toLocaleString());
                                        if (!musicSrc) {
                                            fs.appendFileSync(errorFilePath, JSON.stringify(musicInfo) + "\n");
                                            console.log(`download -> ${musicInfo.filePath} -->  failed`);
                                            resolve();
                                            if (i === lines.length - 1) {
                                                res1();
                                            }
                                        } else {
                                            downloadMp3(musicSrc, `${musicInfo.filePath}`, async () => {
                                                resolve();
                                                if (i === lines.length - 1) {
                                                    res1();
                                                }
                                                console.log(`download -> ${musicInfo.filePath} -->  success`);
                                            });
                                        }
                                    }
                                );
                            }
                        );
                    });
                });
            }, Promise.resolve());
        });
    });
}, Promise.resolve());
