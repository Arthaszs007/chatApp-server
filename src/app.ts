import express from 'express';
import router  from "./router";
import { createSocketServer } from './lib/socket/socket';

const app = express();
const PORT = process.env.PORT;


// Middleware to parse JSON bodies
app.use(express.json());

// create socket.io server with a port
createSocketServer(3001);

// register the router list
app.use(router);
console.log("------ router list is loaded ------")


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log(`------ server running on ${PORT} ------`)