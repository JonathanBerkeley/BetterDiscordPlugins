//META{"name":"Siphon","website":"https://github.com/JonathanBerkeley/BetterDiscordPlugins/","source":"https://github.com/JonathanBerkeley/BetterDiscordPlugins/blob/master/Siphon/Siphon.plugin.js","donate":"https://paypal.me/shudworknow"}*//

class Siphon {
    //Constructor
    constructor() {
        this.initialized = false;
    }

    //Meta
    getName() { return "Siphon"; }
    getDescription() { return "Siphons text randomly from all your servers messages out through you into the chat you are currently looking at. Keybinds: Left arrow to enable. Right arrow to disable. (early DEV stage release)"; }
    getVersion() { return "0.0.7"; }
    getAuthor() { return "J.B"; }

    //Settings Panel
    getSettingsPanel() {
        return "<h1> Unused </h1>";
    }

    load() { }

    unload() {
        this.disablePlugin();
     }

    //Events
    onSwitch() {
    };

    observer(e) {
    };

    //Start/Stop
    start() {
        var chance = 25; //Change to change chance, higher means less likely
        var enabled;
        var sendMessageModule = BdApi.findModuleByProps('sendMessage');

        document.body.onkeyup = function (e) {
            if (e.key == "ArrowLeft") {
                enabled = true;
                BdApi.showToast("Siphon ENABLED message sending ", {type: "success"});
            } else if (e.key == "ArrowRight") {
                enabled = false;
                BdApi.showToast("Siphon DISABLED message sending ", {type: "error"});
            }
        }
        
        var lastMsg = "";
        this.cancelPatch = BdApi.monkeyPatch(BdApi.findModuleByProps("dispatch"), "dispatch", {
            before: (data) => {
                var event = data.methodArguments[0];
                if (enabled && event.type === "MESSAGE_CREATE" && Math.floor((Math.random() * chance) + 1) === 2) {
                    if (event.message.content != lastMsg && event.message.content != "") {
                        sendMessageModule.sendMessage(location.href.substring(location.href.lastIndexOf("/") + 1, location.href.length), { content: event.message.content })
                    }
                    lastMsg = event.message.content;
                }
            }
        })

    };

    stop() {
        this.disablePlugin();
    };

    initialize() {
        this.initialized = true;
    }

    disablePlugin() {
        try {
            this.cancelPatch();
            BdApi.showToast("Unloaded " + this.getName() + " plugin");
        } catch { }
    }
}
