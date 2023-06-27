
import SwipeModel from "../models/swipe";
import SwipeAlreadyExists from "./errors/swipe-already-exists-error";
import SequelizeConnection from "./sequelize-connection";

export type Swipe = Pick<SwipeModel, 'source_profile_id' | 'target_profile_id' | 'accepted'>;

export default class SwipesService {
    static createSwipe = async (
        swipe: Swipe
    ): Promise<void> => {
        const { source_profile_id, target_profile_id } = swipe;

        if (await this.checkSwipeExists(source_profile_id, target_profile_id)) {
            throw new SwipeAlreadyExists();
        }

        await SwipeModel.create(swipe);
    }

    static getSwipe = async (
        source_profile_id: number,
        target_profile_id: number
    ): Promise<Swipe | null> => {
        return await SwipeModel.findOne({
            where: {
                source_profile_id,
                target_profile_id
            }
        });
    }

    static checkSwipeExists = async (
        source_profile_id: number,
        target_profile_id: number
    ): Promise<boolean> => {
        return await this.getSwipe(source_profile_id, target_profile_id) ? true : false;
    }

    static deleteMirrorSwipes = SequelizeConnection.transaction(async (
        firstProfileId: number,
        secondProfileId: number,
    ): Promise<void> => {
        await SwipeModel.destroy({
            where: {
                source_profile_id: firstProfileId,
                target_profile_id: secondProfileId
            }
        });

        await SwipeModel.destroy({
            where: {
                source_profile_id: secondProfileId,
                target_profile_id: firstProfileId
            }
        });
    });
}