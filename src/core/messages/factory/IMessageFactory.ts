import { cMessage, cThemeColor, cAction } from "../messages.module";

export default interface IMessageFactory {
    createMessage(message: cMessage): unknown,
    createAction(action: cAction, color: cThemeColor): any,
}