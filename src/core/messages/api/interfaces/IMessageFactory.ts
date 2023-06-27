import { cMessage, cThemeColor, cAction } from "../../messages.module";

export default interface IMessageFactory {
    createMessage(message: cMessage): any,
    createButtons(action: cAction, color: cThemeColor): any,
}