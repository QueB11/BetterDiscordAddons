//META{"name":"AntiBlockedMessages","displayName":"AntiBlockedMessages","website":"https://istethys.weebly.com","source":"https://istethys.weebly.com"}*//

class AntiBlockedMessages {

	// Contrsuctor
	constructor () {
		this.initialized = false

		this.changelog = {
			"improved":[["Cake Day","AntiBlockedMessages released on 10/11/2019 🎂!"]]
		};
	}

	// Meta
	getName () {return "AntiBlockedMessages";}
	getShortName() {return "ABM";}
	getVersion () {return "0.5.1";}
	getAuthor () {return "IsTethys";}
	getDescription () {return "Hides blocked user messages for real!";}

	// InitializedContstructor
	initConstructor () {
		// super();
		this._css;
		this.promises = {
			state: { cancelled: false },
			cancel() { this.state.cancelled = true; },
			restore() { this.state.cancelled = false; }
		};
		
		this.css = `
			.messageGroupBlocked-3wrQQX , .messageGroupBlockedBtn-1PBBh-
			{
				display:none
			}
		`;
	}

	// Load/Unload
	load () {
		this.promises.restore();
		PluginUtilities.addStyle(this.short, this.css);
	}

	unload() {
		this.promises.cancel();
		PluginUtilities.removeStyle(this.short);
		PluginUtilities.removeStyle(this.css);
	}

	// Start/Stop
	start() {
        var libraryScript = document.getElementById('zeresLibraryScript');
		if (!libraryScript) {
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js");
			libraryScript.setAttribute("id", "zeresLibraryScript");
			document.head.appendChild(libraryScript);
		}

		if (typeof window.ZeresLibrary !== "undefined") this.initialize();
		else libraryScript.addEventListener("load", () => { this.initialize(); });
    }

	stop() {
        PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has stopped.");
    };

	//  Initialize
    initialize() {
        this.initialized = true;
		this.initConstructor();
        PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has started.");
    }

}