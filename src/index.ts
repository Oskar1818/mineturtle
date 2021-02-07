import {Server} from 'ws';
import * as readline from 'readline';

const wss = new Server({port: 5757});
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
let wbskts = [];
wss.on('connection', function connection(ws) {
    console.log("KOpplAD!");
    ws.on('message', function incoming(message) {
        
        console.log('Blocket är: %s',message );
        
    });
    wbskts.push(ws);
    //ws.send('getName');
    //ws.send('getBottomBlock');
    //InputHandler(ws);

});


MultiInputHandler();

function MultiInputHandler(){
    rl.question("Enter command or Exit ", function(answer) {
        
        
        
        
        switch(answer) {
            
            case 'exit':
                rl.close();
                
              break;
            case 'w':
                wbskts.forEach(element => {
                element.send("turtle.forward()");
                });
            
            case 'a':
                wbskts.forEach(element => {
                element.send("turtle.turnLeft()");});
            case 'd':
                wbskts.forEach(element => {
                element.send("turtle.turnRight()");});
            case 'q':
                wbskts.forEach(element => {
                element.send("turtle.dig()");});
            case 'e':
                wbskts.forEach(element => {
                element.send("md");});
            case 's':
                wbskts.forEach(element => {
                element.send("turtle.digUp()");});
            case 'c':
                wbskts.forEach(element => {
                element.send("turtle.down()");});
            case 'u':
                wbskts.forEach(element => {
                element.send("turtle.up()");});
            default:
                wbskts.forEach(element => {
                element.send(answer);
            });
        }
    
        
        MultiInputHandler();
  
    });
}


function InputHandler(websocket){

    rl.question("Enter command or Exit ", function(answer) {
        switch(answer) {
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