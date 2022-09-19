import { Request, Response } from "express";
import URL from '../URL-model'
import { customAlphabet } from 'nanoid'


const shortedURL = async (req: Request<IshortedURLRequest>, res: Response<IshortedURLResponse>): Promise<void> => {
    const { url } = req.body
    const urlExist = await URL.findOne({ url })
    if (urlExist) res.status(201).json({ message: `http://localhost:8000/${urlExist.id}`, type: "success" })
    else {
        const nanoid = customAlphabet(url, 10)
        let id: string = nanoid(10).replace(/[/]/g, '*');
        let newURL = new URL({ url, id, visitedCounter: 0 });
        try {
            await newURL.save()
        }
        catch {
            res.status(500).json({ message: "An error was encountered! Please try again.", type: "failure" });
        }
        res.status(201).json({ message: `http://localhost:8000/${newURL.id}`, type: "success" });
    }
}

export default shortedURL

interface IshortedURLRequest { url: string }
interface IshortedURLResponse { message: string, type: string }