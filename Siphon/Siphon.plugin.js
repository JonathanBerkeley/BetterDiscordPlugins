//META{"name":"Siphon","website":"https://github.com/JonathanBerkeley/BetterDiscordPlugins/","source":"https://github.com/JonathanBerkeley/BetterDiscordPlugins/blob/master/Siphon/Siphon.plugin.js","donate":"https://paypal.me/shudworknow"}*//

class Siphon {
    // Constructor
    constructor() {
        this.initialized = false;
    }

    // Meta
    getName() { return "Siphon"; }
    getDescription() { return "Siphons text randomly from all your servers messages out through you into the chat you are currently looking at. (early DEV stage release)"; }
    getVersion() { return "0.0.2"; }
    getAuthor() { return "J.B"; }

    // Settings Panel
    getSettingsPanel() {

        return "<h1> Unused </h1>";


    }

    // Load/Unload
    load() { }

    unload() { }

    // Events
    onSwitch() {
    };

    observer(e) {
    };

    // Start/Stop
    start() {
        var chance = 10; //Change to change chance, higher means less likely
        document.body.onkeyup = function (e) {
            if (e.keyCode == 37) {
                console.log(chance);
                var lastMsg = "";
                this.cancelPatch = BdApi.monkeyPatch(BdApi.findModuleByProps("dispatch"), "dispatch", {
                    before: (data) => {
                        var event = data.methodArguments[0];
                        var fStop = false; //unused
                        if (event.type === "MESSAGE_CREATE" && fStop === false && Math.floor((Math.random() * chance) + 1) === 2) {
                            if (event.message.content != lastMsg && event.message.content != "") {
                                BdApi.findModuleByProps('enqueue').enqueue(
                                    {
                                        message: {
                                            channelId: location.href.substring(location.href.lastIndexOf("/") + 1, location.href.length),
                                            content: event.message.content,
                                            nonce: BdApi.findModuleByProps('fromTimestamp').fromTimestamp(new Date),
                                        },
                                        type: 'send',
                                    },
                                    () => { },
                                );
                            }
                            lastMsg = event.message.content;
                        }
                    }
                })

            } else if (e.keyCode == 39) {
                try {
                    this.cancelPatch();
                } catch { }
            }
        }


        
    };

    stop() {
        try {
            this.cancelPatch();
        } catch { }
    };

    //  Initialize
    initialize() {
        this.initialized = true;
    }
}
