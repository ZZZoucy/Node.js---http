import * as http from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";

const server = http.createServer();
// __dirname 指当前文件
const publicDir = p.resolve(__dirname, "public");

server.on("request", (request, response) => {
    const { method, url: path, headers } = request;
    // 将参数忽略
    const { pathname, search } = url.parse(path);
    switch (pathname) {
        case "/index.html":
            // 设置文件内容的类型
            response.setHeader("Content-Type", "text/html;charset=utf-8");
            // fs.readFile  读取文件
            fs.readFile(p.resolve(publicDir, "index.html"), (error, data) => {
                if (error) throw error;
                response.end(data.toString());
            });
            break;
        case "/style.css":
            // 设置文件内容的类型
            response.setHeader("Content-Type", "text/css;charset=utf-8");
            // fs.readFile  读取文件
            fs.readFile(p.resolve(publicDir, "style.css"), (error, data) => {
                if (error) throw error;
                response.end(data.toString());
            });
            break;
        case "/main.js":
            // 设置文件内容的类型
            response.setHeader("Content-Type", "text/javascript;charset=utf-8");
            // fs.readFile  读取文件
            fs.readFile(p.resolve(publicDir, "main.js"), (error, data) => {
                if (error) throw error;
                response.end(data.toString());
            });
            break;
        default:
            response.statusCode = 404;
            response.end();
    }
});
server.listen(8888);
