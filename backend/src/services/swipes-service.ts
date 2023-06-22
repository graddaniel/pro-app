import SwipeModel from "../models/swipe";
import { Swipe } from "../generic/types";
import SwipeAlreadyExistsError from "./errors/swipe-already-exists-error";
import NotAcceptedSwipeError from "./errors/not-accepted-swipe-error";

export default class SwipesService {
    public static createSwipe = async (
        swipe: Swipe
    ): Promise<void> => {
        const { source_profile_id, target_profile_id, accepted } = swipe;

        await this.checkIsSwipeNotExists(source_profile_id, target_profile_id);

        await SwipeModel.create({
            source_profile_id,
            target_profile_id,
            accepted
        });
    }

    private static checkIsSwipeNotExists = async (
        source_profile_id: number,
        target_profile_id: number
    ): Promise<void> => {
        const swipeExists = await SwipeModel.findOne({
            where: {
                source_profile_id,
                target_profile_id
            }
        });

        if (swipeExists) {
            throw new SwipeAlreadyExistsError();
        }
    }

    public static getSwipe = async (
        source_profile_id: number,
        target_profile_id: number
    ): Promise<Swipe | null> => {
        const swipe = await SwipeModel.findOne({
            where: {
                source_profile_id,
                target_profile_id
            }
        });

        return swipe;
    }

    public static deleteMirrorSwipes = async (
        firstProfileId: number,
        secondProfileId: number
    ): Promise<void> => {
        await SwipeModel.destroy({
            where: {
                source_profile_id: firstProfileId,
                target_profile_id: secondProfileId,
            }
        });

        await SwipeModel.destroy({
            where: {
                source_profile_id: secondProfileId,
                target_profile_id: firstProfileId,
            }
        });
    }
}