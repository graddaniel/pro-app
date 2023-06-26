import BussinessLogicError from '../../generic/business-logic-error';

export default class MatchAlreadyExistsError extends BussinessLogicError {
    constructor(
        firstId: number,
        secondId: number,
    ) {
        super(`Match already exists. First id: ${firstId}, second id: ${secondId}`);
    }
}