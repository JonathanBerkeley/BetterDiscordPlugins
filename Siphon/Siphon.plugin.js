//META{"name":"Siphon","website":"https://google.ie"}*//

class Siphon {
    // Constructor
    constructor() {
        this.initialized = false;
    }

    // Meta
    getName() { return "Siphon"; }
    getDescription() { return "Siphons text randomly from all your servers messages out through you into the chat you are currently looking at. (early DEV stage release)"; }
    getVersion() { return "0.0.1"; }
    getAuthor() { return "Jonathan"; }

    // Settings Panel
    getSettingsPanel() {
        return "<h1> Unused </h1>";
    }

    // Load/Unload
    load() { }

    unload() { }

    // Events
    onMessage() { };

    onSwitch() {
        this.currentChannel = location.href.substring(location.href.lastIndexOf("/") + 1, location.href.length);
    };

    observer(e) {
    };

    // Start/Stop
    start() {
        this.cancelPatch = BdApi.monkeyPatch(BdApi.findModuleByProps("dispatch"), "dispatch", {
            before: (data) => {
                var event = data.methodArguments[0];
                var fStop = false;
                var lastMsg = "";
                if (event.type === "MESSAGE_CREATE" && fStop === false && Math.floor((Math.random() * 25) + 1) === 2) { //Change the 25 to change chance, higher means less likely
                    if (event.message.content != "") {
                        if (event.message.content != lastMsg) {
                            BdApi.findModuleByProps('enqueue').enqueue(
                                {
                                    message: {
                                        channelId: this.currentChannel,
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
            }
        })

        this.currentChannel = location.href.substring(location.href.lastIndexOf("/") + 1, location.href.length);
    };

    stop() {
        this.cancelPatch();
    };

    //  Initialize
    initialize() {
        this.initialized = true;
    }
}