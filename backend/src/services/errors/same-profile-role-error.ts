import BussinessLogicError from "../../generic/business-logic-error";

export default class SameProfileRoleError extends BussinessLogicError {
    constructor(sourceProfileId: number, targetProfileId: number) {
        super(`Can't swipe with a profile with the same role. sourceProfileId: ${sourceProfileId}, targetProfileId: ${targetProfileId}`);
    }
}