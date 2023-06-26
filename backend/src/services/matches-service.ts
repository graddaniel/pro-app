
import MatchModel from "../models/matches";
import SwipesService from "./swipes-service";
import SequelizeConnection from "./sequelize-connection";

export type Match = Pick<MatchModel, 'customer_profile_id' | 'professional_profile_id'>;

export default class MatchesService {
    static createMatch = SequelizeConnection.transaction(async (
        match: Match
    ): Promise<void> => {
        const { customer_profile_id, professional_profile_id } = match;

        await MatchModel.create(match);
        await SwipesService.deleteMirrorSwipes(customer_profile_id, professional_profile_id);
    });
}