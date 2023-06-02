import BussinessLogicError from '../../generic/business-logic-error';

export default class AccountAlreadyExists extends BussinessLogicError {
    constructor(
        username: string,
        email: string
    ) {
        super(`Account with username: ${username} or email: ${email} already exists.`);
    }
}