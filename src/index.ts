import express from "express";
import path from "path";
import { createBAsicAppWithExpress, mongoDBConnection } from "@APIQuickConfiguration/index";
import { sendTinyURLHTMLPage, shortedURL, redirectsToOriginaPage , visitedCounter} from "@TinyURL/index";
import cluster from 'node:cluster';
import { cpus } from 'node:os';

const totalCPUs: number = cpus().length
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    const app = createBAsicAppWithExpress()
    app.use(express.static(path.resolve() + "/src/client"));
    app.get("/", sendTinyURLHTMLPage);
    app.post("/shortedURL", shortedURL);
    app.post('/visited', visitedCounter)
    app.get("/:id", redirectsToOriginaPage)
    mongoDBConnection()
    console.log(`Worker ${process.pid} started`);
}