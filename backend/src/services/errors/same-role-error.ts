import BussinessLogicError from "../../generic/business-logic-error";

export default class SameRoleError extends BussinessLogicError {
    constructor(profileCalledId: number, profileSwipedId: number) {
        super(`You can't swipe with profile on the same role. Profiles [called, swiped] id: [${profileCalledId}, ${profileSwipedId}].`);
    }
}