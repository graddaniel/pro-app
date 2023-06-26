import { Op } from "sequelize";

import MatchModel from "../models/matches";
import SwipesService from "./swipes-service";
import SequelizeConnection from "./sequelize-connection";

import MatchAlreadyExistsError from "./errors/match-already-exists-error";

export type Match = Pick<MatchModel, 'customer_profile_id' | 'professional_profile_id'>;

export default class MatchesService {
    static createMatch = SequelizeConnection.transaction(async (
        match: Match
    ): Promise<void> => {
        const { customer_profile_id, professional_profile_id } = match;

        await MatchModel.create(match);
        await SwipesService.deleteMirrorSwipes(customer_profile_id, professional_profile_id);
    });

    static checkMatchNotExist = async (
        firstProfileId: number,
        secondProfileId: number
    ): Promise<void> => {
        const matchExists = await MatchModel.findOne({
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

        if (matchExists) {
            throw new MatchAlreadyExistsError(firstProfileId, secondProfileId);
        }
    }
}