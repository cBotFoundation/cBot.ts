import { IMessageFactory } from "../../messages/messages.module";
import { cMessage } from "../../messages/messages.module";

export default interface IMessageService {
    factories: IMessageFactory,
    send(message: Message): void
}