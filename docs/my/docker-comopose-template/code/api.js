export let api = {
    "baseUrl": "http://192.168.101.36:8899",
};
if (process.env.NODE_ENV === "production") {
    const Http = new XMLHttpRequest();
    // config.json 在打包出来的静态文件的根目录,
    Http.open("GET", "/config.json", false);
    Http.send(null);
    if (Http.readyState === 4) {
        const res = JSON.parse(Http.responseText);
        api.baseUrl = res.baseUrl;
    }
}
