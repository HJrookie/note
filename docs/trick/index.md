#### config.json
```js
// api/api.js
export let api = {
    "baseUrl": "http://10.110.197.38:8080",
};
if (import.meta.env.VITE_APP_ENV === "production") {
    // if (process.env.NODE_ENV === 'development') {
    const Http = new XMLHttpRequest();
    Http.open("GET", "/config.json", false);
    Http.send(null);
    if (Http.readyState === 4) {
        const res = JSON.parse(Http.responseText);
        api.baseUrl = res.baseUrl;
    }
}
//  other js file
import {api} from "@/api/api";
```