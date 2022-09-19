import { Request, Response } from "express";
import URL from '../URL-model'

const redirectsToOriginaPage = async (req: Request<IRedirectsRequest>, res: Response<IRedirectsResponse>): Promise<void> => {
    const id = req.params.id;
    const originalLink = await URL.findOneAndUpdate({ id }, { $inc: { visitedCounter: 1 } });
    if (!originalLink) {
        res.status(404).end()
    }
    res.redirect(originalLink!.url);
}



export default redirectsToOriginaPage
interface IRedirectsRequest { id: string }
interface IRedirectsResponse { }