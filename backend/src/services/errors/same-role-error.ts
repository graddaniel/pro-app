import BussinessLogicError from "../../generic/business-logic-error";

export default class SameRoleError extends BussinessLogicError {
    constructor() {
        super(`You can't swipe with profile on the same role.`);
    }
}