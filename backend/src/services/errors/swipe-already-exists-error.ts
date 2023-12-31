import BussinessLogicError from '../../generic/business-logic-error';

export default class SwipeAlreadyExistsError extends BussinessLogicError {
    constructor() {
        super(`You can't swipe with the same profile twice.`);
    }
}