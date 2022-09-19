import path from "path";
import { Request, Response } from "express";

const sendTinyURLHTMLPage = (req: Request, res: Response): void => {
    res.sendFile(path.resolve() + "/src/client/index.html");
}

export default sendTinyURLHTMLPage