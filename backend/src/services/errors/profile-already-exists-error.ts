import BussinessLogicError from '../../generic/business-logic-error';

export default class ProfileAlreadyExists extends BussinessLogicError {
    constructor() {
        super('User already has a profile');
    }
}