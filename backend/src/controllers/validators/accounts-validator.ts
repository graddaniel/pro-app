import {
    object,
    string,
    ValidationError as YupValidationError,
} from 'yup';
import config from 'config';

import ValidationError from './validation-error';
import configJson from '../../../config/default.json';

type ValidationConfiguration = typeof configJson.validation;

const validationConfig = config.get('validation') as ValidationConfiguration;

const newAccountSchema = object({
    username: string()
        .required()
        .matches(new RegExp(validationConfig.username.regexp))
        .min(validationConfig.username.minLength)
        .max(validationConfig.username.maxLength),
    password: string()
        .required()
        .min(validationConfig.password.minLength)
        .max(validationConfig.password.maxLength),
    email: string()
        .email()
        .required()
});

export default class AccountsValidator {
    static async validateNewAccount(newAccount) {
        try {
            return await newAccountSchema.validate(newAccount);
        } catch (error) {
            //TODO log original error
            console.log("VALIDATION", error)
            throw new ValidationError(
                (error as YupValidationError).errors[0]
            );
        }
    }
}