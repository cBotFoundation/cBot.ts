# dBot -> cBot.ts

# Hello world example

```ts
...

buttonHandler(args)
{
    //args.ownerId (the interaction owner)
    //args.clientId (current owner interaction)
    //args.extra.args // for some buttons that send custom payloads values
    //idealmente los handlers deberian llamarse
}

//dBotButton (string handlerName, string buttonText, bool onlyOwnerInteractable)// onlyOwnerInteractable means that the button handler only will be dispatched if the ownerid and the client id is equals.

let accept_button = new dBotButton("trimmed-handler-name","button text", buttonHandler, true); 
let content = new dBotCard("title","content").AddButtons([accept_button]);

//command definition 
commandCallback(args):void
{
    //args possible values
    args.clientId
    args.interaction//discord only
}

command = new Command(
    "trimmed-command-name",
     content,
     commandCallback 
)

//Initialization
cBootConfig initArgs = 
{
    clientKey: "your_chat_services_api_key",
    clientId: "your client id", //Discord requirement and hardoceded value
    serverId: "your serverid",  //Discord requirement and hardoceded value
    useImplentations: [ImplentationA, ImplentationB],
    locale: localeConfig
    theme: themeConfig
    commnads: [command1, command2, command3],
    // events [Event1, event2, event3]
}

cBot.startBot(initArgs, (args) => 
    {
        console.log(`Bot started at ${args.port}`);
    });

// cBot.setListener(("action", args)=>{

// });

```





