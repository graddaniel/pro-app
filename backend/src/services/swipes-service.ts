
import { Transaction } from "sequelize";
import SwipeModel from "../models/swipe";
import SwipeAlreadyExistsError from "./errors/swipe-already-exists-error";
import SequelizeConnection from "./sequelize-connection";

export type Swipe = Pick<SwipeModel, 'source_profile_id' | 'target_profile_id' | 'accepted'>;

export default class SwipesService {
    public static createSwipe = async (
        swipe: Swipe
    ): Promise<void> => {
        const { source_profile_id, target_profile_id, accepted } = swipe;

        await this.checkSwipeNotExists(source_profile_id, target_profile_id);

        await SwipeModel.create({
            source_profile_id,
            target_profile_id,
            accepted
        });
    }

    private static checkSwipeNotExists = async (
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
        secondProfileId: number,
    ): Promise<void> => {
        SequelizeConnection.transaction()(async () => {
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
}