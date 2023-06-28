import BussinessLogicError from "../../generic/business-logic-error";

export default class NotAcceptedSwipeError extends BussinessLogicError {
    constructor() {
        super(`You can't match with profile that didn't accept your swipe.`);
    }
}