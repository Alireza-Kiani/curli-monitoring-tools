import { RequestHandler } from 'express';
import ApiService, { Fetch } from './service';
import Statistics from '../stats';
import { LinkMonitor } from '../@types/input';

class ApiController {

    saveLink: RequestHandler = async (req, res) => {
        try {
            const link: string = req.body.link;
            const stats = new Statistics(req.body);
            const fetch: Fetch = await ApiService.saveLink(stats, link);
            return res.status(200).send({ stats });
        } catch (error) {
            console.log(error);
            
            return res.status(400).send({ error: error.message });
        }
    }

    saveSite: RequestHandler = async (req, res) => {
        try {
            const domain: string = req.body.domain;
            const stats = new Statistics(req.body);
            const fetch: Fetch = await ApiService.saveSite(stats, domain);
            return res.status(200).send({ message: 'Saved successfully' });
        } catch (error) {
            console.log(error);
            
            return res.status(400).send({ error: error.message });
        }
    }

    getStats: RequestHandler = async (req, res) => {
        try {
            const { field } = req.query;            
            const stats: LinkMonitor[] = await ApiService.getLinkStats(req.params.input, field as string);
            const Analyzed: Statistics = new Statistics(stats);
            return res.status(200).send({ analyzed: Analyzed });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

}

export default (new ApiController());