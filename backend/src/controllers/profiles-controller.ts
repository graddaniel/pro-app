import { StatusCodes } from 'http-status-codes';


export default class ProfilesController {
    static getProfiles = async (req, res) => {
        res.status(StatusCodes.OK).send({});
    }
}