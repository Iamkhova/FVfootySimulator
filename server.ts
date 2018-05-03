/**
 *
 */

import Http = require('http');
import MatchEngine = require('./index');

class MyServer {
    private header = {'Content-Type': 'text/plain'};

    constructor() {
        var server:Http.Server = Http.createServer(this.onRequest);
        server.listen(4000);
        console.log("Server starting..");
    }

    private onRequest(request:Http.ServerRequest, response:Http.ServerResponse):void {
        var match : any;
        response.writeHead(200, this.header);
        match = MatchEngine.helloWorld(request,response);
        response.writeHead(200, match);
        response.end("Hello TypeScript & node.js");
    }
}

var myServer = new MyServer();



