import Theme from "./Theme";
import Action from "./Action";

export default interface Message {
    theme: Theme,
    title?: string,
    content: string,
    actions: Action[]
}
