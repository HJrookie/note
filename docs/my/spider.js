let fs = require("fs");
let request = require("request");
let path = require("path");
const async = require("async");
const cheerio = require("cheerio");
const cookie_val = "uid=368803;";
request = request.defaults({ jar: true });
var j = request.jar();
var cookie = request.cookie(cookie_val);

// 先打开网页,然后获取 搜索结果
// let address = 'https://www.tujidao03.com/sousu/?s0=%E9%99%88%E5%B0%8F%E5%96%B5';  // 陈小喵
// let address = 'https://www.tujidao03.com/sousu/?s0=%E5%B0%8F%E6%B5%B7%E8%87%80Rena' //  小海臀Rena
let address = "https://www.tujidao03.com/sousu/?s0=%E7%8E%8B%E9%A6%A8%E7%91%B6yanni"; //王馨瑶yanni

const headers = {
    Host: "tjg.gzhuibei.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
    Accept: "*/*",
    "Accept-Encoding": "identity",
    Origin: "https://www.tujidao03.com",
    Referer: "https://www.tujidao03.com/sousu/?s0=%E9%99%88%E5%B0%8F%E5%96%B5",
    Range: "bytes=0-",
};

const errorFilePath = "./error.txt";
const errorData = [
    "https://tjg.gzhuibei.com/a/1/53333/49.jpg",
    "https://tjg.gzhuibei.com/a/1/53333/66.jpg",
    "https://tjg.gzhuibei.com/a/1/53318/13.jpg",
    "https://tjg.gzhuibei.com/a/1/52443/26.jpg",
    "https://tjg.gzhuibei.com/a/1/51372/6.jpg",
    "https://tjg.gzhuibei.com/a/1/51372/18.jpg",
    "https://tjg.gzhuibei.com/a/1/51372/57.jpg",
    "https://tjg.gzhuibei.com/a/1/51372/62.jpg",
    "https://tjg.gzhuibei.com/a/1/51372/56.jpg",
    "https://tjg.gzhuibei.com/a/1/51372/60.jpg",
    "https://tjg.gzhuibei.com/a/1/50005/77.jpg",
    "https://tjg.gzhuibei.com/a/1/50005/78.jpg",
    "https://tjg.gzhuibei.com/a/1/49995/4.jpg",
    "https://tjg.gzhuibei.com/a/1/49920/57.jpg",
    "https://tjg.gzhuibei.com/a/1/49037/31.jpg",
    "https://tjg.gzhuibei.com/a/1/48892/19.jpg",
    "https://tjg.gzhuibei.com/a/1/48892/15.jpg",
    "https://tjg.gzhuibei.com/a/1/47755/56.jpg",
    "https://tjg.gzhuibei.com/a/1/47151/45.jpg",
    "https://tjg.gzhuibei.com/a/1/47140/27.jpg",
];

const downloadImage = (src, dest, callback) => {
    request.head(src, (err, res, body) => {
        if (err) {
            console.log(err);
            return;
        }
        if (src) {
            try {
                const req = request({
                    url: src,
                    method: "get",
                    headers,
                });
                req.on("error", () => {
                    errorData.push(src);
                });

                req.pipe(
                    fs.createWriteStream(dest, {
                        flags: "w",
                        autoClose: true,
                    })
                ).on("close", () => {
                    callback && callback(null, dest);
                });
            } catch (err) { }
        }
    });
};

// downloadImage('https://tjg.gzhuibei.com/a/1/46120/22.jpg', './就是这张图.jpg', (err, data) => {
//     err ? console.log(err) : console.log(`下载成功！图片地址是：${path.resolve(data)}`)
// })

const getSuffix = (str) => str.slice(str.lastIndexOf("/") + 1);
const getSuffix2 = (str) => str.split("/").slice(-2).join("-");

// 对获取到的html 进行解析
function parseHtmlAndGetData(body) {
    const d = cheerio.load(body);
    let arr = d("li p a");
    arr = [...arr];
    //     console.log(arr[0]);
    let first = arr[0];
    const targetResult = arr.reduce((prev, cur) => {
        const title = cur.children[0].data;
        const id = +cur.attribs.href.match(/\d+/)[0];
        // const count =;
        const count = +cur.parent.prev.prev.children[0].data.match(/\d+/)[0];
        prev.push({
            id,
            title,
            count,
        });
        return prev;
    }, []);
    return targetResult;
}

