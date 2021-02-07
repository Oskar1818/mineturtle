local connectionURL = "ws://2.tcp.ngrok.io:15763"
local ws, err = http.websocket(connectionURL)
if not ws then
    return printError(err)
end


while true do
    local message = ws.receive()
    if message == nil then
        ws.close()
        print("> RECONNECTING...")
        ws, err = http.websocket(connectionURL)
        if not ws then
            return printError(err)
        end
        print("> CONNECTED")
    else
        print(message)
        if message == "getName" then
            ws.send("{\"type\":\"name\",\"data\":\"Jalle\"}")
        elseif message == "getBottomBlock" then
            local isBlock, blockData = turtle.inspectDown()
            ws.send(blockData)
        elseif message == "md" then
            turtle.digDown()
            turtle.down()
        else
            local f,err = loadstring(message)
            if err == nil then
                local result = {f()}
            else
                print(err)
            end
        end
    end
end