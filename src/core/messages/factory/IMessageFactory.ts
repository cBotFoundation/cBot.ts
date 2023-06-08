import { ThemeColor } from "../api/Theme";
import { Message } from "../messages.module";
import { Action } from "../messages.module";

export default interface IMessageFactory {
    createMessage(message: Message): unknown,
    createAction(action: Action, color: ThemeColor): any,
}