import * as http from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";

const server = http.createServer();
// __dirname 指当前文件
const publicDir = p.resolve(__dirname, "public");
let cacheAge = 3600 * 24 * 365;

server.on("request", (request, response) => {
    const { method, url: path, headers } = request;
    // 将参数忽略
    const { pathname, search } = url.parse(path);

    // 处理不是 GET 的请求
    if (method !== "GET") {
        response.statusCode = 405;
        response.end("这是一个假响应");
        return;
    }

    // response.setHeader("Content-Type", "text/html;charset=ute-8");
    //     /index.html => index.html
    let filename = pathname.substr(1);
    if (filename === "") {
        filename = "index.html";
    }
    // 只要文件路径存在就可以访问
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
        if (error) {
            if (error.errno === -4058) {
                response.statusCode = 404;
                fs.readFile(p.resolve(publicDir, "404.html"), (error, data) => {
                    response.end(data);
                });
            } else if (error.errno === -4068) {
                response.statusCode = 403;
                response.end("无权查看目录内容");
            } else {
                response.statusCode = 500;
                response.end("服务器繁忙，稍后再试");
            }
        } else {
            // 设置缓存
            response.setHeader("Cache-Control", `public,max-age=${cacheAge}`);
            response.end(data);
        }
    });
});
server.listen(8888);
