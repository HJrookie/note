// oicq   https://github.com/takayama-lily/oicq
let fs = require("fs");
let request = require("request");
let path = require("path");
const async = require("async");
const cheerio = require("cheerio");
const cookie_val = "uid=368803;";
request = request.defaults({ jar: true });
var j = request.jar();
var cookie = request.cookie(cookie_val);

const user = 2877330374, password = '1234560.aA7423';
const { createClient } = require("oicq")
const client = createClient(user)

client.on("system.login.slider", function (e) {
    console.log("输入ticket")
    process.stdin.once("data", ticket => this.submitSlider(String(ticket).trim()))
}).login(password)


let address = "https://www.virtono.com/index.php?rp=/store/cloud-vps-1";
// 对获取到的html 进行解析
function parseHtmlAndGetData(body) {
    const parser = cheerio.load(body);
    let dom = parser("#order-standard_cart .products .product header .qty");
    const message = dom[0].children[0].data.trim() ?? '';
    const count = +(message[0] ?? 0) ?? 0;
    if (count) {
        const friend = client.pickFriend(1181400768);
        friend.sendMsg('virtono  --> ' + count).catch(err => {
            console.log('send msg error ------->', err)
        })
    }
    console.log(`count --------------------> `, count, '                 ------------>', new Date().toLocaleTimeString())
}


setInterval(() => {
    request({
        url: address,
        jar: j,
    },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                // console.log("err", error);
            } else {
                parseHtmlAndGetData(body);
            }
        })
}, (30 * 1000));