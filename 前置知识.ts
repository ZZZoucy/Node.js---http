import * as http from "http";

// server 是 http.Server 的实例
// http.createServer() 返回一个 http.Server 实例
// 目前能用上的响应的事件有：
/*
    request事件：每次有请求时都会触发，每个连接可能有多个请求
    server.listen()事件：启动http监听连接，继承了net.Server，因此也拥有了几个事件和方法，目前就error、address()方法能用上
*/

const server = http.createServer();

server.on("request", (request, response) => {
    // console.log(request.constructor); // request 的构造函数是 [Function: IncomingMessage]
    // console.log(request.httpVersion); // 返回请求的版本号
    // console.log(request.url); // 返回请求的路径
    // console.log(response.constructor); // response 的构造函数是 [Function: ServerResponse]
    console.log(request.method);
    console.log(request.url);
    console.log(request.headers);
    // 获取 post 请求体的过程
    const array = [];
    // chunk 可以理解为部分数据
    request.on("data", (chunk) => {
        array.push(chunk);
    });
    request.on("end", () => {
        const body = Buffer.concat(array).toString();
        console.log("body");
        console.log(body);

        response.statusCode = 404; // 访问 localhost:8888 会出现404页面
        response.setHeader("zou", "hhhhh"); //响应头里会添加一个 zou: hhhhh

        response.write("1");
        response.write("12");
        response.write("123"); // 响应内容可以修改，write可以多次调用
        response.end("hi");
    });
});
server.listen(8888);
