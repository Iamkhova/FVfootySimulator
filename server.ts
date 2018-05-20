/**
 *
 */

import Http = require('http');
import { MatchEngine} from './index';

let matchEngine : MatchEngine = new MatchEngine();

class MyServer {
    private header = {'Content-Type': 'text/plain'};

    constructor() {
        const server:Http.Server = Http.createServer(this.onRequest);
        server.listen(4000);
        console.log("Server starting..");
    }

    private onRequest(request:Http.ServerRequest, response:Http.ServerResponse):void {
        response.writeHead(200, this.header);
        matchEngine.start();
       // response.writeHead(200, 'cool');
        response.end("Hello TypeScript & node.js");
    }
}

var myServer = new MyServer();



