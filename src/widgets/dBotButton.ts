
function buttonHandler(args: ButtonHandlerArgs): void {
    // args.ownerId (the interaction owner)
    // args.clientId (current owner interaction)
    // args.extra.args // for some buttons that send custom payload values
    // Ideally, the handlers should be called here
  }
  
class dBotButton {
    handlerName: string;
    buttonText: string;
    onlyOwnerInteractable: boolean;
    handler: (args: ButtonHandlerArgs) => void;
  
    constructor(
      handlerName: string,
      buttonText: string,
      handler: (args: ButtonHandlerArgs) => void,
      onlyOwnerInteractable: boolean
    ) {
      this.handlerName = handlerName;
      this.buttonText = buttonText;
      this.handler = handler;
      this.onlyOwnerInteractable = onlyOwnerInteractable;
    }
  }