// 拼接图片的地支
function formatImgSrc(data) {
    data.forEach((item) => {
        const { id, count } = item;
        const srcs = [];
        for (let i = 0; i < count; i++) {
            srcs.push(`https://tjg.gzhuibei.com/a/1/${id}/${i + 1}.jpg`);
        }
        item.srcs = srcs;
    });
    return [...data];
}

j.setCookie(cookie, address);
const tempHeader = {
    ...headers,
    Host: "tujidao.com",
};

function getErrorSrcs() {
    try {
        var data = fs.readFileSync(errorFilePath, "utf-8");
        if (data) {
            return JSON.parse(data);
        }
    } catch (err) {
        fs.writeFile(errorFilePath, "", function (err) { });
    }

    return null;
}
// 1. 先读取错误文件列表,如果有的话,就先下载这些文件

// fs.writeFile(errorFilePath, JSON.stringify(errorData), function (err) {
//     if (err) {
//         return console.log('文件写入失败！' + err.message)
//     }
// })

const errorSrcs = getErrorSrcs();
// 如果有错误,就先下载错误的
if (errorSrcs) {
    const promise = async.mapSeries(errorSrcs, function (item, callback) {
        fs.mkdirSync(`./errorImgs`, {
            recursive: true,
        });
        setTimeout(function () {
            var destImage = `${getSuffix2(item)}`;
            destImage = `./errorImgs/${destImage}/`;
            downloadImage(item, destImage, (err, data) => {
                err ? console.log(err) : console.log(path.resolve(data));
            });
            callback && callback(null, item);
        }, 300);
    });
    promise
        .then((res) => {
            fs.writeFileSync(errorFilePath, "");
        })
        .catch(() => { });
}

// request({
//     url: address,
//     jar: j,
//     tempHeader
// }, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//         // console.log(body) // Show the HTML for the baidu homepage.
//         let resultData = parseHtmlAndGetData(body)
//         resultData = formatImgSrc(resultData)
//         // 开始下载
//         // resultData.forEach((single,index) => {
//         //     async.mapSeries(single.srcs, function (item, callback) {
//         //         fs.mkdirSync(`dist/${single.title}-${single.count}P`,{
//         //             recursive: true
//         //         })
//         //         setTimeout(function () {
//         //             var destImage = `${getSuffix(item)}`;
//         //             destImage = `./dist/${single.title}-${single.count}P/${destImage}`;
//         //             downloadImage(item, destImage, (err, data) => {
//         //                 err ? console.log(err) : console.log(path.resolve(data));
//         //             });
//         //             callback && callback(null, item);
//         //         }, single * 30 * 1000 + Math.round(Math.random()* 5000));
//         //     });
//         // })

//         const promise = resultData.reduce((prev, single, index) => {
//             if (index <= 10) {
//                 return Promise.resolve()
//             }
//             return prev.then(() => {
//                 return new Promise((res, rej) => {
//                     try {

//                         setTimeout(() => {

//                             async.mapSeries(single.srcs, function (item, callback) {
//                                 fs.mkdirSync(`dist/${single.title}-${single.count}P`, {
//                                     recursive: true
//                                 })
//                                 setTimeout(function () {
//                                     var destImage = `${getSuffix(item)}`;
//                                     destImage = `./dist/${single.title}-${single.count}P/${destImage}`;
//                                     downloadImage(item, destImage, (err, data) => {
//                                         err ? console.log(err) : console.log(path.resolve(data));
//                                     });
//                                     callback && callback(null, item);
//                                 }, 300);
//                             });
//                             res()
//                         }, 30 * 1000);

//                     } catch (err) {
//                     }
//                 })
//             }).catch(err => {

//             })
//         }, Promise.resolve())

//         promise.then(() => {
// fs.writeFileSync(errorFilePath,JSON.stringify(errorData));
//             console.log('allError --------------------------------', errorData)

//         })
//     } else {
//         console.log('err', error)
//     }
// })