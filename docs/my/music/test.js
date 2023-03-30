// let fs = require("fs");
// let request = require("request");
// let path = require("path");
// const async = require("async");
// const cheerio = require("cheerio");
// const cookie_val = "uid=368803;";
// request = request.defaults({ jar: true });
// var j = request.jar();
// var cookie = request.cookie(cookie_val);
// const { log: l } = console;
// const { resolve } = require("path");
// const quotedPrintable = require("quoted-printable");
// const musics = ["00-09.txt", "10-19.txt", "80-89.txt", "90-99.txt"];
// const utf8 = require("utf8");
// const errorData = [];
// const headers = {
//     accept: "*/*",
//     "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
//     range: "bytes=0-",
//     "sec-ch-ua": '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": '"Windows"',
//     "sec-fetch-dest": "audio",
//     "sec-fetch-mode": "no-cors",
//     "sec-fetch-site": "cross-site",
// };
// const errorFilePath = "./hanman-error.txt";
// function downloadMp3(url, pathAndName, callback) {
//     let req = request({
//         url: url,
//         method: "get",
//         headers,
//     });

//     req.on("error", () => {
//         fs.appendFileSync(errorFilePath, url + "\n");
//         console.log("err;r", error);
//     });

//     req
//         .pipe(
//             fs.createWriteStream(pathAndName, {
//                 flags: "w",
//                 autoClose: true,
//             })
//         )
//         .on("close", () => {
//             callback && callback(null, pathAndName);
//         });
// }

// function encodePrintableCode(str) {
//     str = quotedPrintable.encode(utf8.encode(str));
//     return `https://www.hifini.com/search-${str.replace(/=/g, "_").replace(/ /g, "_20")}-1.htm`;
// }

// function parseHtmlAndGetData(body) {
//     const parser = cheerio.load(body);
//     const results = [...parser(".media-body a")]; //  -
//     if (!results.length) {
//         return null;
//     }
//     let url = `https://www.hifini.com/${results[0].attribs.href}`;

//     // console.log(results[0].attribs.href)

//     return url;
// }

// function getMusicSrc(body) {
//     const parser = cheerio.load(body);
//     const scripts = [...parser("#player4 ~ script")];
//     let script = scripts[scripts.length - 1];
//     let musicSrc = `https://www.hifini.com/${script.children[0].data.toString().match(/get_.*(?=\')/)?.[0] ?? ""
//         }`;
//     // console.log(333, musicSrc);
//     return musicSrc;
// }

// // request(
// //     {
// //         url: 'https://www.hifini.com/search-_E5_8F_AA_E5_AF_B9_E4_BD_A0_E6_9C_89_E6_84_9F_E8_A7_89_2d_E9_A3_9E_E8_BD_AE_E6_B5_B7-1.htm',
// //     },
// //     (error, response, body) => {
// //         const parser = cheerio.load(body);
// //         const results = [...parser(".media-body a")]; //  -
// //         console.log(222, results.length)
// //     }
// // );

// function getMusicSrc(body) {
//     const parser = cheerio.load(body);
//     const scripts = [...parser("#player4 ~ script")];
//     let script = scripts[scripts.length - 1];
//     let musicSrc = `https://www.hifini.com/${script?.children?.[0].data?.toString()?.match(/(?<=url\:\s\')(.*)(?=\')/)?.[0] ?? ""
//         }`;
//     // console.log(333, musicSrc);
//     return musicSrc;
// }

// function parseHtmlAndGetData(body, user) {
//     const parser = cheerio.load(body);
//     const results = [...parser(".media-body .subject  a")]; //  -
//     if (!results.length) {
//         return null;
//     }
//     const resultStrArray = results.map((result) => {
//         return {
//             link: result.attribs.href ?? "",
//             hrefName: [...result.children]
//                 .reduce((prev, cur) => {
//                     if ("children" in cur) {
//                         return prev + cur.children[0].data;
//                     }
//                     return prev + cur.data;
//                 }, "")
//                 .replace(/\./g, ""),
//         };
//     });
//     user = user.toLocaleLowerCase().replace(/\./g, "");
//     console.log(2, user, resultStrArray);
//     const targetMusic = resultStrArray.find((item) =>
//         item.hrefName.toLocaleLowerCase().includes(user)
//     );
//     if (targetMusic) {
//         return `https://www.hifini.com/${targetMusic.link}`;
//     } else {
//         return `null`;
//     }
// }

// function getNameAndUser(line) {
//     let name = line.slice(line.indexOf(".") + 1, line.lastIndexOf("-")).replace(/\s/g, '');
//     let user = line.slice(line.indexOf("-") + 1).replace(/\s/g, '').replace(/&/g, '/');
//     return [name, user];
// }

// let data = { "name": "夜空中最亮的星", "filePath": "夜空中最亮的星-逃跑计划.mp3", "musicSrc": "https://www.hifini.com/get_music.php?key=yHbGHPAtbg/DNRlXp5ySrZHllrood6YYBRgJarbgVhvENV4nyBLTF3LMlA6JdQ" }


// function downloadMp3(url, pathAndName, callback) {
//     let req = request({
//         url: encodeURI(url),
//         method: "get",
//         headers,
//     });

//     req.on("error", (error) => {
//         fs.appendFileSync(errorFilePath, url + "\n");
//         console.log("err;r", error);
//     });

//     req
//         .pipe(
//             fs.createWriteStream(pathAndName, {
//                 flags: "w",
//                 autoClose: true,
//             })
//         )
//         .on("close", () => {
//             callback && callback(null, pathAndName);
//         })
//         .on("complete", (resp, body) => {
//             callback && callback(null, pathAndName);
//         });
// }
// // downloadMp3(data.musicSrc, data.filePath, () => {
// //     console.log('success', data.name)
// // })

/* TODO:  setTimeout & setImmediate */
