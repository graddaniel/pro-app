import {
    object,
    number,
    boolean,
    ValidationError as YupValidationError
} from 'yup';

import ValidationError from './validation-error';

const newSwipeSchema = object({
    id: number().required(),
    accepted: boolean().required()
});

export default class SwipeValidator {
    static async validateNewSwipe(newSwipe) {
        try {
            return await newSwipeSchema.validate(newSwipe);
        } catch (error) {
            console.log("VALIDATION", error)
            throw new ValidationError(
                (error as YupValidationError).errors[0]
            );
        }
    }
}