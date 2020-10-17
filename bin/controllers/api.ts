import { RequestHandler } from 'express';
import ApiService, { Fetch } from './service';
import Statistics from '../stats';
import { LinkMonitor } from '../@types/input';

class ApiController {

    saveLink: RequestHandler = async (req, res) => {
        try {
            const stats = new Statistics(req.body);
            await ApiService.saveLink(stats);
            return res.status(200).send({ stats });
        } catch (error) {
            return res.status(400).send({ error: error.message });
        }
    }

    saveSite: RequestHandler = async (req, res) => {
        try {
            console.log(req.body);
            
            const stats = new Statistics(req.body);
            const fetch: Fetch = await ApiService.saveSite(stats);
            console.log(fetch.parsed_response);
            
            return res.status(200).send({ message: 'Saved successfully' });
        } catch (error) {
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