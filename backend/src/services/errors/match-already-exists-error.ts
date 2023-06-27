import BussinessLogicError from '../../generic/business-logic-error';

export default class MatchAlreadyExists extends BussinessLogicError {
    constructor(
        firstId: number,
        secondId: number,
    ) {
        super(`Match already exists for Ids ${firstId} and ${secondId}`);
    }
}