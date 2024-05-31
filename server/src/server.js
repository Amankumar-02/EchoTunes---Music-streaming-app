import dotenv from 'dotenv';
import {app, port} from './app.js';
import DB_Connect from './db/index.js';
import {readDirectory} from './controllers/media.controller.js';

dotenv.config({path: "./.env"});

DB_Connect().then(()=>{
    readDirectory();
})
.then(()=>{
    app.listen(port, ()=>{
        console.log("Server in running on port: ", port);
    });
})
.catch(err=>console.log(err))