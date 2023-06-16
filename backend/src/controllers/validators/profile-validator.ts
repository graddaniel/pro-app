import {
    number,
    object,
    string,
    ValidationError as YupValidationError
} from 'yup';

import config from 'config';

import ValidationError from './validation-error';
import { AccountRoles } from '../../generic/constants';
import configJson from '../../../config/default.json';

type ValidationConfiguration = typeof configJson.validation;

const validationConfig = config.get('validation') as ValidationConfiguration;

const newProfileSchema = object({
    name: string()
        .required()
        .matches(new RegExp(validationConfig.name.regexp))
        .min(validationConfig.name.minLength)
        .max(validationConfig.name.maxLength),
    age: number().required(),
    description: string()
        .required()
        .min(validationConfig.description.minLength)
        .max(validationConfig.description.maxLength),
    role: string()
        .oneOf(Object.values(AccountRoles))
        .required()
});

export default class ProfileValidator {
    static async validateNewProfile(newProfile) {
        try {
            return await newProfileSchema.validate(newProfile);
        } catch (error) {
            //TODO log original error
            console.log('VALIDATION', error);
            throw new ValidationError((error as YupValidationError).errors[0]);
        }
    }
}
