import BussinessLogicError from "../../generic/business-logic-error";

export default class SameRoleError extends BussinessLogicError {
    constructor(profileSwipedId: number) {
        super(`You can't swipe with profile ${profileSwipedId}, because you have the same role.`);
    }
}