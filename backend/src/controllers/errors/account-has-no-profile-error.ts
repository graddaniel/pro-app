import BussinessLogicError from "../../generic/business-logic-error";

export default class AccountHasNoProfileError extends BussinessLogicError {
    constructor(accountId: number) {
        super(`Account with id ${accountId} has no profile`);
    }
}
