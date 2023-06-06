import { Message } from "../messages.module";
import { Action } from "../messages.module";
import { Theme } from "../messages.module";

export default interface IMessageFactory {
    createMessage(message: Message): () => void,
    createAction(action: Action): () => void,
    createTheme(theme: Theme): unknown
}