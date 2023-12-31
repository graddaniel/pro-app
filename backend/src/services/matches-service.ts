import { Op } from "sequelize";

import MatchModel from "../models/matches";
import SwipesService from "./swipes-service";
import SequelizeConnection from "./sequelize-connection";

export type Match = Pick<MatchModel, 'customer_profile_id' | 'professional_profile_id'>;

export default class MatchesService {
    private swipesService: SwipesService;

    constructor(swipesService: SwipesService) {
        this.swipesService = swipesService;
    }

    createMatch = SequelizeConnection.transaction(async (
        match: Match
    ): Promise<void> => {
        const { customer_profile_id, professional_profile_id } = match;

        await MatchModel.create(match);
        await this.swipesService.deleteMirrorSwipes(customer_profile_id, professional_profile_id);
    });

    getMatch = async (
        firstProfileId: number,
        secondProfileId: number
    ): Promise<Match | null> => {
        return await MatchModel.findOne({
            where: {
                [Op.or]: [
                    {
                        customer_profile_id: firstProfileId,
                        professional_profile_id: secondProfileId
                    },
                    {
                        customer_profile_id: secondProfileId,
                        professional_profile_id: firstProfileId
                    }
                ]
            }
        });
    }

    checkIfMatchExist = async (
        firstProfileId: number,
        secondProfileId: number
    ): Promise<boolean> => {
        return await this.getMatch(firstProfileId, secondProfileId) ? true : false;
    }
}