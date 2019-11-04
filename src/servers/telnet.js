import telnet from "telnet";
let server;
export function enableTelnet() {
    server = telnet.createServer(function (client) {
        // make unicode characters work properly
        client.do.transmit_binary();
        // listen for the actual data from the client
        client.on('data', function (b) {
            console.log(b.toString());
            client.write("\n");
        });
        client.on('error', function(e) {
            if(e.code === "ECONNRESET" || e.code ==="ECONNABORTED") {
                console.log("Telnet client quit unexpectedly.");
            } else {
                console.error("Telnet server error:", e);
            }
        });
        client.write("Connected to Telnet server!\n");
    }).listen(8085);
    if (server) {
        console.log("Telnet server started listening port 8085");
    }
}

export function disableTelnet() {
    if (server) {
        server.close();
    }
}