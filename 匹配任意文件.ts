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
    // response.setHeader('Content-Type', 'text/html;charset=ute-8')
    //     /index.html => index.html
    const filename = pathname.substr(1);
    // 只要文件路径存在就可以访问
    fs.readFile(p.resolve(publicDir, filename), (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.end("文件不存在");
        } else {
            response.end(data.toString());
        }
    });
});
server.listen(8888);
