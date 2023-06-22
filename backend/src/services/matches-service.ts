import MatchModel from "../models/matches";
import SwipesService from "./swipes-service";
import { Match } from "../generic/types";

export default class MatchesService {
    static createMatch = async (
        match: Match
    ): Promise<void> => {
        const { customer_profile_id, professional_profile_id } = match;
        await MatchModel.create(match);

        await SwipesService.deleteMirrorSwipes(customer_profile_id, professional_profile_id);
    }
}