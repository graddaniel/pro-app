import BussinessLogicError from '../../generic/business-logic-error';

export default class ProfileAlreadyExists extends BussinessLogicError {
    constructor() {
        super('Account already has a profile');
    }
}