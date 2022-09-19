import { Request, Response } from "express";
import URL from '../URL-model'

const visitedCounter = async (req: Request<IvisitedCounterRequest>, res: Response<IvisitedCounterResponse>) => {
    const id = req.body.url.split('8000/')[1];
    try {
        const url = await URL.findOne({ id });
        res.status(201).json({ visitedCounter: url?.visitedCounter })
    }
    catch {
        res.status(500).end()
    }
}

export default visitedCounter

interface IvisitedCounterRequest { url: string }
interface IvisitedCounterResponse { }