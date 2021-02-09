import {Server} from 'ws';
import * as readline from 'readline';
import { stringify } from 'querystring';

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
class  PayLoad{
    data:any;
    type:string;
}
function MultiInputHandler(){
    rl.question("Enter command or Exit ", function(answer) {
        
        let payload = new PayLoad();

        
        switch (answer) {
            case 'exit':
                rl.close();
                break;
            case 'w':
                payload.type = "Move";
                payload.data = "Forward";           
            case "x":
                payload.type ="MultiMove";
                payload.data = 
                    {steps:[
                        "Forward",
                        "Forward",
                        "Up", 
                        "Back",
                        "Down",
                        "Up", 
                        "Forward",
                        "Forward",
                        "Up"
                    ]}
         
            
            
        }
        console.log("Sending %s",JSON.stringify(payload) )
        wbskts.forEach(function (element) {
            element.send(JSON.stringify(payload));
        });
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