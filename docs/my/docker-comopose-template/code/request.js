import { api } from "@/api/api";
const service = axios.create({
    // 如果写了 baeURL,那么 webpack 的 devserver 就会失效
    baseURL: api.baseUrl,
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000, // request timeout
});

export default service;
export { service };
