//META{"name":"AntiBlockedMessages","displayName":"AntiBlockedMessages","website":"https://istethys.weebly.com","source":"https://istethys.weebly.com"}*//
var AntiBlockedMessages = (() => {
const buildPlugin = ([Plugin, Api]) => {
	
		const { WebpackModules, PluginUtilities } = Api;
		const { ComponentDispatch: Dispatcher } = WebpackModules.getByProps('ComponentDispatch');
		
		class AntiBlockedMessages extends Plugin {

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
			initConstructor() {
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
				let libraryScript = document.getElementById("ZLibraryScript");
				if (!libraryScript || !window.ZLibrary) {
					if (libraryScript) libraryScript.parentElement.removeChild(libraryScript);
					libraryScript = document.createElement("script");
					libraryScript.setAttribute("type", "text/javascript");
					libraryScript.setAttribute("src", "https://rauenzi.github.io/BDPluginLibrary/release/ZLibrary.js");
					libraryScript.setAttribute("id", "ZLibraryScript");
					document.head.appendChild(libraryScript);
				}

				if (window.ZLibrary) this.initialize();
				else libraryScript.addEventListener("load", () => { this.initialize(); });
			}

			stop() {
				PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has stopped.");
			};

			//  Initialize
			initialize() {
				ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "LINK_TO_RAW_CODE");
				this.initialized = true;
				PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has started.");
			}
	
			/**
			* Function to access properties of an object safely, returns false instead of erroring if the property / properties do not exist.
			* @name safelyGetNestedProps
			* @author Zerebos
			* @param {Object} obj The object we are accessing.
			* @param {String} path The properties we want to traverse or access.
			* @returns {*}
			*/
			getProps(obj, path) {
				return path.split(/\s?\.\s?/).reduce((object, prop) => object && object[prop], obj);
			}

			/* Setters */

			set css(style = '') {
				return this._css = style.split(/\s+/g).join(' ').trim();
			}

			/* Getters */

			get [Symbol.toStringTag]() {
				return 'Plugin';
			}

			get css() {
				return this._css;
			}

			get name() {
				return config.info.name;
			}

			get short() {
				let string = '';

				for (let i = 0, len = config.info.name.length; i < len; i++) {
					const char = config.info.name[i];
					if (char === char.toUpperCase()) string += char;
				}

				return string;
			}

			get author() {
				return config.info.authors.map((author) => author.name).join(', ');
			}

			get version() {
				return config.info.version;
			}

			get description() {
				return config.info.description;
			}

		};
	};
})();