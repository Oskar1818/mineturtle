if not fs.exists("json") then
    local request = http.get("https://pastebin.com/raw/4nRg9CHU")
    local fr = fs.open("json","w")
    fr.write(request.readAll())
    fr.close()
    
end
os.loadAPI("json")
if os.getComputerLabel() == nil then
    os.setComputerLabel("Unnamed Turtle")	
end
local ComputerName = os.getComputerLabel();
local connectionURL = "ws://localhost:5757"
local ws, err = http.websocket(connectionURL)
if not ws then
    return printError(err)
end


while true do
    local message = ws.receive()
    if message == nil then
        ws.close()
        
        ws, err = http.websocket(connectionURL)
        if not ws then
            return printError(err)
        end
    else
        msg = json.decode(message)
        
        
        if msg.type == "SetName" then
            os.setComputerLabel(msg.data)
        elseif msg.type == "Dig" then
            if msg.data == "Forward" then
                turtle.dig()
            elseif msg.data == "Down" then 
                turtle.digDown()
            else
                turtle.digUp()
            end
        elseif msg.type == "Move" then
            print(msg.type)
            print(msg.data)
            if msg.data == "Forward" then
                print(msg.type)
                print(msg.data)
                turtle.forward()
            elseif msg.data == "Back" then 
                turtle.back()
            elseif msg.data == "Up" then 
                turtle.up()
            else
                turtle.down()
            end
        elseif msg.type =="MultiMove" then
            for step in json.decode(msg.data) do
                if step == "Forward" then
                    
                    turtle.forward()
                elseif step == "Back" then 
                    turtle.back()
                elseif step == "Up" then 
                    turtle.up()
                else
                    turtle.down()
                end
        end
    end
end