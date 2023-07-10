import BusinessLogicError from "../../generics/business-logic-error";

export default class AccountHasNoProfileError extends BusinessLogicError {
    constructor() {
        super(`Account has no profile`);
    }
}