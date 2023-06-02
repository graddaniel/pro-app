import BussinessLogicError from '../../generic/business-logic-error';

export default class ProfileAlreadyExists extends BussinessLogicError {
    constructor(
        username: string,
        email: string
    ) {
        super(`Profile with username: ${username} or email: ${email} already exists.`);
    }
}