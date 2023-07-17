export default class ActionResult {
    success: boolean;
    type: string;
    message: string;

    constructor(success: boolean, type: string, message: string) {
        this.success = success;
        this.type = type;
        this.message = message;
    }
}