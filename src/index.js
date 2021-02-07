"use strict";
exports.__esModule = true;
var ws_1 = require("ws");
var readline = require("readline");
var wss = new ws_1.Server({ port: 5757 });
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var wbskts = [];
wss.on('connection', function connection(ws) {
    console.log("KOpplAD!");
    ws.on('message', function incoming(message) {
        console.log('Blocket är: %s', message);
    });
    wbskts.push(ws);
    //ws.send('getName');
    //ws.send('getBottomBlock');
    //InputHandler(ws);
});
MultiInputHandler();
function MultiInputHandler() {
    rl.question("Enter command or Exit ", function (answer) {
        switch (answer) {
            case 'exit':
                rl.close();
                break;
            case 'w':
                wbskts.forEach(function (element) {
                    element.send("turtle.forward()");
                });
            case 'a':
                wbskts.forEach(function (element) {
                    element.send("turtle.turnLeft()");
                });
            case 'd':
                wbskts.forEach(function (element) {
                    element.send("turtle.turnRight()");
                });
            case 'q':
                wbskts.forEach(function (element) {
                    element.send("turtle.dig()");
                });
            case 'e':
                wbskts.forEach(function (element) {
                    element.send("md");
                });
            case 's':
                wbskts.forEach(function (element) {
                    element.send("turtle.digUp()");
                });
            case 'c':
                wbskts.forEach(function (element) {
                    element.send("turtle.down()");
                });
            case 'u':
                wbskts.forEach(function (element) {
                    element.send("turtle.up()");
                });
            default:
                wbskts.forEach(function (element) {
                    element.send(answer);
                });
        }
        MultiInputHandler();
    });
}
function InputHandler(websocket) {
    rl.question("Enter command or Exit ", function (answer) {
        switch (answer) {
            case 'exit':
                rl.close();
                break;
            case 'w':
                websocket.send("turtle.forward()");
            case 'a':
                websocket.send("turtle.turnLeft()");
            case 'd':
                websocket.send("turtle.turnRight()");
            case 'q':
                websocket.send("turtle.dig()");
            case 'e':
                websocket.send("md");
            case 's':
                websocket.send("turtle.digUp()");
            case 'c':
                websocket.send("turtle.down()");
            case 'u':
                websocket.send("turtle.up()");
            default:
                websocket.send(answer);
        }
        InputHandler(websocket);
    });
}
