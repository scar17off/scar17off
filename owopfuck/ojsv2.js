// ==UserScript==
// @name         owopfuck.cc
// @namespace    http://tampermonkey.net/
// @version      1.4.1
// @license      MIT
// @description  cool bot
// @author       scar17off
// @match        *://augustberchelmann.com/owop/*
// @match        *://ourworldofpixels.com/*
// @icon         https://www.google.com/s2/favicons?domain=ourworldofpixels.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.1/socket.io.js
// @namespace    none
// ==/UserScript==

const SCRIPT_VERSION = "1.4.1";

(function() {
	"use strict";

	var I = 6666666;
	if(location.host == "ourworldofpixels.com") I = 0; // OWOP is using different event IDs
	const events = {
		"loaded": I + 1,
		"init": I + 2,
		"tick": I + 3,
		"misc": {
			"toolsRendered": I + 4,
			"toolsInitialized": I + 5,
			"logoMakeRoom": I + 6,
			"worldInitialized": I + 7,
			"windowAdded": I + 8,
			"captchaToken": I + 9,
			"loadingCaptcha": I + 10
		},
		"renderer": {
			"addChunk": I + 11,
			"rmChunk": I + 12,
			"updateChunk": I + 13
		},
		"camera": {
			"moved": I + 14,
			"zoom": I + 15
		},
		"net": {
			"connecting": I + 16,
			"connected": I + 17,
			"disconnected": I + 18,
			"playerCount": I + 19,
			"chat": I + 20,
			"devChat": I + 21,
			"world": {
				"leave": I + 22,
				"join": I + 23,
				"joining": I + 24,
				"setId": I + 25,
				"playersMoved": I + 26,
				"playersLeft": I + 27,
				"tilesUpdated": I + 28,
				"teleported": I + 29
			},
			"chunk": {
				"load": I + 30,
				"unload": I + 31,
				"set": I + 32,
				"lock": I + 33,
				"allLoaded": I + 34
			},
			"sec": {
				"rank": I + 35
			},
			"maxCount": I + 36,
			"donUntil": I + 37
		}
	};

	function createconfig() {
		if(localStorage.OWOPFUCK) return;
		localStorage.OWOPFUCK = JSON.stringify({
			vanish: false,
			instaplace: false,
			mppchat: false,
			nohelp: false,
			owopfont: false,
			streamer: false,
			diagfill: false,
			assets: [],
			wsproxy: [],
			animations: {},
			freebucket: 2,
			animbuildmovement: false,
			animbuildintms: 45,
			animbuildbots: 10,
			animbuildlwidth: 2,
			animation: "Circle",
			reconnectTime: 250,
			eraserdiameter: 16,
			livepredtime: true,
			fakerank: false,
			fakerank_prefix: "(A)",
			animationtool: "Selected",
			irc: true,
			chatmentions: false,
			guibind: "Insert",
			ircbind: "RShift",
			infogui: true,
			language: "English",
			botautoreconnect: false,
			followid: "Disabled",
			followbyid: false,
			autoreconnect: false,
			automalogin: false,
			botcount: 2,
			eraserpattern: "Horizontal",
			areapattern: "Horizontal",
			pastepattern: "Horizontal",
			wolfmove: false,
			smartsneaky: false,
			follow: false,
			bothighlight: false,
			areahighlight: false,
			areahighlightblink: false,
			antixss: true
		});
	};
	createconfig();

	const getStorage = () => JSON.parse(localStorage.OWOPFUCK || '{}');

	function getValue(variable) {
		let value = getStorage()[variable.toLowerCase()];
		return typeof value === 'string' && value.includes('[') ? JSON.parse(value) : value;
	};
	function setValue(variable, value) {
		let storage = getStorage();
		storage[variable] = value;
		localStorage.OWOPFUCK = JSON.stringify(storage);
		return true;
	};

	window.onload = () => OWOP.on(events.net.world.join, () => {
		if(!OWOP.cursors.paste && OWOP.cursors.stamp) OWOP.cursors.paste = OWOP.cursors.stamp;
		if(!OWOP.tools) OWOP.tools = OWOP.tool;
		if(!OWOP.tool) OWOP.tool = OWOP.tools;
		if(typeof localStorage == 'undefined') localStorage = sessionStorage;
		// event emitter
		!function (e) { "use strict"; function t() { } function n(e, t) { for (var n = e.length; n--;)if(e[n].listener === t) return n; return -1 } function r(e) { return function() { return this[e].apply(this, arguments) } } var i = t.prototype, s = e.EventEmitter; i.getListeners = function (e) { var t, n, r = this._getEvents(); if(e instanceof RegExp) for (n in t = {}, r) r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n]); else t = r[e] || (r[e] = []); return t }, i.flattenListeners = function (e) { var t, n = []; for (t = 0; t < e.length; t += 1)n.push(e[t].listener); return n }, i.getListenersAsObject = function (e) { var t, n = this.getListeners(e); return n instanceof Array && ((t = {})[e] = n), t || n }, i.addListener = function (e, t) { if(!function e(t) { return "function" == typeof t || t instanceof RegExp || !(!t || "object" != typeof t) && e(t.listener) }(t)) throw TypeError("listener must be a function"); var r, i = this.getListenersAsObject(e), s = "object" == typeof t; for (r in i) i.hasOwnProperty(r) && -1 === n(i[r], t) && i[r].push(s ? t : { listener: t, once: !1 }); return this }, i.on = r("addListener"), i.addOnceListener = function (e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = r("addOnceListener"), i.defineEvent = function (e) { return this.getListeners(e), this }, i.defineEvents = function (e) { for (var t = 0; t < e.length; t += 1)this.defineEvent(e[t]); return this }, i.removeListener = function (e, t) { var r, i, s = this.getListenersAsObject(e); for (i in s) s.hasOwnProperty(i) && -1 !== (r = n(s[i], t)) && s[i].splice(r, 1); return this }, i.off = r("removeListener"), i.addListeners = function (e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function (e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function (e, t, n) { var r, i, s = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners; if("object" != typeof t || t instanceof RegExp) for (r = n.length; r--;)s.call(this, t, n[r]); else for (r in t) t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i)); return this }, i.removeEvent = function (e) { var t, n = this._getEvents(); if("string" == typeof e) delete n[e]; else if(e instanceof RegExp) for (t in n) n.hasOwnProperty(t) && e.test(t) && delete n[t]; else delete this._events; return this }, i.removeAllListeners = r("removeEvent"), i.emitEvent = function (e, t) { var n, r, i, s, o = this.getListenersAsObject(e); for (s in o) if(o.hasOwnProperty(s)) for (n = o[s].slice(0), i = 0; i < n.length; i++)!0 === (r = n[i]).once && this.removeListener(e, r.listener), r.listener.apply(this, t || []) === this._getOnceReturnValue() && this.removeListener(e, r.listener); return this }, i.trigger = r("emitEvent"), i.emit = function (e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function (e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function() { return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue }, i._getEvents = function() { return this._events || (this._events = {}) }, t.noConflict = function() { return e.EventEmitter = s, t }, "function" == typeof define && define.amd ? define(function() { return t }) : "object" == typeof module && module.exports ? module.exports = t : e.EventEmitter = t }("undefined" != typeof window ? window : this || {});

		// Pray to god this method of font drawing will work.
		function getTextImageData(text, font) {
			var tempCanvas = document.createElement('canvas');
			var tempCtx = tempCanvas.getContext('2d');

			tempCtx.font = font;
			var textMetrics = tempCtx.measureText(text);

			tempCanvas.width = textMetrics.width;
			tempCanvas.height = parseInt(font, 10);

			tempCtx.font = font;
			tempCtx.fillText(text, 0, parseInt(font, 10));

			var imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

			tempCanvas.remove();

			return imageData;
		};
		// this nigger took me 2.5 hours to finish
		function addResizeableProperty(elementId, elementId2, element) {
			const resizableDiv = document.getElementById(elementId);
			const eventHandlerDiv = document.getElementById(elementId2);
			let isResizing = false;
			let startX;
			let startY;
			let startWidth;
			let startHeight;

			eventHandlerDiv.addEventListener('mousedown', (e) => {
				if(e.target === eventHandlerDiv) {
					isResizing = true;
					startX = e.clientX;
					startY = e.clientY;
					startWidth = parseInt(getComputedStyle(resizableDiv).width, 10);
					startHeight = parseInt(getComputedStyle(resizableDiv).height, 10);

					document.addEventListener('mousemove', resize);
					document.addEventListener('mouseup', stopResize);
				}
			});

			function resize(e) {
				if(!isResizing) return;

				const newWidth = startWidth + e.clientX - startX;
				const newHeight = startHeight + e.clientY - startY;
				// this is useless
				// const widthChange = newWidth - startWidth;
				// const heightChange = newHeight - startHeight;/

				resizableDiv.style.width = `${newWidth}px`;
				resizableDiv.style.height = `${newHeight}px`;
				resizableDiv.style.maxWidth = `${newWidth}px`;
				resizableDiv.style.maxHeight = `${newHeight}px`;

				// this code is shit
				if(resizableDiv.id == "window-owopfuck") {
					document.getElementById("owopfuck-title").childNodes.forEach(node => {
						if(node.style) {
							node.style.fontSize = newWidth <= 750 ? "0px" : "20px";
						};
					});
					document.getElementById("owopfuck-tablist").style.textAlign = newWidth <= 750 ? "unset" : "right";
				};

				const sections = document.querySelectorAll(".owopfuck-section");
				const windowSize = parseInt(document.getElementById("window-owopfuck").style.height.replace("px", ''));

				// set section height
				sections.forEach(section => {
					section.style.height = windowSize - 60 + "px";
				});
				// set full tab heights
				document.querySelectorAll(".owopfuck-full-tab").forEach(node => {
					node.style.height = windowSize - 60 + "px";
				});
				window.animbuilderCenter.y = (windowSize - 60) / 2;
			};

			function stopResize() {
				isResizing = false;
				document.removeEventListener('mousemove', resize);
				document.removeEventListener('mouseup', stopResize);
			};
		};
		const createExpressionFunction = (expression) => {
			return new Function('pos', 'length', 'i', 'f', `return ${expression};`);
		};
		function gameToSize(gameX, gameY) {
			var sc = 16 / 16;
			var pixelSize = 32 * sc;

			var screenWidth = Math.ceil(gameX * pixelSize);
			var screenHeight = Math.ceil(gameY * pixelSize);

			return {
				width: screenWidth / 2 + 'px',
				height: screenHeight / 2 + 'px'
			};
		};
		function lerp(color1, color2, factor) {
			if(arguments.length < 3) {
				factor = 0.5;
			};
			var result = color1.slice();
			for (var i = 0; i < 3; i++) {
				result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
			}
			return result;
		};
		const getIbyXY = (x, y, w) => (y * w + x) * 4;
		function pixColor(img, X, Y) {
			var data = img.getImageData(X, Y, 1, 1).data;
			return [data[0], data[1], data[2]];
		};
		function getRandomItemFromArray(array) {
			let randomIndex = Math.floor(Math.random() * array.length);
			return array[randomIndex];
		};
		const upload = (accept = "*") => new Promise(resolve => {
			let file = document.createElement('input');
			file.type = "file";
			file.accept = accept;
			file.onchange = () => {
				let reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result);
				};
				reader.readAsDataURL(file.files[0]);
			};
			file.click();
		});
		const eq = (a, b) => a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
		const error = m => console.error("%c " + m, "color: #ff0000");

		class ChunkSystem {
			constructor() {
				this.chunks = [];
				this.chunkProtected = [];
			};
			setChunk(x, y, data) {
				if(!data || typeof x !== "number" || typeof y !== "number") return error("ChunkSystem.setChunk: failed to set chunk (no data or invalid coords).");
				if(data.constructor.name !== "Array") data = Array.from(data);
				if(!this.chunks[x]) this.chunks[x] = [];
				return this.chunks[x][y] = data;
			};
			getChunk(x, y, raw) {
				if(!raw) {
					x = Math.floor(x / Client.options.chunkSize);
					y = Math.floor(y / Client.options.chunkSize);
				};
				if(!this.chunks[x]) return;
				return this.chunks[x][y];
			};
			removeChunk(x, y) {
				if(!this.chunks[x]) return;
				if(!this.chunks[x][y]) return;
				return this.chunks[x].splice(y, 1);
			};
			setPixel(x, y, rgb) {
				if(!rgb || typeof rgb !== "object" || typeof x !== "number" || typeof y !== "number") return error("ChunkSystem.setPixel: failed to set pixel (no/wrong rgb or invalid coords).");
				const chunkX = Math.floor(x / Client.options.chunkSize);
				const chunkY = Math.floor(y / Client.options.chunkSize);
				if(!this.chunks[chunkX]) return;
				const chunk = this.chunks[chunkX][chunkY];
				if(!chunk) return false;
				const i = getIbyXY(x & Client.options.chunkSize - 1, y & Client.options.chunkSize - 1, Client.options.chunkSize);
				chunk[i] = rgb[0];
				chunk[i + 1] = rgb[1];
				chunk[i + 2] = rgb[2];
				return true;
			};
			getPixel(x, y) {
				if(typeof x !== "number" || typeof y !== "number") return error("ChunkSystem.getPixel: failed to get pixel (invalid coords).");
				const chunkX = Math.floor(x / Client.options.chunkSize);
				const chunkY = Math.floor(y / Client.options.chunkSize);
				if(!this.chunks[chunkX]) return;
				const chunk = this.chunks[chunkX][chunkY];
				const i = getIbyXY(x & Client.options.chunkSize - 1, y & Client.options.chunkSize - 1, Client.options.chunkSize);
				return [chunk[i], chunk[i + 1], chunk[i + 2]];
			};
			protectChunk(x, y) {
				if(typeof x !== "number" || typeof y !== "number") return error("ChunkSystem.protectChunk: failed to protect chunk (invalid coords).");
				if(!this.chunkProtected[x]) this.chunkProtected[x] = [];
				return this.chunkProtected[x][y] = true;
			}
			unProtectChunk(x, y) {
				if(typeof x !== "number" || typeof y !== "number") return error("ChunkSystem.unprotectChunk: failed to unprotect chunk (invalid coords).");
				if(!this.chunkProtected[x]) return false;
				this.chunkProtected[x][y] = false;
				return true;
			}
			isProtected(x, y) {
				if(typeof x !== "number" || typeof y !== "number") return error("ChunkSystem.isProtected: failed to check (invalid coords).");
				if(!this.chunkProtected[x]) return false;
				return Boolean(this.chunkProtected[x][y]);
			}
		};
		const Chunks = new ChunkSystem();
		class Client {
			constructor(options = {}) {
				if(!options.world) options.world = "main";
				if(!options.reconnectTime) options.reconnectTime = 2500;
				if(!options.captchaSiteKey) options.captchaSiteKey = "6LcgvScUAAAAAARUXtwrM8MP0A0N70z4DHNJh-KI";
				let types = {
					"glitch": ".glitch.me/?ws=",
					"replit": ".repl.co/?ws="
				};
				if(options.proxy && !options.proxyType) {
					if(options.proxy.includes(".")) options.proxyType = "replit";
					else options.proxyType = "glitch";
				};
				if(options.proxy && !options.zombie) options.ws = new WebSocket(`wss://${options.proxy}${types[options.proxyType]}${options.ws.url}`, null, options.ws.options);
				if(options.zombie) options.ws = new BotNetReplicator(options.zombie);
				const OJS = this;
				this.clientOptions = options;
				this.RANK = {
					ADMIN: 3,
					MODERATOR: 2,
					USER: 1,
					NONE: 0
				};
				this.options = {
					chunkSize: 16,
					maxChatBuffer: 256,
					maxMessageLength: {
						0: 128,
						1: 128,
						2: 512,
						3: 16384
					},
					maxWorldNameLength: 24,
					worldBorder: 0xFFFFFF,
					opcode: {
						setId: 0,
						worldUpdate: 1,
						chunkLoad: 2,
						teleport: 3,
						setRank: 4,
						captcha: 5,
						setPQuota: 6,
						chunkProtected: 7
					},
					captchaState: {
						CA_WAITING: 0,
						CA_VERIFYING: 1,
						CA_VERIFIED: 2,
						CA_OK: 3,
						CA_INVALID: 4
					},
					captchaStateNames: {
						0: "WAITING",
						1: "VERIFYING",
						2: "VERIFIED",
						3: "OK",
						4: "INVALID"
					}
				};
				if(window.document === undefined) {
					this.options.misc = {
						chatVerification: String.fromCharCode(10),
						tokenVerification: "CaptchA",
						worldVerification: 25565
					};
				} else this.options.misc = {
					chatVerification: OWOP.options.serverAddress[0].proto.misc.chatVerification,
					tokenVerification: OWOP.options.serverAddress[0].proto.misc.tokenVerification,
					worldVerification: OWOP.options.serverAddress[0].proto.misc.worldVerification
				};
				OJS.chat = {
					send(msg) {
						if(typeof OJS.player.rank !== "number") return false;
						msg = OJS.chat.sendModifier(msg);
						OJS.net.ws.send(msg.substr(0, OJS.options.maxMessageLength[OJS.player.rank]) + OJS.options.misc.chatVerification);
						return true;
					},
					local(msg) {
						OJS.util.log(msg)
					},
					sendModifier(msg) {
						return msg
					},
					recvModifier(msg) {
						return msg
					},
					messages: []
				};
				OJS.world = {
					join(world = "main") {
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected) return false;
						let ints = [];
						world = world.toLowerCase();
						for (let i = 0; i < world.length && i < 24; i++) {
							let charCode = world.charCodeAt(i);
							if((charCode < 123 && charCode > 96) || (charCode < 58 && charCode > 47) || charCode === 95 || charCode === 46)
								ints.push(charCode);
						}
						let array = new ArrayBuffer(ints.length + 2);
						let dv = new DataView(array);
						for (let i = ints.length; i--;) dv.setUint8(i, ints[i]);
						dv.setUint16(ints.length, OJS.options.misc.worldVerification, true);
						OJS.net.ws.send(array);
						OJS.util.log(`Joining world: ${world}`);
						OJS.world.name = world;
						return true;
					},
					leave() {
						OJS.net.isWorldConnected = false;
						OJS.net.isWebsocketConnected = false;
						OJS.net.ws.close();
					},
					destroy() {
						OJS.net.isWorldConnected = false;
						OJS.net.isWebsocketConnected = false;
						OJS.net.destroyed = true;
						OJS.net.ws.close();
						OJS.emit("destroy");
					},
					move(x = 0, y = 0) {
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected) return false;
						if(!x || !y) return false;
						OJS.player.x = x;
						OJS.player.y = y;

						if(document.getElementById(`owopfuck-${OJS.player.id}-x`)) document.getElementById(`owopfuck-${OJS.player.id}-x`).innerText = Math.floor(x);
						if(document.getElementById(`owopfuck-${OJS.player.id}-y`)) document.getElementById(`owopfuck-${OJS.player.id}-y`).innerText = Math.floor(y);

						x *= 16;
						y *= 16;
						const dv = new DataView(new ArrayBuffer(12));
						OJS.player.worldX = x;
						OJS.player.worldY = y;
						dv.setInt32(0, x, true);
						dv.setInt32(4, y, true);
						dv.setUint8(8, OJS.player.color[0]);
						dv.setUint8(9, OJS.player.color[1]);
						dv.setUint8(10, OJS.player.color[2]);
						dv.setUint8(11, OJS.player.tool);
						OJS.net.ws.send(dv.buffer);

						OJS.highlight.move();

						return true;
					},
					setPixel(x = OJS.player.x, y = OJS.player.y, color = OJS.player.color, move = true) {
						if(!OJS.net.bucket.canSpend(1) && location.origin == "ourworldofpixels.com") return false;
						let pixel = OWOP.world.getPixel(x, y);
						if(eq(pixel, color)) return;
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected || OJS.player.rank === OJS.RANK.NONE) return false;
						const oldX = OJS.player.x,
							oldY = OJS.player.y;

						if(getValue("smartsneaky")) {
							let distx = Math.trunc(x / Client.options.chunkSize) - Math.trunc(oldX / Client.options.chunkSize);
							distx *= distx;
							let disty = Math.trunc(y / Client.options.chunkSize) - Math.trunc(oldY / Client.options.chunkSize);
							disty *= disty;

							let dist = Math.sqrt(distx + disty);

							if(dist >= 3) OJS.world.move(x, y);
						} else {
							if(move) OJS.world.move(x, y);
						};

						const dv = new DataView(new ArrayBuffer(11));
						dv.setInt32(0, x, true);
						dv.setInt32(4, y, true);
						dv.setUint8(8, color[0]);
						dv.setUint8(9, color[1]);
						dv.setUint8(10, color[2]);
						OJS.player.color = color;
						OJS.net.ws.send(dv.buffer);

						if(getValue("wolfmove")) OJS.world.move(oldX, oldY);

						document.getElementById(`owopfuck-${OJS.player.id}-color`).childNodes[0].style.backgroundColor = "rgb(" + OJS.player.color + ")";

						return true;
					},
					setTool(id = 0) {
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected) return false;
						OJS.player.tool = id;
						const dv = new DataView(new ArrayBuffer(12));
						dv.setInt32(0, OJS.player.worldX, true);
						dv.setInt32(4, OJS.player.worldY, true);
						dv.setUint8(8, OJS.player.color[0]);
						dv.setUint8(9, OJS.player.color[1]);
						dv.setUint8(10, OJS.player.color[2]);
						dv.setUint8(11, id);
						OJS.net.ws.send(dv.buffer);
						return true;
					},
					setColor(color = [0, 0, 0]) {
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected) return false;
						OJS.player.color = color;
						const dv = new DataView(new ArrayBuffer(12));
						dv.setInt32(0, OJS.player.worldX, true);
						dv.setInt32(4, OJS.player.worldY, true);
						dv.setUint8(8, OJS.player.color[0]);
						dv.setUint8(9, OJS.player.color[1]);
						dv.setUint8(10, OJS.player.color[2]);
						dv.setUint8(11, OJS.player.tool);
						OJS.net.ws.send(dv.buffer);
						return true;
					},
					protectChunk(x = OJS.player.x, y = OJS.player.y, newState = 1) {
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected) return false;
						if(OJS.player.rank < OJS.RANK.ADMIN && !options.unsafe) return false;
						const dv = new DataView(new ArrayBuffer(10));
						dv.setInt32(0, x, true);
						dv.setInt32(4, y, true);
						dv.setUint8(8, newState);
						OJS.net.ws.send(dv.buffer);
						return true;
					},
					clearChunk(x = OJS.player.x, y = OJS.player.y, rgb = OJS.player.color) {
						if(OJS.player.rank === OJS.RANK.ADMIN || options.unsafe) {
							const dv = new DataView(new ArrayBuffer(13));
							dv.setInt32(0, x, true);
							dv.setInt32(4, y, true);
							dv.setUint8(8, rgb[0]);
							dv.setUint8(9, rgb[1]);
							dv.setUint8(10, rgb[2]);
							OJS.net.ws.send(dv.buffer);
							return true;
						}
						return false;
					},
					requestChunk(x, y, inaccurate) {
						if(options.simpleChunks) return true;
						if(OJS.net.ws.readyState !== 1 || !OJS.net.isWebsocketConnected) return false;
						if(typeof x !== "number" && typeof y !== "number") {
							x = OJS.player.x;
							y = OJS.player.y;
							inaccurate = true;
						};
						if(inaccurate) {
							x = Math.floor(x / OJS.options.chunkSize);
							y = Math.floor(y / OJS.options.chunkSize);
						};
						let wb = OJS.options.worldBorder;
						if(x > wb || y > wb || x < ~wb || y < ~wb) return;
						let dv = new DataView(new ArrayBuffer(8));
						dv.setInt32(0, x, true);
						dv.setInt32(4, y, true);
						OJS.net.ws.send(dv.buffer);
						return true;
					},
					getPixel(x = OJS.player.x, y = OJS.player.y) {
						if(options.simpleChunks) return OWOP.world.getPixel(x, y);
						// It'll return undefined on unknown chunk but it'll request it, so you'll need to getPixel(x, y) again. I suggest you requesting chunks manually and getting them from ChunkSystem.
						if(!Chunks.getChunk(x, y)) OJS.world.requestChunk(x, y, true);
						return Chunks.getPixel(x, y);
					}
				};
				OJS.captcha = {
					usedKeys: [],
					login(key) {
						if(!OJS.net.ws ||
							OJS.net.ws.readyState !== 1) return false;
						if(OJS.captcha.usedKeys.includes(key)) {
							return false
						} else if(!key.startsWith(Client.options.misc.tokenVerification)) {
							OJS.captcha.usedKeys.push(key);
						}
						OJS.net.ws.send(Client.options.misc.tokenVerification + key);
						OJS.captcha.usedKeys.push(key);
						return true;
					},
					renderCaptcha(uniqueName = true) {
						return new Promise(resolve => {
							OWOP.windowSys.addWindow(new OWOP.windowSys.class.window(`Verification Needed ` + (uniqueName ? String.fromCharCode(Math.random() * 100) : ''), {
								closeable: true,
								moveable: true,
								centered: true
							}, win => {
								win.container.parentNode.style["z-index"] = "101";
								grecaptcha.render(win.addObj(OWOP.util.mkHTML('div', {})), {
									theme: 'dark',
									sitekey: OJS.clientOptions.captchaSiteKey,
									callback: token => {
										win.close();
										resolve(token);
									}
								});
							}));
						});
					},
					async renderAndLogin(unique = true) {
						OJS.captcha.login(await OJS.captcha.renderCaptcha(unique));
					}
				};
				OJS.world.originalSetPixel = OJS.world.setPixel;
				OJS.player = {
					x: 0,
					y: 0,
					worldX: 0,
					worldY: 0,
					tool: 0,
					rank: null,
					id: null,
					color: [0, 0, 0]
				};
				let highlight_element = document.createElement("div");
				highlight_element.style.position = 'fixed';
				highlight_element.style.transformOrigin = 'left top 0px';
				highlight_element.style.overflow = 'hidden';
				highlight_element.style.width = '40px';
				highlight_element.style.height = '40px';
				highlight_element.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';

				OJS.highlight = {
					shown: false,
					ismag: false,
					element: highlight_element
				};
				OJS.highlight.move = () => {
					let tools = {
						0: 'cursor',
						1: 'move',
						2: 'pipette',
						3: 'eraser',
						4: 'zoom',
						5: 'fill',
						6: 'paste',
						7: 'export',
						8: 'line',
						9: 'protect',
						10: 'copy'
					};

					var sc = OWOP.camera.zoom / 16;
					var pixelSize = 32 * sc;

					var gameX = OJS.player.x / 2;
					var gameY = OJS.player.y / 2;

					var screenX = (-OWOP.camera.x) * OWOP.camera.zoom + gameX * pixelSize - OWOP.tools.allTools[tools[OJS.player.tool]].offset[0];
					var screenY = (-OWOP.camera.y) * OWOP.camera.zoom + gameY * pixelSize

					if(screenX > -512 && screenY > -512 && screenX < window.innerWidth && screenY < window.innerHeight) {
						if(sc > 1.0 && !OJS.highlight.ismag) {
							OJS.highlight.ismag = true;
							OJS.highlight.element.style.imageRendering = 'pixelated';
						} else if(sc <= 1.0 && OJS.highlight.ismag) {
							OJS.highlight.ismag = false;
							OJS.highlight.element.style.imageRendering = 'auto';
						};

						OJS.highlight.element.style.transform = `matrix(${sc}, 0, 0, ${sc}, ${Math.round(screenX)}, ${Math.round(screenY)})`;

						if(!OJS.highlight.shown) {
							OWOP.elements.viewport.appendChild(OJS.highlight.element);
							OJS.highlight.shown = true;
						};
					} else {
						if(OJS.highlight.shown) {
							OJS.highlight.element.remove();
							OJS.highlight.shown = false;
						};
					};

					if(!getValue("bothighlight")) {
						OJS.highlight.shown = false;
						OWOP.removeListener(OWOP.events.tick, OJS.highlight.move);
						OJS.highlight.element.remove();
					};
				};
				OJS.players = {};
				OJS.net = {
					isWebsocketConnected: false,
					isWorldConnected: false,
					destroyed: false,
					bucket: new Bucket(32, 4, OJS),
					async dataHandler(data) {
						if(typeof data !== "object") return error("Client.net.dataHandler: data is not object.");
						const realData = data;
						data = new DataView(data);
						const opcode = data.getUint8(0);
						switch (opcode) {
							case OJS.options.opcode.setId:
								{
									OJS.emit("id", data.getUint32(1, true));
									OJS.player.id = data.getUint32(1, true);
									OJS.net.isWorldConnected = true;
									if(typeof OJS.player.rank !== "number") OJS.player.rank = OJS.RANK.NONE;
									OJS.util.log(`Joined world '${OJS.world.name}' and got id '${data.getUint32(1, true)}'`, "color: #00ff00");
									if(options.adminlogin) OJS.chat.send("/adminlogin " + options.adminlogin);
									if(options.modlogin) OJS.chat.send("/modlogin " + options.modlogin);
									if(options.pass) OJS.chat.send("/pass " + options.pass);
									OJS.emit("join", OJS.world.name);

									/*
									Bypass antibot
									if(location.origin == "ourworldofpixels.com") {
										fetch('https://opm.dimden.dev/client/img/polybius.png?' + Date.now(), {
											'credentials': 'include',
											'headers': {
												'x-caching': protect('p+' + Math.floor(Date.now() / 60000) * 60000, randomIP())
											}
										});
									};
									*/

									let table = document.createElement("tr");
									let connection = "🖥️";
									if(options.proxy) connection = "📡";
									if(options.zombie) connection = "🧟";

									table.innerHTML = `<td id="botnet-${OJS.player.id}-connection">${connection}</td>
<td id="owopfuck-${OJS.player.id}-id">${OJS.player.id}</td>
<td id="owopfuck-${OJS.player.id}-x">0</td>
<td id="owopfuck-${OJS.player.id}-y">0</td>
<td id="owopfuck-${OJS.player.id}-color"><div style="width: 20px; height: 20px; margin-left: 40%; background-color: rgb(${OJS.player.color});"></div></td>
<td id="owopfuck-${OJS.player.id}-pb">${OJS.net.bucket.allowance}</td>
<td id="owopfuck-${OJS.player.id}-actions">
	<button id="owopfuck-${OJS.player.id}-disconnect" class="owopfuck-smallbtn2" style="margin-left: 0; width: 100%;">Disconnect</button>
</td>`;
									table.id = `owopfuck-bot-${OJS.player.id}`;

									document.getElementById("owopfuck-bots").appendChild(table);

									document.getElementById(`owopfuck-${OJS.player.id}-disconnect`).addEventListener("click", () => {
										OJS.net.ws.close();
										document.getElementById(`owopfuck-bot-${OJS.player.id}`).remove();
									});
									break;
								}
							case OJS.options.opcode.worldUpdate:
								{
									// Players
									let updated = false;
									let updates = {};
									for (let i = data.getUint8(1); i--;) {
										updated = true;
										let pid = data.getUint32(2 + i * 16, true);
										if(pid === OJS.player.id) continue;
										let pmx = data.getUint32(2 + i * 16 + 4, true);
										let pmy = data.getUint32(2 + i * 16 + 8, true);
										let pr = data.getUint8(2 + i * 16 + 12);
										let pg = data.getUint8(2 + i * 16 + 13);
										let pb = data.getUint8(2 + i * 16 + 14);
										let ptool = data.getUint8(2 + i * 16 + 15);
										updates[pid] = {
											x: pmx,
											y: pmy,
											rgb: [pr, pg, pb],
											tool: ptool
										};
									}
									if(updated) {
										for (let i in updates) {
											if(!OJS.players[i]) OJS.emit("connect", i);
											OJS.players[i] = {
												id: i,
												x: updates[i].x >> 4,
												y: updates[i].y >> 4,
												rgb: updates[i].rgb,
												tool: updates[i].tool
											};
											OJS.emit("update", OJS.players[i]);
										}
									};
									// Pixels
									let off = 2 + data.getUint8(1) * 16;
									for (let i = data.getUint16(off, true), j = 0; j < i; j++) {
										let
											x = data.getInt32(2 + off + j * 15 + 4, true),
											y = data.getInt32(2 + off + j * 15 + 8, true);
										let r = data.getUint8(2 + off + j * 15 + 12),
											g = data.getUint8(2 + off + j * 15 + 13),
											b = data.getUint8(2 + off + j * 15 + 14);
										OJS.emit('pixel', x, y, [r, g, b]);
										Chunks.setPixel(x, y, [r, g, b]);
									}
									// Disconnects
									off += data.getUint16(off, true) * 15 + 2;
									for (let k = data.getUint8(off); k--;) {
										let dpid = data.getUint32(1 + off + k * 4, true);
										if(OJS.players[dpid]) {
											OJS.emit("disconnect", OJS.players[dpid]);
											delete OJS.players[dpid];
										}
									}
									break;
								}
							case OJS.options.opcode.chunkLoad:
								{
									let chunkX = data.getInt32(1, true);
									let chunkY = data.getInt32(5, true);
									let locked = !!data.getUint8(9);
									let u8data = new Uint8Array(realData, 10, realData.byteLength - 10);
									let decompressed = OJS.util.decompress(u8data)
									Chunks.setChunk(chunkX, chunkY, decompressed);
									if(locked) Chunks.protectChunk(chunkX, chunkY);
									OJS.emit('chunk', chunkX, chunkY, decompressed, locked);
									break;
								}
							case OJS.options.opcode.teleport:
								{
									if(!options.teleport) break;
									const x = data.getInt32(1, true);
									const y = data.getInt32(5, true);
									OJS.world.move(x, y);
									OJS.emit("teleport", x, y);
									break;
								}
							case OJS.options.opcode.setRank:
								{
									OJS.player.rank = data.getUint8(1);
									OJS.emit("rank", data.getUint8(1));
									break;
								}
							case OJS.options.opcode.captcha:
								{
									switch (data.getUint8(1)) {
										case OJS.options.captchaState.CA_WAITING:
											OJS.util.log("CaptchaState: WAITING (0)", "color: #ffff00");
											if(options.captchapass) {
												OJS.net.ws.send(OJS.options.misc.tokenVerification + "LETMEINPLZ" + options.captchapass);
												OJS.util.log("Used captchapass.", "color: #00ff00");
											};
											break;
										case OJS.options.captchaState.CA_VERIFYING:
											OJS.util.log("CaptchaState: VERIFYING (1)", "color: #ffff00");
											break;
										case OJS.options.captchaState.CA_VERIFIED:
											OJS.util.log("CaptchaState: VERIFIED (2)", "color: #00ff00");
											break;
										case OJS.options.captchaState.CA_OK:
											OJS.util.log("CaptchaState: OK (3)", "color: #00ff00");
											OJS.world.join(options.world);
											break;
										case OJS.options.captchaState.CA_INVALID:
											OJS.util.log("CaptchaState: INVALID (4)", "color: #ff0000");
											OJS.util.log("Captcha failed. Websocket is invalid now.", "color: #ff0000");
											OJS.net.destroyed = true;
											OJS.net.isWorldConnected = false;
											OJS.net.isWebsocketConnected = false;
											OJS.emit("destroy");
											break;
									}
									const id = data.getUint8(1);
									OJS.emit("captcha", id);
									(async () => {
										if(id === 0) await OJS.captcha.renderAndLogin(true);
									})();
									break;
								}
							case OJS.options.opcode.setPQuota:
								{
									let rate = data.getUint16(1, true);
									let per = data.getUint16(3, true);
									if(rate == 0 && per == 0) return;
									OJS.net.bucket = new Bucket(rate, per, OJS);
									OJS.emit("pquota", rate, per);
									if(document.getElementById(`owopfuck-${OJS.player.id}-pb`)) document.getElementById(`owopfuck-${OJS.player.id}-pb`).innerText = Math.floor(rate).toString();
									let totalQuota = 0;
									for (let i in bots) totalQuota += bots[i].net.bucket.rate;
									let cps = (totalQuota / (16 * 16)).toFixed(3);
									owopfuck.infowindow.container.childNodes[0].childNodes[15].innerText = "CPS: " + cps;
									OJS.util.log(`New PQuota: ${rate}x${per}`);
									break;
								}
							case OJS.options.opcode.chunkProtected:
								{
									let cx = data.getInt32(1, true);
									let cy = data.getInt32(5, true);
									let newState = data.getUint8(9);
									if(newState) Chunks.protectChunk(cx, cy);
									else Chunks.unProtectChunk(cx, cy);
									OJS.emit("chunkProtect", cx, cy, newState);
									break;
								}
						}
					},
					messageHandler(data) {
						if(typeof data !== "string") return error("Client.net.messageHandler: data is not string.");
						if(data.startsWith("You are banned")) {
							OJS.util.log("Got ban message.", "color: #ff0000");
							OJS.emit("banMessage");
							OJS.emit("destroy");
							OJS.net.isWorldConnected = false;
							OJS.net.isWebsocketConnected = false;
							return OJS.net.destroyed = true;
						};
						if(data.startsWith("DEV")) OJS.util.log("[DEV] " + data.slice(3));
						if(data.startsWith("<")) return;
						data = OJS.chat.recvModifier(data);
						const nick = data.split(":")[0];
						OJS.emit("message", data);
						OJS.chat.messages.push(data);
						if(OJS.chat.messages.length > OJS.options.maxChatBuffer) OJS.chat.messages.shift();
					}
				};
				void
					function makeSocket() {
						let ws = options.ws;
						if(!options.zombie) {
							ws.binaryType = "arraybuffer";
							ws.onopen = () => {
								OJS.util.log("WebSocket connected!", "color: #00ff00");
								OJS.net.isWebsocketConnected = true;

								owopfuck.infowindow.container.childNodes[0].childNodes[0].innerText = `Bots: ${bots.filter(bot => bot.net.ws.readyState === 1).length}`;

								OWOP.on(OWOP.events.tick, OJS.highlight.move);

								OJS.emit("open");
							};
							ws.onmessage = msg => {
								OJS.emit("rawMessage", msg.data);
								if(typeof msg.data === "string") OJS.net.messageHandler(msg.data);
								else if(typeof msg.data === "object") OJS.net.dataHandler(msg.data);
							};
							ws.onclose = () => {
								OJS.emit("close");
								OJS.util.log("WebSocket disconnected!", "color: #ff0000");
								OJS.net.isWorldConnected = false;
								OJS.net.isWebsocketConnected = false;
								owopfuck.infowindow.container.childNodes[0].childNodes[0].innerText = `Bots: ${bots.filter(bot => bot.net.ws.readyState === 1).length}`;
								if(options.reconnect && !OJS.net.destroyed) setTimeout(makeSocket, options.reconnectTime);
							};
							ws.onerror = () => {
								OJS.util.log("WebSocket error!", "color: #ff0000");
								OJS.net.isWorldConnected = false;
								OJS.net.isWebsocketConnected = false;
							};
							OJS.net.ws = ws;
						} else {
							ws.on("open", () => {
								OJS.util.log("WebSocket connected!", "color: #00ff00");
								OJS.net.isWebsocketConnected = true;

								owopfuck.infowindow.container.childNodes[0].childNodes[0].innerText = `Bots: ${bots.filter(bot => bot.net.ws.readyState === 1).length}`;

								OWOP.on(OWOP.events.tick, OJS.highlight.move);

								OJS.emit("open");
							});
							ws.on("message", msg => {
								OJS.emit("rawMessage", msg);
								if(typeof msg === "string") OJS.net.messageHandler(msg);
								else if(typeof msg === "object") OJS.net.dataHandler(msg);
							});
							ws.on("close", () => {
								OJS.emit("close");
								OJS.util.log("WebSocket disconnected!", "color: #ff0000");
								OJS.net.isWorldConnected = false;
								OJS.net.isWebsocketConnected = false;
								owopfuck.infowindow.container.childNodes[0].childNodes[0].innerText = `Bots: ${bots.filter(bot => bot.net.ws.readyState === 1).length}`;
								if(options.reconnect && !OJS.net.destroyed) setTimeout(makeSocket, options.reconnectTime);
							});
							ws.on("error", () => {
								OJS.util.log("WebSocket error!", "color: #ff0000");
								OJS.net.isWorldConnected = false;
								OJS.net.isWebsocketConnected = false;
							});
							OJS.net.ws = ws;
						};
					}();
				OJS.util = {
					log(...msg) {
						if(options.noLog) return;
						if(options.id) console.log(`[${options.id}] ${msg}`);
						else if(OJS.player.id) console.log(`%c [${OJS.player.id}] ` + msg[0], msg[1]);
						else console.log(`%c [?] ` + msg[0], msg[1]);
					},
					decompress(u8arr) {
						// I'm not touching this shit anymore.
						var originalLength = u8arr[1] << 8 | u8arr[0];
						var u8decompressedarr = new Uint8Array(originalLength);
						var numOfRepeats = u8arr[3] << 8 | u8arr[2];
						var offset = numOfRepeats * 2 + 4;
						var uptr = 0;
						var cptr = offset;
						for (var i = 0; i < numOfRepeats; i++) {
							var currentRepeatLoc = (u8arr[4 + i * 2 + 1] << 8 | u8arr[4 + i * 2]) + offset;
							while (cptr < currentRepeatLoc) {
								u8decompressedarr[uptr++] = u8arr[cptr++];
							}
							var repeatedNum = u8arr[cptr + 1] << 8 | u8arr[cptr];
							var repeatedColorR = u8arr[cptr + 2];
							var repeatedColorG = u8arr[cptr + 3];
							var repeatedColorB = u8arr[cptr + 4];
							cptr += 5;
							while (repeatedNum--) {
								u8decompressedarr[uptr] = repeatedColorR;
								u8decompressedarr[uptr + 1] = repeatedColorG;
								u8decompressedarr[uptr + 2] = repeatedColorB;
								uptr += 3;
							}
						}
						while (cptr < u8arr.length) {
							u8decompressedarr[uptr++] = u8arr[cptr++];
						}
						return u8decompressedarr;
					}
				};
				if(options.unsafe) OJS.util.log("Using 'unsafe' option.", "color: #ffff00");
				this._events = {};
			};
			on(event, fn) {
				if(!this._events[event]) this._events[event] = [];
				this._events[event].push(fn);
			};
			once(event, fn) {
				if(!this._events[event]) this._events[event] = [];
				this._events[event].push([fn]);
			};
			emit(event, ...args) {
				if(!this._events[event]) return;
				for (let i in this._events[event])
					if(typeof this._events[event][i] === "function") this._events[event][i](...args);
					else {
						this._events[event][i][0](...args);
						this._events[event].splice(i, 1);
					}
			};
			off(event, fn) {
				if(!this._events[event]) return;
				for (let i in this._events[event])
					if(String(this._events[event][i]) === String(fn)) this._events[event].splice(i, 1);
			}
		};
		Client.RANK = {
			ADMIN: 3,
			MODERATOR: 2,
			USER: 1,
			NONE: 0
		};
		Client.options = {
			chunkSize: 16,
			maxChatBuffer: 256,
			maxMessageLength: {
				0: 128,
				1: 128,
				2: 512,
				3: 16384
			},
			maxWorldNameLength: 24,
			worldBorder: 0xFFFFFF,
			opcode: {
				setId: 0,
				worldUpdate: 1,
				chunkLoad: 2,
				teleport: 3,
				setRank: 4,
				captcha: 5,
				setPQuota: 6,
				chunkProtected: 7
			},
			captchaState: {
				CA_WAITING: 0,
				CA_VERIFYING: 1,
				CA_VERIFIED: 2,
				CA_OK: 3,
				CA_INVALID: 4
			},
			captchaStateNames: {
				0: "WAITING",
				1: "VERIFYING",
				2: "VERIFIED",
				3: "OK",
				4: "INVALID"
			}
		};
		if(window.document === undefined) {
			Client.options.misc = {
				chatVerification: String.fromCharCode(10),
				tokenVerification: "CaptchA",
				worldVerification: 25565
			};
		} else Client.options.misc = {
			chatVerification: OWOP.options.serverAddress[0].proto.misc.chatVerification,
			tokenVerification: OWOP.options.serverAddress[0].proto.misc.tokenVerification,
			worldVerification: OWOP.options.serverAddress[0].proto.misc.worldVerification
		};
		class Bucket {
			constructor(rate, time, bot, infinite = false) {
				this.lastCheck = Date.now();
				this.allowance = rate;
				this.rate = rate;
				this.time = time;
				this.OJS = bot;
				this.infinite = infinite;
			};
			update() {
				this.allowance += (Date.now() - this.lastCheck) / 1000 * (this.rate / this.time);
				this.lastCheck = Date.now();
				if(this.allowance > this.rate) {
					this.allowance = this.rate;
				};
				// if(document.getElementById(`owopfuck-${this.OJS.player.id}-pb`)) document.getElementById(`owopfuck-${this.OJS.player.id}-pb`).innerText = Math.floor(this.OJS.net.bucket.allowance).toString();
			};
			canSpend(count) {
				if(this.infinite) return true;

				this.update();

				if(this.allowance < count) return false;

				this.allowance -= count;

				return true;
			};
			getTimeToRestore() {
				if(this.allowance >= this.rate) return 0;
				return (this.rate - this.allowance) / (this.rate / this.time);
			};
			async waitUntilRestore() {
				const restoreTime = this.getTimeToRestore() * 1000;
				return new Promise(resolve => setTimeout(resolve, restoreTime));
			};
		};
		const OJS = {
			Client: Client,
			ChunkSystem: ChunkSystem,
			Chunks: Chunks,
			Bucket: Bucket
		};

		OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("owopfuck", {
			closeable: false
		}, function (win) {
			let styles = document.createElement("style");
			let tabsys = document.createElement("script");
			let div = document.createElement("div");

			let container = win.container;
			container.id = "window-owopfuck";
			container.style.overflow = "hidden";
			container.parentNode.firstChild.remove();
			container.style = `overflow-y: auto;
margin: 0 -5px -5px -5px;
-o-border-image: url(/img/window_in.png) 5 repeat;`;
			container.classList = '';
			container.parentNode.style["position"] = "absolute";
			container.parentNode.style["pointer-events"] = "initial";
			container.parentNode.style["background-color"] = "rgb(17, 19, 20)";
			container.parentNode.style["border"] = "5px rgb(17, 19, 20) solid";
			container.parentNode.style["-o-border-image"] = "none";
			container.parentNode.style["border-image"] = "none";
			container.parentNode.style["border-image-outset"] = "0px";
			container.parentNode.style["box-shadow"] = "transparent 0px 0px 0px 0px";
			container.parentNode.style["z-index"] = "100";

			div.innerHTML = `<div id="owopfuck-topbar">
	<div id="owopfuck-title">
		<label style="font-size: 20px; color: rgb(240, 240, 240); font-weight: 500px; margin-left: 20px; line-height: 40px;">owopfuck</label>
		<label style="font-size: 20px; color: rgb(97, 109, 212); font-weight: 500px; line-height: 40px; margin-left: -3px;">.cc</label><
	</div>
	<div id="owopfuck-tablist">
		<button id="owopfuck-tabbtn-main" onclick="settab('main')" class="owopfuck-tabbtn-active">Main</button>
		<button id="owopfuck-tabbtn-bots" onclick="settab('bots')" class="owopfuck-tabbtn">Bot</button>
		<button id="owopfuck-tabbtn-animbuilder" onclick="settab('animbuilder')" class="owopfuck-tabbtn">Animation Builder</button>
		<button id="owopfuck-tabbtn-botnet" onclick="settab('botnet')" class="owopfuck-tabbtn">Botnet</button>
		<button id="owopfuck-tabbtn-proxy" onclick="settab('proxy')" class="owopfuck-tabbtn">Proxy</button>
		<button id="owopfuck-tabbtn-botlist" onclick="settab('botlist')" class="owopfuck-tabbtn">Bot list</button>
	</div>
</div>
<div id="owopfuck-content">
	<div id="owopfuck-tab-main" hidden>
		<div class="owopfuck-section">
			<label class="owopfuck-section">Client</label>
			<hr class="owopfuck-hr"></hr>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Autoreconnect</label>
					<input name="autoreconnect" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">IRC</label>
					<input id="owopfuck-irc" name="irc" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Anti-XSS</label>
					<input id="owopfuck-antixss" name="antixss" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Fake rank</label>
					<input id="owopfuck-fakerank" name="fakerank" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<label class="owopfuck-label">Prefix</label>
			<select id="owopfuck-fakerank-prefix" class="owopfuck-dropdown" name="fakerank_prefix">
				<option>(A)</option>
				<option>(M)</option>
				<option>User</option>
			</select>
		</div>
		<div class="owopfuck-section">
			<label class="owopfuck-section">Visuals</label>
			<hr class="owopfuck-hr"></hr>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Bot highlight</label>
					<input id="owopfuck-bothighlight" name="bothighlight" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Area highlight</label>
					<input id="owopfuck-areahighlight" name="areahighlight" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Area blink</label>
					<input id="owopfuck-areahighlightblink" name="areahighlightblink" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">No help button</label>
					<input id="owopfuck-nohelp" name="nohelp" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">MPP chat</label>
					<input id="owopfuck-mppchat" name="mppchat" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;" title="Requires restart">OWOP Font</label>
					<input id="owopfuck-owopfont" name="owopfont" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
		</div>
		<div class="owopfuck-section">
			<label class="owopfuck-section">GUIs, misc</label>
			<hr class="owopfuck-hr"></hr><div style="margin-bottom: 3px;" class="control-group">
			<label style="padding-left: 50px; margin-bottom: 3px;">
				<label class="owopfuck-cbtext" style="margin-left: 25px;">Main GUI</label>
				<div style="margin-top: -15px"><input name="guibind" class="owopfuck-keyinput" id="owopfuck-maingui-keybind" readonly></input></div>
			</label>
			<label style="padding-left: 50px; margin-bottom: 3px;">
				<label class="owopfuck-cbtext" style="margin-left: 25px;">IRC</label>
				<div style="margin-top: -15px"><input name="ircbind" class="owopfuck-keyinput" id="owopfuck-irc-keybind" readonly></input></div>
			</label>
			<div style="margin-bottom: 3px;" class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Vanish</label>
					<input id="owopfuck-vanish" name="vanish" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
		</div>
		</div>
	</div>
	<div id="owopfuck-tab-bots" hidden>
		<div class="owopfuck-section">
			<label class="owopfuck-section">Main</label>
			<hr class="owopfuck-hr"></hr>
			<label class="owopfuck-label">Bot nickname</label>
			<input placeholder="Nickname" class="owopfuck-text"></input>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Autoreconnect</label>
					<input name="botautoreconnect" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Auto M/A login</label>
					<input name="automalogin" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div>
				<label class="owopfuck-label">Bot count</label>
				<input class="owopfuck-range2" type="range" min="1" max="100" value="2" name="botcount"></input>
				<input id="owopfuck-botcount-input" style="margin-left: 0px" class="owopfuck-label owopfuck-rangetext" type="number" min="1" max="100" value="2"></input>
			</div>
			<button id="owopfuck-connect" class="owopfuck-btn">Connect</button>
			<button id="owopfuck-disconnect" class="owopfuck-btn">Disconnect</button>
			<br>
			<label class="owopfuck-label">Send message</label>
			<input id="owopfuck-chat-msg" placeholder="Message" class="owopfuck-text"></input>
			<button id="owopfuck-chat-send" class="owopfuck-btn">Send</button>
		</div>
		<div class="owopfuck-section">
			<label class="owopfuck-section">Pattern</label>
			<hr class="owopfuck-hr"></hr>
			<label class="owopfuck-label">Eraser</label>
			<select class="owopfuck-dropdown" name="eraserpattern"></select>
			<label class="owopfuck-label">Area</label>
			<select class="owopfuck-dropdown" name="areapattern"></select>
			<label class="owopfuck-label">Image paster</label>
			<select class="owopfuck-dropdown" name="pastepattern"></select>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Wolf move</label>
					<input name="wolfmove" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Instant place</label>
					<input name="instaplace" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Smart sneaky</label>
					<input name="smartsneaky" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Diagonal fill</label>
					<input name="diagfill" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div>
				<label class="owopfuck-label">Eraser chunksize</label>
				<input class="owopfuck-range" type="range" min="0" max="64" value="16" step="2" name="eraserdiameter"></input>
				<label id="owopfuck-eraserdiameter-label" style="margin-left: 0px" class="owopfuck-label">16</label>
			</div>
			<div>
				<label class="owopfuck-label">Free bucket</label>
				<input class="owopfuck-range" type="range" min="1" max="50" value="1" name="freebucket"></input>
				<label id="owopfuck-freebucket-label" style="margin-left: 0px" class="owopfuck-label">16</label>
			</div>
		</div>
		<div class="owopfuck-section">
			<label class="owopfuck-section">Movement</label>
			<hr class="owopfuck-hr"></hr>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Follow</label>
					<input id="owopfuck-follow" name="follow" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<div class="control-group">
				<label style="padding-left: 5px;" class="control control-checkbox">
					<label class="owopfuck-cbtext" style="margin-left: 25px;">Paint follow</label>
					<input name="paintfollow" type="checkbox"></input>
					<div class="control_indicator"></div>
				</label>
			</div>
			<label class="owopfuck-label">Tool</label>
			<select name="animationtool" class="owopfuck-dropdown">
				<option>Selected</option>
				<option>Cursor</option>
				<option>Move</option>
				<option>Pipette</option>
				<option>Zoom</option>
				<option>Export</option>
				<option>Fill</option>
				<option>Line</option>
				<option>Protect</option>
				<option>Copy</option>
				<option>Random</option>
			</select>
			<label class="owopfuck-label">Follow ID</label>
			<select class="owopfuck-dropdown" name="followid">
				<option>Disabled</option>
			</select>
			<label class="owopfuck-label">Animation</label>
			<select class="owopfuck-dropdown" name="animation">
				<option>Circle</option>
				<option>Circle 2</option>
				<option>Expanding circle</option>
				<option>Spinning circle</option>
				<option>3D</option>
				<option>50% Disk</option>
				<option>Asshole</option>
				<option>Atom</option>
				<option>Bot Line 2</option>
				<option>Bot Line</option>
				<option>Cobra</option>
				<option>Copy Disk</option>
				<option>Disk</option>
				<option>Disk X</option>
				<option>Eight</option>
				<option>Infinity 2</option>
				<option>Infinity</option>
				<option>Lasso</option>
				<option>Multiple Top - Bottom</option>
				<option>Paralelpipedum</option>
				<option>Rhombus</option>
				<option>Vertical Sector Circle</option>
				<option>Horizontal Sector Circle</option>
				<option>Cross</option>
				<option>Rect Random</option>
				<option>Piramid</option>
				<option>Random lines</option>
				<option>Random</option>
				<option>Random 2</option>
				<option>Random TB</option>
				<option>Right - Left</option>
				<option>Smooth Disk</option>
				<option>Smooth Disk 2</option>
				<option>Snake</option>
				<option>Snake 2</option>
				<option>Spiral</option>
				<option>Square</option>
				<option>Storm</option>
				<option>Top - Bottom</option>
				<option>Triagle</option>
				<option>Wave</option>
				<option>Wave 2</option>
				<option>Wave 3</option>
				<option>Wave 4</option>
				<option>Wave 5</option>
				<option>Wave 6</option>
				<option>Wave 7</option>
				<option>Spinning line</option>
				<option>X</option>
				<option>Xray</option>
				<option>卐</option>
			</select>
		</div>
	</div>
	<div class="owopfuck-full-tab" id="owopfuck-tab-animbuilder" hidden>
		<div style="background-color: rgb(22, 24, 26); width: 100%; margin-right: 10px;">
			<div class="animbuilder-canvas-container">
				<canvas id="animbuilder-canvas" height="525" width="300"></canvas>
			</div>
			<div class="animbuilder-sets-container">
				<div class="control-group">	
					<label style="padding-left: 5px;" class="control control-checkbox">
						<label class="owopfuck-cbtext" style="margin-left: 25px;">Simulate bot movement</label>
						<input id="owopfuck-animbuilder-movement" name="animbuildmovement" type="checkbox"></input>
						<div class="control_indicator"></div>
					</label>
				</div>
				<div>
					<label class="owopfuck-label">Bots</label>
					<input id="owopfuck-animationbuilder-bots" class="owopfuck-range" type="range" min="1" max="100" value="10" name="animbuildbots"></input>
					<label id="owopfuck-animbuildbots-label" style="margin-left: 0px" class="owopfuck-label">10</label>
				</div>
				<div>
					<label class="owopfuck-label">Line width</label>
					<input class="owopfuck-range" type="range" min="1" max="10" value="2" name="animbuildlwidth"></input>
					<label id="owopfuck-animbuildlwidth-label" style="margin-left: 0px" class="owopfuck-label">2</label>
				</div>
				<div>
					<label class="owopfuck-label">Interval MS</label>
					<input id="owopfuck-animbuildintms" class="owopfuck-range" type="range" min="0" max="1000" value="45" name="animbuildintms"></input>
					<label id="owopfuck-animbuildintms-label" style="margin-left: 0px" class="owopfuck-label">45</label>
				</div>
				<input id="animbuilder-x-expression" style="width: 119%; margin-top: 3px;" placeholder="X Expression" class="owopfuck-text"></input>
				<input id="animbuilder-y-expression" style="width: 119%; margin-top: 3px;" placeholder="Y Expression" class="owopfuck-text"></input>
				<button id="animbuilder-reset" style="width: 121%; margin-top: 8%;" class="owopfuck-btn">Reset</button>
				<button id="animbuilder-redraw" style="width: 121%;" class="owopfuck-btn">Redraw</button>
				<button id="animbuilder-copy" style="width: 121%;" class="owopfuck-btn">Copy expressions</button>
				<br><br>
				<input id="animbuilder-name" style="width: 119%; margin-top: 3px; text-align: center;" placeholder="Animation name" class="owopfuck-text"></input>
				<button id="animbuilder-add" style="width: 121%;" class="owopfuck-btn">Add</button>
				<br><br>
				<select id="animbuilder-animations" class="owopfuck-dropdown" style="width: 121%;"></select>
				<button id="animbuilder-remove" style="width: 121%;" class="owopfuck-btn">Remove</button>
			</div>
		</div>
	</div>
	<div id="owopfuck-tab-botnet" style="margin-left: 10px; margin-top: 8px; margin-right: 10px;" hidden>
		<button id="botnet-controlall" style="width: 98%;" class="owopfuck-btn">Control all</button>
		<br>
		<table id="owopfuck-botsnet">
			<tr id="owopfuck-botsnet-tr">
				<th id="owopfuck-botsnet-id">ID</th>
				<th id="owopfuck-botsnet-ip">IP</th>
				<th id="owopfuck-botsnet-sid">CONTROL</th>
				<th id="owopfuck-botsnet-actions">Actions</th>
			</tr>
		</table>
	</div>
	<div id="owopfuck-tab-proxy" style="margin-left: 10px; margin-top: 8px; text-align: center; margin-right: 10px;" hidden>
		<input id="owopfuck-proxy-input" style="width: 96%; margin-top: 3px; text-align: center;" placeholder="xxxx-yyyy" class="owopfuck-text"></input>
		<br>
		<button id="owopfuck-proxy-reconnect" style="width: 98%;" class="owopfuck-btn">Reconnect [ 0 / 0 ]</button>
		<br>
		<table id="owopfuck-wsproxy">
			<tr id="owopfuck-wsproxy-tr">
				<th id="owopfuck-wsproxy-name">Name</th>
				<th id="owopfuck-wsproxy-connections">Online</th>
				<th id="owopfuck-wsproxy-ip">IP</th>
				<th id="owopfuck-wsproxy-status">Status</th>
				<th id="owopfuck-wsproxy-actions">Actions</th>
			</tr>
		</table>
	</div>
	<div id="owopfuck-tab-botlist" style="margin-right: 10px;" hidden>
		<table id="owopfuck-bots">
			<tr id="owopfuck-bots-tr">
				<th id="owopfuck-bots-connection">Connection</th>
				<th id="owopfuck-bots-id">ID</th>
				<th id="owopfuck-bots-x">X</th>
				<th id="owopfuck-bots-y">Y</th>
				<th id="owopfuck-bots-color">Color</th>
				<th id="owopfuck-bots-pb">PB</th>
				<th id="owopfuck-bots-actions">Actions</th>
			</tr>
		</table>
	</div>
</div>`;
			tabsys.innerHTML = `let owopfuck_tabs = [
	document.getElementById("owopfuck-tab-main"),
	document.getElementById("owopfuck-tab-bots"),
	document.getElementById("owopfuck-tab-animbuilder"),
	document.getElementById("owopfuck-tab-botnet"),
	document.getElementById("owopfuck-tab-proxy"),
	document.getElementById("owopfuck-tab-botlist")
];
const altTabs = ["botnet", "proxy", "botlist"]; // those pages require block display, not flex (css)

function settab(Tab) {
	for(let i in owopfuck_tabs) {
		let tab = owopfuck_tabs[i];

		tab.hidden = true;
		tab.style.display = "none";
		document.getElementById("owopfuck-tabbtn-" + tab.id.slice(13)).classList = "owopfuck-tabbtn";
	};
	document.getElementById("owopfuck-tab-"+Tab).hidden = false;
	document.getElementById("owopfuck-tab-"+Tab).style.display = "flex";

	if(altTabs.includes(Tab))
		document.getElementById("owopfuck-tab-"+Tab).style.display = "block";

	document.getElementById("owopfuck-tabbtn-" + Tab).classList = "owopfuck-tabbtn-active";
};
settab("main")`;
			styles.innerHTML = `
.animbuilder-canvas-container {
	background-color: rgba(255, 255, 255, 0.03);
	position: relative;
	display: inline-block;
	width: 300px;
	height: 100%;
	box-shadow: inset 0 0 8px 3px;
}
.input-group {
	display: grid;
	grid-auto-flow: dense;
}
.animbuilder-sets-container {
	display: inline-block;
	vertical-align: top;
	margin-left: 5px;
	cursor: pointer;
	width: 48%;
	height: 53vh;
}
#window-owopfuck * {
	font-family: ${getValue("owopfont") ? "inherit" : "arial"};
}
.owopfuck-dropdown > option {
	background-color: rgb(24, 26, 28);
	border: 2px solid #222324;
	border-radius: 3px;
}
.owopfuck-dropdown {
	background-color: transparent;
	border: 2px solid #222324;
	border-radius: 3px;
	margin-left: 10px;
	color: rgb(230, 230, 230);
	width: 93%;
	margin-top: 1px;
}
.owopfuck-keyinput {
	height: 18px;
	width: 50px;
	background: transparent;
	border: 1px solid #222324;
	border-radius: 3px;
	margin-left: 10px;
	color: white;
	text-align: center;
}
input.owopfuck-range[type="range"] {
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	cursor: pointer;
	width: 215px;
	margin-left: 10px;
}
input.owopfuck-range[type="range"]:focus {
	outline: none;
}
input.owopfuck-range[type="range"]::-webkit-slider-runnable-track {
	background-color: #383839;
	border-radius: 3px;
	height: 5px;
}
input.owopfuck-range[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	margin-top: -5.5px;
	background-color: #5666f2;
	border-radius: 15px;
	height: 16px;
	width: 16px;
}
input.owopfuck-range[type="range"]::-moz-range-track {
	background-color: #383839;
	border-radius: 3px;
	height: 5px;
}
input.owopfuck-range[type="range"]::-moz-range-thumb {
	background-color: #5666f2;
	border: none;
	border-radius: 15px;
	height: 16px;
	width: 16px;
}
input.owopfuck-range2[type="range"] {
	-webkit-appearance: none;
	appearance: none;
	background: transparent;
	cursor: pointer;
	width: 190px;
	margin-left: 10px;
}
input.owopfuck-range2[type="range"]:focus {
	outline: none;
}
input.owopfuck-range2[type="range"]::-webkit-slider-runnable-track {
	background-color: #383839;
	border-radius: 3px;
	height: 5px;
}
input.owopfuck-range2[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	margin-top: -5.5px;
	background-color: #5666f2;
	border-radius: 15px;
	height: 16px;
	width: 16px;
}
input.owopfuck-range2[type="range"]::-moz-range-track {
	background-color: #383839;
	border-radius: 3px;
	height: 5px;
}
input.owopfuck-range2[type="range"]::-moz-range-thumb {
	background-color: #5666f2;
	border: none;
	border-radius: 15px;
	height: 16px;
	width: 16px;
}
.owopfuck-text {
	background-color: transparent;
	border: 2px solid #222324;
	margin-left: 10px;
	border-radius: 3px;
	color: rgb(230, 230, 230);
}
.owopfuck-rangetext {
	/* -moz-appearance: textfield; */
	background-color: transparent;
	border: 2px solid #222324;
	margin-left: 10px;
	border-radius: 3px;
	color: rgb(230, 230, 230);
	width: 35px;
    text-align: center;
}
/*
.owopfuck-rangetext::-webkit-inner-spin-button,
.owopfuck-rangetext::-webkit-outer-spin-button {
  	-webkit-appearance: none;
  	margin: 0;
}
*/
.owopfuck-label {
	margin-left: 15px;
	color: rgb(230, 230, 230);
	font-size: 14px;
}
.owopfuck-cbtext {
	position: absolute;
	margin-top: 4px;
	margin-left: 6px;
	color: rgb(230, 230, 230);
	font-size: 13px;
}
hr.owopfuck-hr {
	border: solid 1px rgb(74, 86, 198);
	box-shadow: rgb(74, 86, 198) 0px 0px 11px 2px;
	margin-bottom: 5px;
	margin-top: 3px;
}
label.owopfuck-section {
	color: rgb(230, 230, 230);
}
div.owopfuck-section {
	border-radius: 5px;
	height: 530px;
	background-color: rgb(22, 24, 26);
	margin: 0 10px 10px 0;
	flex: 1;
}
div[id^="owopfuck-tab-"] {
	display: flex;
    margin-left: 10px;
    margin-top: 8px;
	overflow-y: auto;
}
#owopfuck-tablist {
	text-align: right;
	margin-top: -40px;
}
::-webkit-scrollbar-thumb {
    background-color: rgb(65, 65, 65);
}
::-webkit-scrollbar-button {
   	display: none;
}
::-webkit-scrollbar {
    width: 6px;
    height: 1px;
}
html, body {
	background-color: rgb(11, 11, 11);
}
.owopfuck-tabbtn {
	border: none;
	background: transparent;
	width: 95px;
	height: 40px;
	color: rgb(150, 150, 150);
	font-size: 11.5px;
	padding: 0;
	margin: 0;
}
.owopfuck-tabbtn:active, .owopfuck-tabbtn-active:active {
	border: none;
	-o-border-image: none;
	   border-image: none;
	transition: -webkit-filter 0.125s;
	transition: filter 0.125s;
	transition: filter 0.125s, -webkit-filter 0.125s;
}
.owopfuck-tabbtn-active {
	border: none;
	background: linear-gradient(0deg, rgb(74 88 200 / 55%) 0%, rgba(0, 0, 0, 0) 100%);
	border-bottom: solid 2px rgb(74 88 200);
	width: 95px;
	height: 40px;
	color: rgb(150, 150, 150);
	font-size: 11.5px;
	padding: 0;
	margin: 0;
}
.owopfuck-tabbtn:hover {
	border: none;
	background: linear-gradient(0deg, rgb(54 68 180 / 55%) 0%, rgba(0, 0, 0, 0) 100%);
	border-bottom: solid 2px rgb(44 58 170);
	width: 95px;
	height: 40px;
	color: rgb(150, 150, 150);
	font-size: 11.5px;
	padding: 0;
	margin: 0;
}
.owopfuck-btn {
	border: 2px solid #222324;
	border-radius: 3px;
	background: rgba(200, 200, 200, 0.01);
	width: 93%;
	height: 25px;
	color: rgb(150, 150, 150);
	font-size: 11.5px;
	margin-bottom: 1px;
	margin-top: 2px;
	margin-left: 10px;
}
.owopfuck-smallbtn {
	border: 2px solid #222324;
	border-radius: 3px;
	background: rgba(200, 200, 200, 0.01);
	width: 72%;
	height: 25px;
	color: rgb(150, 150, 150);
	font-size: 11.5px;
	margin-bottom: 1px;
	margin-top: 2px;
	margin-left: 10px;
}
.owopfuck-smallbtn2 {
	border: 2px solid #222324;
	border-radius: 3px;
	background: rgba(200, 200, 200, 0.01);
	width: 40%;
	height: 25px;
	color: rgb(150, 150, 150);
	font-size: 11.5px;
	margin-bottom: 1px;
	margin-top: 2px;
	margin-left: 10px;
}
#owopfuck-topbar {
	background-color: rgb(13, 15, 17);
	height: 40px;
}
#window-owopfuck {
	background-color: rgb(17, 19, 20);
	width: 800px;
	height: 590px;
}
.control {
	display: block;
	position: relative;
	padding-left: 25px;
	margin-bottom: 1px;
	padding-top: 1px;
	cursor: pointer;
	font-size: 16px;
	margin-left: 10px;
	padding-bottom: 20px;
}
.control input {
	position: absolute;
	z-index: -1;
	opacity: 0;
}
.control_indicator {
	position: absolute;
	top: 2px;
	left: 0;
	height: 18px;
	width: 18px;
	background: transparent;
	border: 1px solid #222324;
	border-radius: 3px;
}
.control:hover input ~ .control_indicator,
.control input:focus ~ .control_indicator {
	background: rgba(255, 255, 255, 0.025);
}

.control input:checked ~ .control_indicator {
	background: #4a59c8;
}
.control:hover input:not([disabled]):checked ~ .control_indicator,
.control input:checked:focus ~ .control_indicator {
	background: #0e6647d;
}
.control input:disabled ~ .control_indicator {
	background: #333f9e;
	opacity: 1;
	pointer-events: none;
}
.control_indicator:after {
	box-sizing: unset;
	content: '';
	position: absolute;
	display: none;
}
.control input:checked ~ .control_indicator:after {
	display: block;
}
.control-checkbox .control_indicator:after {
	left: 7px;
	top: 3px;
	width: 3px;
	height: 8px;
	border: solid #111314;
	border-width: 0 2px 2px 0;
	transform: rotate(45deg);
}
.control-checkbox input:disabled ~ .control_indicator:after {
	border-color: #111314;
}
table[id^="owopfuck-"] {
	border-collapse: collapse;
	color: rgb(75 88 213);
	text-align: center;
	width: -webkit-fill-available;
	border: solid 1px rgb(55, 55, 55);
	font-family: 'pixel-op';
}
th[id^="owopfuck-bots"], td[id^="owopfuck-bots"] {
	font-family: Verdana;
	font-size: 12.5px;
	padding: 2px;
	text-align: center;
	border-color: rgb(200, 200, 200);
	border-width: 1px;
	border-style: double;
	border-right-style: none;
	width: 110px;
	border: solid 1px rgb(55, 55, 55);
}
tr[id^="owopfuck-"]:first-child {
	text-align: center;
	border: solid 1px rgb(55, 55, 55);
}`;

			win.addObj(div);
			win.addObj(styles);
			win.addObj(tabsys);
		}).move(165, 115));

		addResizeableProperty("window-owopfuck", "window-owopfuck");

		OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("owopfuck info", {
			closeable: false
		}, function (win) {
			const div = document.createElement("div");

			let container = win.container;
			container.id = 'window-owopfuck-info';
			container.parentNode.firstChild.remove();
			container.style = `overflow: hidden;
margin: 0 -5px -5px -5px;
-o-border-image: url(/img/window_in.png) 5 repeat;`;
			container.classList = '';
			container.parentNode.style["position"] = "absolute";
			container.parentNode.style["pointer-events"] = "initial";
			container.parentNode.style["background-color"] = "rgb(17, 19, 20)";
			container.parentNode.style["border"] = "4px rgb(17, 19, 20) solid";
			container.parentNode.style["width"] = "200px";
			// container.parentNode.style["height"] = "80px";
			// commented to make the height automatically set

			div.innerHTML = `<label class="owopfuck-label">Bots: 0</label><br>
<label class="owopfuck-label">Time remaining: no job </label><br>
<label class="owopfuck-label">Jobs: no jobs </label><br>
<label class="owopfuck-label">Protected chunks: 0</label><br>
<label class="owopfuck-label">IRC users: 0</label><br>
<label class="owopfuck-label">CPS: 0.000</label>`;

			win.addObj(div);
		}).move(105, window.innerHeight - 120));

		OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("owopfuck assets", {
			closeable: false
		}, function (win) {
			const div = document.createElement("div");

			let container = win.container;
			container.parentNode.style.width = "260px";
			container.parentNode.style.height = "500px";
			container.id = 'window-owopfuck-assets';
			container.parentNode.firstChild.remove();
			container.style = `margin: 0 -5px -5px -5px;
-o-border-image: url(/img/window_in.png) 5 repeat;`;
			container.classList = '';
			container.parentNode.style["position"] = "absolute";
			container.parentNode.style["pointer-events"] = "initial";
			container.parentNode.style["background-color"] = "rgb(17, 19, 20)";
			container.parentNode.style["border"] = "4px rgb(17, 19, 20) solid";

			div.innerHTML = `<button id="owopfuck-asset-add" class="owopfuck-btn">Upload</button>
<br>
<div id="owopfuck-assets-container"></div>`;

			win.addObj(div);
		}).move(130, 200));

		OWOP.windowSys.addWindow(new OWOP.windowSys.class.window("owopfuck jobs", {
			closeable: false
		}, function (win) {
			const div = document.createElement("div");

			let container = win.container;
			container.parentNode.style.width = "260px";
			container.parentNode.style.height = "500px";
			container.id = 'window-owopfuck-assets';
			container.parentNode.firstChild.remove();
			container.style = `margin: 0 -5px -5px -5px;
-o-border-image: url(/img/window_in.png) 5 repeat;`;
			container.classList = '';
			container.parentNode.style["position"] = "absolute";
			container.parentNode.style["pointer-events"] = "initial";
			container.parentNode.style["background-color"] = "rgb(17, 19, 20)";
			container.parentNode.style["border"] = "4px rgb(17, 19, 20) solid";

			div.innerHTML = `<button id="owopfuck-clear-jobs" class="owopfuck-btn">Clear jobs</button>
<br>
<div id="owopfuck-jobs-container">
	<table id="owopfuck-jobs">
		<tr id="owopfuck-jobs-tr">
			<th id="owopfuck-jobs-pos">POS</th>
			<th id="owopfuck-jobs-pos">TIME</th>
			<th id="owopfuck-jobs-pos">ACTION</th>
		</tr>
	</table>
</div>`;

			win.addObj(div);
		}).move(130, 200));

		let selectedAsset = null;
		const refreshAssets = () => {
			let assets = getValue("assets");
			const assetsDiv = document.getElementById("owopfuck-assets-container");
			assetsDiv.innerHTML = '';

			for (let i in assets) {
				const image = new Image();
				image.onload = () => {
					image.style.width = "96px";
					image.style.height = "96px";
					image.style.border = "solid 1px";
					image.onclick = e => {
						for (let j in document.getElementById("owopfuck-assets-container").children) {
							if(typeof (document.getElementById("owopfuck-assets-container").children[j]) !== "object") break;
							document.getElementById("owopfuck-assets-container").children[j].style.border = "solid 1px";
						};
						selectedAsset = assets[i];
						image.style.border = "solid 1px red";
					};
					image.oncontextmenu = e => {
						e.preventDefault();
						assets.splice(i, 1);
						setValue("assets", JSON.stringify(assets));
						refreshAssets();
					};
					assetsDiv.append(image);
				};
				image.src = assets[i];
			};
		};
		refreshAssets();

		let last = 0;
		const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
		const getFree = () => {
			let b = bots.filter(i => i.net.ws.readyState === 1 && i.net.isWorldConnected);
			if(b.length === 0) return -1;
			if(last >= b.length) last = 0;
			return last++;
		};
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		};
		function squareX(angle) {
			let x = Math.sin(angle), y = Math.cos(angle);
			return x / Math.max(Math.abs(x), Math.abs(y));
		};
		function squareY(angle) {
			let x = Math.sin(angle), y = Math.cos(angle);
			return y / Math.max(Math.abs(x), Math.abs(y));
		};
		function infinityX(t) {
			let x = (Math.cos(t * 2) - 1) / 2;
			if(Math.abs(t * 2) % (4 * Math.PI) > 2 * Math.PI) return -x;
			else return x;
		};
		function infinityY(t) {
			return Math.sin(t * 2) / 2;
		};
		function load(url, onload) {
			let script = document.createElement('script');
			script.src = url;
			script.onload = onload;
			document.head.appendChild(script);
		};
		function sanitizeInput(input) {
            return input.replace(/[&<>"'/]/g, function (match) {
                return {
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    '"': '&quot;',
                    "'": '&#39;',
                    '/': '&#x2F;'
                }[match];
            });
        };
        function isInputSafe(input) {
            const htmlTags = /<\/?[a-z][\s\S]*>/i;
            const scriptTags = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
            const eventHandlers = /on\w+="[^"]*"/i;

            if (htmlTags.test(input)) return false;
            if (scriptTags.test(input)) return false;
            if (eventHandlers.test(input)) return false;

            return true;
        };
		const defaultrecvModifier = (msg) => {
			if(msg == "Stop playing around with mod tools! :)") return;
			if(!isInputSafe(msg)) return "[ANTI-XSS] " + sanitizeInput(msg);
			return msg;
		};
		OWOP.chat.recvModifier = defaultrecvModifier;
		load("https://www.google.com/recaptcha/api.js");

		// (auto) manual updater
		fetch("https://raw.githubusercontent.com/scar17off/scar17off/main/owopfuck/version")
			.then(data => {
				return data.text();
			}).then(data => {
				if(data !== SCRIPT_VERSION) {
					location.href = "https://raw.githubusercontent.com/scar17off/scar17off/main/owopfuck/script.js"; // i will force everyone to update owopfuck
				};
			});

		document.getElementById("owopfuck-fakerank").addEventListener("input", () => {
			const checked = document.getElementById("owopfuck-fakerank").checked;

			if(checked) {
				OWOP.chat.recvModifier = (msg) => {
					if(msg == "Stop playing around with mod tools! :)") return;
					let temp = msg.split(':');
					if((temp[0].includes(OWOP.player.id.toString()) || temp[0].includes(localStorage.nick.toString())) && getValue("fakerank")) {
						if(msg.startsWith("(M)") || msg.startsWith("(A)")) msg = msg.replace("(M) ", '').replace("(A) ", '');
						msg = (document.getElementById("owopfuck-fakerank-prefix").value !== "User") ? `${document.getElementById("owopfuck-fakerank-prefix").value} ${msg.replace("[" + OWOP.player.id + "] ")}` : `[${OWOP.player.id}] ${localStorage.nick}: ${msg.replace("[" + OWOP.player.id.toString() + "] ", '').replace(localStorage.nick + ": ", '')}`;
						// msg = `${document.getElementById("owopfuck-fakerank-prefix").value} ${msg.replace("["+OWOP.player.id+"] ")}`;
					};
					return msg;
				};
				for (var k in OWOP.tool.allTools) {
					OWOP.tool.allTools[k].rankRequiredB = OWOP.tool.allTools[k].rankRequired;
					// if(OWOP.tool.allTools[k].rankRequiredB === 3) console.log("admin " + k);
					// if(OWOP.tool.allTools[k].rankRequiredB === 2) console.log("mod " + k);
					OWOP.tool.allTools[k].rankRequired = 1;
					OWOP.tool.updateToolbar();
				};
			} else {
				OWOP.chat.recvModifier = defaultrecvModifier;
				for (var k in OWOP.tool.allTools) {
					OWOP.tool.allTools[k].rankRequired = OWOP.tool.allTools[k].rankRequiredB;
					OWOP.tool.updateToolbar();
				};
			};
		});
		document.getElementById("owopfuck-asset-add").addEventListener("click", async () => {
			let assets = getValue("assets");
			assets.push(await upload("image/*"));
			setValue("assets", JSON.stringify(assets));
			refreshAssets();
		});
		var socket;
		WebSocket.prototype.oldSend = WebSocket.prototype.send;
		WebSocket.prototype.send = function (data) {
			if(!socket && this.url !== "wss://botnet.scar17off.repl.co") socket = this;
			if(getValue("vanish") && this === socket && this.url !== "wss://botnet.scar17off.repl.co") {
				if(typeof data == "object") {
					if(data.byteLength == 12) {
						let dv = new DataView(data);
						dv.setInt32(0, 0, true);
						dv.setInt32(4, 0, true);
						dv.setUint8(8, 0);
						dv.setUint8(9, 0);
						dv.setUint8(10, 0);
						dv.setUint8(11, 0);
						socket.oldSend(data);
					} else {
						this.oldSend(data);
					};
				};
			} else {
				this.oldSend(data);
			};
		};
		document.getElementById("owopfuck-bothighlight").addEventListener("input", () => {
			const checked = document.getElementById("owopfuck-bothighlight").checked;
			if(checked) {
				bots.forEach(bot => {
					bot.highlight.move();
				});
			} else {
				bots.forEach(bot => {
					bot.highlight.shown = false;
					bot.highlight.element.remove();
					OWOP.removeListener(OWOP.events.tick, bot.highlight.move);
					bot.highlight.move();
				});
			};
		});
		let ircServer;
		function reconnectIRC() {
			ircServer = io("wss://owopfuck-cc.scar17off.repl.co/");
			try {
				ircServer.on("message", (id, author, message) => displayIRCmessage(id, author, message));
				ircServer.on("self", (id) => ircServer.id = id);
				ircServer.on("users", (n) => owopfuck.infowindow.container.childNodes[0].childNodes[12].innerText = 'IRC users: ' + n);
			} catch (error) {

			};
		};
		function displayIRCmessage(id, author, message) {
			if(id == ircServer.id) return;
			OWOP.chat.local(`<span style="color: #eb4034;">IRC <span style="color: #34abeb;">[${id}] ${author}:</span></span> <span style="color: white">${message}</span>`);
		};
		if(getValue("irc")) reconnectIRC();
		document.getElementById("owopfuck-irc").addEventListener("input", () => {
			if(!document.getElementById("owopfuck-irc").checked && ircServer) {
				ircServer.close();
			} else if(document.getElementById("owopfuck-irc").checked) {
				reconnectIRC();
			};
		});
		let chatInput = document.getElementById("chat-input");
		chatInput.addEventListener("keydown", function (event) {
			let key = event.key;
			if(event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) key = "R" + key;
			if(key == getValue("ircbind") && getValue("irc")) {
				if(chatInput.value.startsWith("/nick ")) {
					let nick = chatInput.value.replace("/nick ", '');
					localStorage.ircnick = nick;
					chatInput.value = '';
					chatInput.style.height = "16px";
					event.stopPropagation();
					return;
				};
				if(chatInput.value.trimLeft().trimRight() == '') return;
				OWOP.chat.local(`<span style="color: #eb4034;">IRC <span style="color: #34abeb;">[${ircServer.id}] ${localStorage.ircnick}:</span></span> <span style="color: white">${chatInput.value.replaceAll('<', '').replaceAll('>', '')}</span>`);
				ircServer.emit("send", chatInput.value, localStorage.ircnick);
				chatInput.value = '';
				chatInput.style.height = "16px";
				event.stopPropagation();
			};
		});
		const switchVisiblity = (window) => OWOP.windowSys.windows[window].container.parentNode.hidden = !OWOP.windowSys.windows[window].container.parentNode.hidden;
		switchVisiblity("owopfuck assets");
		switchVisiblity("owopfuck jobs");
		switchVisiblity("owopfuck");
		document.addEventListener("keydown", (E) => {
			let key = E.key;

			switch (key) {
				case getValue("guibind"):
					switchVisiblity("owopfuck");
					break;
			};
		});
		// needed to generate random proxy IP to bypass
		function randomIP() {
			return `${getRandomInt(1, 255)}.${getRandomInt(1, 255)}.${getRandomInt(1, 255)}.${getRandomInt(1, 255)}`;
		};
		// stolen from polybius
		function protect(r, Q) {
			let c = e => e.split('').map(h => h.charCodeAt(0));
			let N = e => ('0' + Number(e).toString(16)).substr(-2);
			let J = e => c(r).reduce((h, T) => h ^ T, e);
			return Q.split('').map(c).map(J).map(N).join('');
		};

		// botnet
		class BotNetReplicator {
			constructor(zombie) {
				this._events = {};
				this.on = (event, fn) => {
					if(!this._events[event]) this._events[event] = [];
					this._events[event].push(fn);
				};
				this.once = (event, fn) => {
					if(!this._events[event]) this._events[event] = [];
					this._events[event].push([fn]);
				};
				this.emit = (event, ...args) => {
					if(!this._events[event]) return;
					for (let i in this._events[event])
						if(typeof this._events[event][i] === "function") this._events[event][i](...args);
						else {
							this._events[event][i][0](...args);
							this._events[event].splice(i, 1);
						}
				};
				this.off = (event, fn) => {
					if(!this._events[event]) return;
					for (let i in this._events[event])
						if(String(this._events[event][i]) === String(fn)) this._events[event].splice(i, 1);
				}

				this.readyState = 0;

				botnet.on("message", (id, message) => {
					if(id !== zombie) return;
					this.emit("message", message);
				});

				botnet.on("status", (id, status) => {
					if(id !== zombie) return;
					if(status == "open") this.readyState = 1;
					if(status == "close") this.readyState = 3;
					this.emit(status);
				});

				this.send = (data) => {
					botnet.emit("send", zombie, data);
				};

				this.close = () => {
					botnet.emit("close", zombie);
				};
			};
		};

		const botnet = io("wss://botnet.scar17off.repl.co");

		botnet.on("connect", () => {
			botnet.emit("controller"); // mark current websocket as controller to not leak your ip
		});
		botnet.on("id", id => {
			botnet.id = id;
		});
		const defaultBotnetHTML = document.getElementById("owopfuck-botsnet").innerHTML;
		botnet.on("list", (list) => {
			document.getElementById("owopfuck-botsnet").innerHTML = defaultBotnetHTML;

			for (let i in list) {
				let zombie = list[i];
				let zombieTable = document.createElement("tr");

				zombieTable.innerHTML = `<td id="botnet-${zombie.sid}-id">${zombie.id.toString()}</td>
<td id="botnet-${zombie.sid}-ip">${zombie.ip}</td>
<td id="botnet-${zombie.sid}-controlled">${(zombie.controller == botnet.id) ? "✅" : "❌"}</td>
<td id="botnet-${zombie.sid}-actions">
	<button id="botnet-${zombie.sid}-control" class="owopfuck-smallbtn2">CONTROL</button>
	<button id="botnet-${zombie.sid}-connect" class="owopfuck-smallbtn2">CONNECT</button>
</td>`;
				zombieTable.id = `owopfuck-botnet-${zombie.sid}`;

				document.getElementById("owopfuck-botsnet").appendChild(zombieTable);

				if(zombie.controller == botnet.id) {
					document.getElementById(`botnet-${zombie.sid}-control`).remove();

					document.getElementById(`botnet-${zombie.sid}-connect`).addEventListener("click", () => {
						botnet.emit("con", zombie.id, OWOP.options.serverAddress[0].url, "arraybuffer");

						let options = {
							index: bots.length + 1,
							world: OWOP.world.name || undefined,
							reconnect: getValue("botautoreconnect"),
							reconnectTime: 250,
							noLog: true,
							adminlogin: getValue("automalogin") ? localStorage.adminlogin : undefined,
							modlogin: getValue("automalogin") ? localStorage.modlogin : undefined,
							captchapass: localStorage.owopcaptcha,
							pass: localStorage.worldPasswords ? JSON.parse(localStorage.worldPasswords)[OWOP.world.name] : undefined,
							zombie: zombie.id
						};

						var bot = new OJS.Client(options);
						bot.on("close", () => {
							bots.splice(bots.indexOf(bot), 1);
						});
						bot.on("connect", (id) => {
							if(OWOP.player.id.toString() === id) return;
							let playerOption = document.createElement("option");
							playerOption.innerText = id.toString();

							if(!Array.from(document.querySelector("*[name^=\"followid\"]").options).some(option => option.value === id))
								document.querySelector("*[name^=\"followid\"]").options.add(playerOption);
						});
						bot.on("disconnect", (player) => {
							for (let i in document.querySelector("*[name^=\"followid\"]").options) {
								if(document.querySelector("*[name^=\"followid\"]").options[i].innerText === player.id.toString())
									document.querySelector("*[name^=\"followid\"]").options.remove(i);
							};
						});
						bots.push(bot);
					});
				} else {
					document.getElementById(`botnet-${zombie.sid}-connect`).remove();

					document.getElementById(`botnet-${zombie.sid}-control`).addEventListener("click", () => {
						botnet.emit("control", zombie.id);
					});
				};
			};
		});

		document.getElementById("botnet-controlall").addEventListener("click", () => {
			document.getElementById("owopfuck-botsnet").childNodes.forEach((bot) => {
				if(bot.id) bot.childNodes[6].childNodes[1].click();
			});
		});

		// wsproxy
		let onlineproxy = 0;
		let ProxyPasswords = getValue('wsproxy');
		let proxylist = {};
		const defaultServersHTML = document.getElementById("owopfuck-wsproxy").innerHTML;
		const updateServers = () => {
			proxylist = {};
			ProxyPasswords = getValue('wsproxy');
			const servers = document.getElementById("owopfuck-wsproxy");
			document.getElementById("owopfuck-wsproxy").innerHTML = defaultServersHTML;
			for (let i in ProxyPasswords) {
				const Proxy = ProxyPasswords[i].replace('\n', '');
				let soc = `wss://${Proxy}.glitch.me/?ws=WS-STATUS`;
				let site = `https://glitch.com/edit/#!/${Proxy}`;
				let ico = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACOlBMVEUAAAD/dpj/dpj/dpj/dpj/dJf/dpj/d5f/d5f/eJf/eJf/eJb/eZb/j4L/dpj/dpf/dpj/epz/d5n5c5rkaaPlaaPvb5/+eJf/fZL/d5f/dpj/dpj/dpj3dJW9VLPYYqf5cpn/dZf/dZf/dpj5dpf/iK3+qtT+qdP+ver/x/L/x/DzufCqePa1gfTSnPL6wO//xe7/xe7+w+4AAP8tB/9GHf87DPUwBfokAP8UAP8FAP85Ef1PI/woAP8pA/dhIuBHEu4sAvwnAP8mAP8nAP8rBfgzHf9LU/9JUP9Xcv9cfv9bfP9bev9bev9aev9aeP9aeP9aeP9aef9aef9aef9aeP9aeP9aeP9aeP9aeP9ZeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP9aeP/MXK/UYKvdZaehZHPkhpzrbKKmSb+vTbvVYarKXK/AVrO3Ubaoa3rjhJv1cZ6lS7/EWrL/eZf/eJf/fJ36hK3lerbCacXLbcH+hqv/rNT/q9L1pdW8i+Pcm9v/rdH/rNH/sdj/v+n+vun6u+z+verqsfHss/HervK5ivandvepd/dJH/1OI/phL/BhJ+dMFutFEu8/LqVLM+U4CvZ2L9VyLNhQGOpZHOViIuBpJtxGN6NONeEyBvt5MdVdIOMoCf8wGf8xGv84HfxLKfJrPOFgNuYzGv9MU/9JUP9SU/yGb+xqYPRNXP9Xcv9Wcf9cdfxYcv9mf/5hff5aef9aeP////+BcnYeAAAAaHRSTlMAFzQWAw4rPbPx1KBCAQEFUL/r8/7mlFskFkeLgPD84tX24tX+w3/3yy+S5v7rxoptq7cEUtj8w2wjEU6rgfD74tX14dX+w4D3yzCU2+bz++zJi26utwMcJGvn+ahoUS8QAQceBCxFGs5gm8UAAAABYktHRL091dJ5AAAAB3RJTUUH5ggcBx8tq7y1twAAAOdJREFUGNNjYMAKGJmYWRA8VjZ2Dk4ubh5eEIePgV9AUEhYJCMzS1RMXEJSSppBRjY7Jzcvv6CwqFhOXkFRiUFZpaS0rLyisqq6prauvkGVQU29sam5pbWtvaOzs6u7R4NBU0u7t69/wsRJOrp6+gaGRgzGJqaTp0ydNn2GmbmFpZW1DYOt3cxZs+fMnTd/wUJ7B0cnZwYX10WLlyxdtnzFylWr16xd58bg7rF+w8ZNm7ds3bp127btOzwZvLx9fP127tq9xz8gMCg4JJSBISw8IjIqOiY2Lj4hkSEpGeyblNS0dAZcAADzgEgQixaTYgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0wOC0yOFQwNzozMTo0NSswMDowMFFjl0UAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMDgtMjhUMDc6MzE6NDUrMDA6MDAgPi/5AAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIyLTA4LTI4VDA3OjMxOjQ1KzAwOjAwdysOJgAAAABJRU5ErkJggg==';
				if(Proxy.includes(".")) {
					let data = Proxy.split(".");
					soc = `wss://${Proxy}.repl.co/?ws=WS-STATUS`;
					site = `https://replit.com/@${data[1]}/${data[0]}`;
					ico = 'data:image/png;base64,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';
				};
				let displayname = getValue("streamer") ? 'STREAMER MODE' : Proxy;
				let proxytable = document.createElement("tr");
				proxytable.id = `owopfuck-wsproxy-${Proxy}`;
				proxytable.innerHTML = `
<td id="owopfuck-wsproxy-${Proxy}-name"><img width="16" height="16" class="owopfuck-wsproxyico" src="${ico}"></img><a id="owopfuck-wsproxy-link-${Proxy}" class="owopfuck-label" href="${site}">${displayname}</a></td>
<td id="owopfuck-wsproxy-${Proxy}-online">❓</td>
<td id="owopfuck-wsproxy-${Proxy}-ip" style="width: 200px;">❓</td>
<td id="owopfuck-wsproxy-${Proxy}-status">❓</td>
<td id="owopfuck-wsproxy-${Proxy}-actions">
	<button class="owopfuck-smallbtn2" style="width: 25%;" id="owopfuck-wsproxy-${Proxy}-connect">Connect</button>
	<button class="owopfuck-smallbtn2" style="width: 25%;" id="owopfuck-wsproxy-${Proxy}-disconnect">Disconnect</button>
	<button class="owopfuck-smallbtn2" style="width: 25%;" id="owopfuck-wsproxy-${Proxy}-delete">❌</button>
</td>`;
				servers.appendChild(proxytable);
				document.getElementById(`owopfuck-wsproxy-${Proxy}-delete`).onclick = () => {
					ProxyPasswords = ProxyPasswords.filter(e => e !== Proxy);
					delete proxylist[Proxy];
					setValue('wsproxy', JSON.stringify(ProxyPasswords));
					document.getElementById(`owopfuck-wsproxy-${Proxy}`).remove();
				};
				const WSCheck = new WebSocket(soc);
				WSCheck.onopen = () => {
					proxylist[Proxy] = {
						connections: 0
					};
					onlineproxy++;
					document.getElementById(`owopfuck-proxy-reconnect`).innerText = `Reconnect [ ${onlineproxy} / ${ProxyPasswords.length} ]`;
					document.getElementById(`owopfuck-wsproxy-${Proxy}-status`).innerText = "✔️";
					document.getElementById(`owopfuck-wsproxy-${Proxy}-connect`).onclick = () => {
						proxyJoin(Proxy);
						//document.getElementById(`owopfuck-proxy-reconnect-${Proxy}`).innerText = parseInt(document.getElementById(`owopfuck-proxy-reconnect-${Proxy}`).innerText) + 1;
					};
					document.getElementById(`owopfuck-wsproxy-${Proxy}-disconnect`).onclick = () => {
						for (let i in bots) {
							if(bots[i].clientOptions.proxy == Proxy) {
								bots[i].ws.close();
								bots = bots.filter(b => b.clientOptions.proxy == Proxy);
								document.getElementById(`owopfuck-wsproxy-${Proxy}-online`).innerText = '0';
							};
						};
					};
					WSCheck.send("WS-STATUS");
				};
				WSCheck.onmessage = msg => {
					document.getElementById(`owopfuck-wsproxy-${Proxy}-ip`).innerText = msg.data.split(",")[0];
					if(WSCheck.url.includes(".glitch.me")) {
						let connections = parseInt(msg.data.split(",")[1]) - 1
						document.getElementById(`owopfuck-wsproxy-${Proxy}-online`).innerText = connections;
						proxylist[Proxy].connections = connections;
					};
					WSCheck.close();
				};
				WSCheck.onerror = () => {
					delete proxylist[Proxy];
					if(onlineproxy > 0) onlineproxy -= 1;
					document.getElementById(`owopfuck-wsproxy-${Proxy}-online`).innerText = '❌';
					document.getElementById("owopfuck-proxy-reconnect").innerText = `Reconnect [ ${onlineproxy} / ${ProxyPasswords.length} ]`;
					document.getElementById(`owopfuck-wsproxy-${Proxy}-status`).innerText = "❌";
				};
			};
		};
		if(ProxyPasswords.length !== 0) updateServers();

		document.getElementById("owopfuck-nohelp").addEventListener("change", () => {
			const val = document.getElementById("owopfuck-nohelp").checked;

			var button = OWOP.elements.helpButton;

			if(!button) button = OWOP.elements.hubButton

			if(val) {
				button.hidden = true;
			} else {
				button.hidden = false;
			};
		});
		// totally not stolen from the masterbot client
		document.getElementById("owopfuck-mppchat").addEventListener("change", () => {
			const val = document.getElementById("owopfuck-mppchat").checked;

			if(val) {
				document.getElementById("chat").style.width = "inherit";
			} else {
				document.getElementById("chat").style.width = "";
			};
		});

		window.bots = []; // allow to access the bots variable from console or third-party scripts
		var bots = window.bots;

		// SHIT CODE (PLEASE DONT READ IT)

		let ranges = document.querySelectorAll(".owopfuck-range");
		let ranges2 = document.querySelectorAll(".owopfuck-range2");
		let checkboxes = document.querySelectorAll(".control, .control-checkbox");
		let dropdowns = document.querySelectorAll(".owopfuck-dropdown");
		let keybinds = document.querySelectorAll(".owopfuck-keyinput");

		for (let i in ranges) {
			if(Object.prototype.hasOwnProperty.call(ranges, i)) {
				let range = ranges[i];
				range.value = getValue(range.name);
				document.getElementById("owopfuck-" + range.name + "-label").innerText = getValue(range.name);
				range.addEventListener("input", () => {
					setValue(range.name, parseInt(range.value));
					document.getElementById("owopfuck-" + range.name + "-label").innerText = range.value.toString();
				});
			};
		};

		for (let i in ranges2) {
			if(Object.prototype.hasOwnProperty.call(ranges2, i)) {
				let range = ranges2[i];
				range.value = getValue(range.name);
				document.getElementById("owopfuck-" + range.name + "-input").value = getValue(range.name);
				range.addEventListener("input", () => {
					setValue(range.name, parseInt(range.value));
					document.getElementById("owopfuck-" + range.name + "-input").value = range.value;
				});
				document.getElementById("owopfuck-" + range.name + "-input").addEventListener("input", () => {
					setValue(range.name, parseInt(document.getElementById("owopfuck-" + range.name + "-input").value));
					range.value = document.getElementById("owopfuck-" + range.name + "-input").value;
				});
			};
		};

		for (let i in checkboxes) {
			if(Object.prototype.hasOwnProperty.call(checkboxes, i)) {
				let checkbox = checkboxes[i].querySelector("input");
				checkbox.checked = getValue(checkbox.name);
				checkbox.addEventListener("change", () => {
					setValue(checkbox.name, checkbox.checked);
				});

				var event = new Event('change', {
					bubbles: true,
					cancelable: true,
				});

				checkbox.dispatchEvent(event);
			};
		};

		for (let i in dropdowns) {
			if(Object.prototype.hasOwnProperty.call(dropdowns, i)) {
				let dropdown = dropdowns[i];
				// dropdown.value = getValue(dropdown.name);
				dropdown.addEventListener("input", () => {
					setValue(dropdown.name, dropdown.value);
				});
			};
		};

		for (let i in keybinds) {
			if(Object.prototype.hasOwnProperty.call(keybinds, i)) {
				let keybind = keybinds[i];
				keybind.value = getValue(keybind.name);
				keybind.addEventListener("keydown", (event) => {
					let key = event.key;
					if(event.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT) key = "R" + key;
					document.getElementById(keybind.id).value = key;
					setTimeout(() => setValue(keybind.name, key), 300);
				});
			};
		};

		// patterns
		load("https://raw.githubusercontent.com/scar17off/scar17off/main/helpers/patterns.js", () => {
			for (const key in constants) {
				if(constants.hasOwnProperty(key)) document.querySelector("*[name^='eraserpattern']").add(new Option(key, window.constants[key]));
				if(constants.hasOwnProperty(key)) document.querySelector("*[name^='areapattern']").add(new Option(key, window.constants[key]));
				if(constants.hasOwnProperty(key)) document.querySelector("*[name^='pastepattern']").add(new Option(key, window.constants[key]));
			};

			for (let i in dropdowns) {
				if(Object.prototype.hasOwnProperty.call(dropdowns, i)) {
					let dropdown = dropdowns[i];
					dropdown.value = getValue(dropdown.name);
				};
			};
		});

		const proxyJoin = server => {
			if(typeof server !== 'string') return;
			proxylist[server].connections++;

			let bot = new OJS.Client({
				index: bots.length + 1,
				proxy: server,
				world: OWOP.world.name || undefined,
				reconnect: getValue("botautoreconnect"),
				reconnectTime: 250,
				noLog: true,
				adminlogin: getValue("automalogin") ? localStorage.adminlogin : undefined,
				modlogin: getValue("automalogin") ? localStorage.modlogin : undefined,
				captchapass: localStorage.owopcaptcha,
				pass: localStorage.worldPasswords ? JSON.parse(localStorage.worldPasswords)[OWOP.world.name] : undefined,
				ws: new WebSocket(OWOP.options.serverAddress[0].url, null, {
					headers: {
						'Origin': (location.host !== "ourworldofpixels.com") ? location.origin : "https://ourworldofpixels.com",
						'Referer': (location.host !== "ourworldofpixels.com") ? document.referrer : "https://ourworldofpixels.com/"
					},
					origin: (location.host !== "ourworldofpixels.com") ? location.origin : "https://ourworldofpixels.com"
				})
			});
			bot.on("close", () => {
				bots.splice(bots.indexOf(bot), 1);
			});
			bot.on("connect", (id) => {
				if(OWOP.player.id.toString() === id) return;
				let playerOption = document.createElement("option");
				playerOption.innerText = id.toString();

				if(!Array.from(document.querySelector("*[name^=\"followid\"]").options).some(option => option.value === id))
					document.querySelector("*[name^=\"followid\"]").options.add(playerOption);
			});
			bot.on("disconnect", (player) => {
				for (let i in document.querySelector("*[name^=\"followid\"]").options) {
					if(document.querySelector("*[name^=\"followid\"]").options[i].innerText === player.id.toString())
						document.querySelector("*[name^=\"followid\"]").options.remove(i);
				};
			});
			bots.push(bot);
		};
		document.getElementById("owopfuck-proxy-input").addEventListener("keydown", (event) => {
			if(event.key == "Enter") {
				let proxyname = document.getElementById("owopfuck-proxy-input").value;

				let old = getValue("wsproxy");
				if(old.indexOf(proxyname) == -1) old.push(proxyname);
				setValue("wsproxy", old);
				updateServers();
				document.getElementById("owopfuck-proxy-input").value = '';
			};
		});
		document.getElementById("owopfuck-proxy-reconnect").addEventListener("click", () => {
			updateServers();
		});
		document.getElementById("owopfuck-connect").addEventListener("click", async () => {
			for (let i = 0; i < getValue("botcount"); i++) {
				let options = {
					index: bots.length + 1,
					world: OWOP.world.name || undefined,
					reconnect: getValue("botautoreconnect"),
					reconnectTime: 250,
					noLog: true,
					adminlogin: getValue("automalogin") ? localStorage.adminlogin : undefined,
					modlogin: getValue("automalogin") ? localStorage.modlogin : undefined,
					captchapass: localStorage.owopcaptcha,
					pass: localStorage.worldPasswords ? JSON.parse(localStorage.worldPasswords)[OWOP.world.name] : undefined,
					ws: new WebSocket(OWOP.options.serverAddress[0].url, null, {
						headers: {
							'Origin': (location.host !== "ourworldofpixels.com") ? location.origin : "https://ourworldofpixels.com",
							'Referer': (location.host !== "ourworldofpixels.com") ? document.referrer : "https://ourworldofpixels.com/"
						},
						origin: (location.host !== "ourworldofpixels.com") ? location.origin : "https://ourworldofpixels.com"
					})
				};

				var bot = new OJS.Client(options);
				bot.on("close", () => {
					bots.splice(bots.indexOf(bot), 1);
				});
				bot.on("connect", (id) => {
					if(OWOP.player.id.toString() === id) return;
					let playerOption = document.createElement("option");
					playerOption.innerText = id.toString();

					if(!Array.from(document.querySelector("*[name^=\"followid\"]").options).some(option => option.value === id))
						document.querySelector("*[name^=\"followid\"]").options.add(playerOption);
				});
				bot.on("disconnect", (player) => {
					for (let i in document.querySelector("*[name^=\"followid\"]").options) {
						if(document.querySelector("*[name^=\"followid\"]").options[i].innerText === player.id.toString())
							document.querySelector("*[name^=\"followid\"]").options.remove(i);
					};
				});
				bots.push(bot);
			};
		});
		document.getElementById("owopfuck-clear-jobs").addEventListener("click", () => {
			const buttons = document.querySelectorAll("[id$='-stopbtn']");
			buttons.forEach(button => {
				button.click();
			});
			owopfuck.infowindow.container.childNodes[0].childNodes[3].innerText = "Time remaining: no job";
		});
		document.getElementById("animbuilder-add").addEventListener("click", () => {
			let name = document.getElementById("animbuilder-name").value;

			if(name == '') return;

			let animations = getValue("animations");
			animations[name] = [document.getElementById("animbuilder-x-expression").value, document.getElementById("animbuilder-y-expression").value];
			setValue("animations", animations);
			document.getElementById("animbuilder-name").value = '';

			const optionElement_1 = document.createElement("option");
			optionElement_1.text = name;

			const optionElement_2 = document.createElement("option");
			optionElement_2.text = name;

			document.querySelector('select[name="animation"]').options.add(optionElement_1);
			document.getElementById("animbuilder-animations").options.add(optionElement_2);
		});
		document.getElementById("animbuilder-remove").addEventListener("click", () => {
			let name = document.getElementById("animbuilder-animations").value;

			let animations = getValue("animations");
			delete animations[name];
			setValue("animations", animations);

			for (let i in document.querySelector('select[name="animation"]').options) {
				if(document.querySelector('select[name="animation"]').options[i].innerText === name)
					document.querySelector('select[name="animation"]').options.remove(i);
			};

			for (let i in document.getElementById("animbuilder-animations").options) {
				if(document.getElementById("animbuilder-animations").options[i].innerText === name)
					document.getElementById("animbuilder-animations").options.remove(i);
			};
		});
		document.getElementById("owopfuck-disconnect").addEventListener("click", () => {
			bots.forEach(bot => {
				bot.highlight.element.remove();
				bot.world.destroy();
			});
			document.getElementById("owopfuck-bots").innerHTML = defaultBotnetHTML;
		});
		document.getElementById("owopfuck-chat-send").addEventListener("click", () => {
			const value = document.getElementById("owopfuck-chat-msg").value;

			for (let i in bots) bots[i].chat.send(value);
		});
		OWOP.on(events.net.disconnected, () => {
			if(getValue("autoreconnect")) {
				setTimeout(function() {
					document.getElementById("reconnect-btn").click();
				}, 100);
			};
		});
		let PI2 = 3 * Math.PI,
			FOLLOWADD = PI2 / 45,
			f = 0,
			x, y,
			folint,
			x1, y1,
			f1 = 0,
			pos = {};
		let spiral = {
			step: 0,
			PI2: 2 * Math.PI,
			speed: () => ((2 * Math.PI) / 30 / bots.length),
			radius: (i) => i * 3
		};
		document.getElementById("owopfuck-follow").addEventListener("change", () => {
			if(!getValue("follow")) {
				clearInterval(folint);
				return;
			};

			folint = setInterval(() => {
				if(typeof pos !== "object") return;
				if(getFree() === -1) return;
				if(getValue("followid") == "Disabled") {
					pos = {
						x: OWOP.mouse.tileX,
						y: OWOP.mouse.tileY
					};
				} else {
					let playerID = document.querySelector("*[name^=\"followid\"]").selectedOptions[0].innerText;
					if(bots[0].players[playerID]) pos = {
						x: bots[0]?.players[playerID].x,
						y: bots[0]?.players[playerID].y
					}
					else pos = {
						x: OWOP.mouse.tileX,
						y: OWOP.mouse.tileY
					};
				};
				let length = bots.length;
				let radius = bots.length;
				let i = bots.length;
				let animation = getValue("animation");
				let animations = getValue("animations");

				while (i--) {
					if(getFree() === -1) return;
					// animation builder
					if(animations[animation]) {
						let xfunc = createExpressionFunction(animations[animation][0]);
						let yfunc = createExpressionFunction(animations[animation][1]);

						x = xfunc(pos, length, i, f);
						y = yfunc(pos, length, i, f);
					};
					if(animation == "Circle") {
						x = pos.x + (Math.cos(2 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Circle 2") {
						x = pos.x + (Math.cos(2 / Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(2 / Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Expanding circle") {
						x = pos.x + Math.cos(2 * Math.PI * 2 / length * i + f) * length * (1 + Math.sin(f));
						y = pos.y + Math.sin(2 * Math.PI * 2 / length * i + f) * length * (1 + Math.sin(f));
					};
					if(animation == "Spinning circle") {
						x = pos.x + Math.cos(2 * Math.PI * 2 / length * i + f) * length * (Math.sin(f));
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Wave 2") {
						x = pos.x + (Math.cos(2 * Math.PI * 0 / length * i + f + 4) * i);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f - 2) * length);
					};
					if(animation == "Wave 3") {
						x = pos.x + (Math.cos(2 * Math.PI * 2 / length * (i + f)) - i);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Wave 4") {
						x = pos.x + (Math.cos(1 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(3 * Math.PI * i - f) * i);
					};
					if(animation == "Wave 5") {
						x = pos.x + (Math.cos(.5 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(1 * Math.PI * i - f) * i);
					};
					if(animation == "Wave 6") {
						x = pos.x + (Math.cos(0.1 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(1 * Math.PI * i - f) * i);
					};
					if(animation == "Wave 7") {
						x = pos.x + Math.cos(f + 2 * Math.PI * i / 4) * length;
						y = pos.y + Math.cos(f) * Math.sin(2 * Math.PI * i / 5) * length;
					};
					if(animation == "Spinning line") {
						x = pos.x + (Math.cos(2 * Math.PI * 2 * i + f) * i);
						y = pos.y + (Math.sin(2 * Math.PI * 2 * i - f) * i);
					};
					if(animation == "Paralelpipedum") {
						x = pos.x + (Math.cos(2 * Math.PI * 3 / length * i + f) * length);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f - 2) * length);
					};
					if(animation == "Rhombus") {
						x = pos.x + Math.sin(f) * Math.pow(Math.sin(f), 2) * length;
						y = pos.y + Math.cos(f) * Math.pow(Math.cos(f), 2) * length;
					};
					if(animation == "Vertical Sector Circle") {
						x = pos.x + Math.sin(f) * Math.cos(2 * Math.PI * i / 4) * length;
						y = pos.y + Math.cos(f) * Math.pow(Math.abs(Math.cos(f)), 0) * length;
					};
					if(animation == "Horizontal Sector Circle") {
						x = pos.x + Math.cos(f + 2 * Math.PI * i / 4) * length;
						y = pos.y + Math.cos(f) * Math.sin(2 * Math.PI * i / 4) * length;
					};
					if(animation == "Cross") {
						x = pos.x + Math.sin(f) * Math.cos(2 * Math.PI * i / 4) * length;
						y = pos.y + Math.cos(f) * Math.sin(2 * Math.PI * i / 4) * length;
					};
					if(animation == "Rect Random") {
						x = pos.x + Math.sin(f) * Math.random() * length;
						y = pos.y + Math.cos(f) * Math.random() * length;
					};
					if(animation == "Cobra") {
						x = pos.x + (Math.cos(1 * Math.PI * 1 / length * i + f) * i);
						y = pos.y + (Math.sin(2 * Math.PI * 4 / length * i + f) * f * i / 8);
					};
					if(animation == "Piramid") {
						x = pos.x + (Math.sin(5 + Math.PI * Math.PI / i * length + f + Math.PI / 2) * i);
						y = pos.y + (Math.sin(5 + Math.PI * Math.PI / i * i + length) * i);
					};
					if(animation == "Xray") {
						x = pos.x + (Math.sin(1 + Math.PI * i + f) * length);
						y = pos.y + (Math.sin(2 * Math.PI * 3 / length * i + f) * length);
					};
					if(animation == "Disk") {
						x = pos.x + (Math.cos(2 * Math.PI * 2 / length * i + f * 2) * length);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Atom") {
						if(i >= bots.length / 2) {
							x = pos.x + (Math.cos(2 * Math.PI * 2 / bots.length * i + f) * bots.length / 2);
							y = pos.y + (Math.sin(2 * Math.PI * 2 / bots.length * i + f + 2) * bots.length / 2);
						} else {
							x = pos.x + (Math.cos(2 * Math.PI * 2 / bots.length * i + f + 2) * bots.length / 2);
							y = pos.y + (Math.sin(2 * Math.PI * 2 / bots.length * i + f) * bots.length / 2);
						};
					};
					if(animation == "Random") {
						x = pos.x - (length / 2) + Math.floor(Math.random() * length);
						y = pos.y - (length / 2) + Math.floor(Math.random() * length);
					};
					if(animation == "Random 2") {
						x = pos.x + (Math.cos(0.1 * Math.PI * Math.random() ^ 50 / length * i + f) * length);
						y = pos.y + (Math.sin(0.1 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Random TB") {
						x = pos.x + (Math.cos(2 - length * i - f) * length);
						y = pos.y + (Math.sin(2 / length * i + f) * length);
					};
					if(animation == "Wave") {
						x = pos.x + (Math.cos(2 * Math.PI / length * i + f) * length);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Right - Left") {
						x = pos.x + (Math.cos(2 * Math.PI * 2 ** length * i + f) * length);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "Bot Line") {
						x = pos.x + i;
						y = pos.y;
					};
					if(animation === "Bot Line 2") {
						x = pos.x + (Math.cos(2 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(5 * Math.PI * 0.1 ^ 5 / length * i + f) * length);
					};
					if(animation === "Snake") {
						x = pos.x + (Math.ceil(2 * Math.PI * 2 / length * i + f) * length) / 5; // 5 is snake length 
						y = pos.y + (Math.cos(1 * Math.PI * 2 / length * i + f) * length / 2) / 2;
					};
					if(animation === "Snake 2") {
						x = pos.x + (Math.floor(2 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.cos(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation === "Random lines") {
						x = pos.x + (Math.cos(5 * Math.PI * 2 / length * i + f ^ 2 * 1) * i);
						y = pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation === "Multiple Top - Bottom") {
						x = pos.x + (Math.cos(5 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.sin(5 / 45 * Math.PI * 2 / length * i + f) * length);
					};
					if(animation == "X") {
						let r = 2 * Math.PI * 2 / length * i + f;
						if(i % 2 == 0) {
							let s = Math.sin(r);
							y = pos.y + (Math.cos(r) * 3 + 15 * s);
							x = pos.x + (s * 15 + 3 * s);
						} else {
							let c = Math.cos(r)
							x = pos.x + (c * 8 + 9 * c);
							y = pos.y + (Math.sin(r) * 3 + -15 * c);
						};
					};
					if(animation == "Spiral") {
						let speed = spiral.speed();
						let radius = spiral.radius(i);

						x = Math.cos(Math.PI / length * i + spiral.step) * radius;
						y = Math.sin(Math.PI / length * i + spiral.step) * radius;
						x += pos.x;
						y += pos.y;

						spiral.step += speed;
						spiral.step %= spiral.PI2;
					};
					if(animation == "Top - Bottom") {
						x = pos.x + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);
						y = pos.y + (Math.cos(2 * Math.PI * 2 ** length * i + f) * length);
					};
					if(animation == "Eight") {
						x = pos.x + (Math.sin(10 * Math.PI / length * i * f) * length / 1.768);
						y = pos.y + (Math.cos(5 * Math.PI / length * i * f) * length / 1.768);
					};
					if(animation == "3D") {
						if(i >= length / 2) {
							y = pos.y + Math.cos(2 * Math.PI / bots * i + f) * 40;
							x = pos.x + Math.sin(2 * Math.PI * 2 / bots * i + f) * 40;
						} else {
							x = pos.x + (Math.cos(2 * Math.PI * 4 / 4.09 * i + f * 2.5) * 9);
							y = pos.y + (Math.sin(2 * Math.PI * 2 / 4.09 * i + f) * 9);
						};
					};
					if(animation == "Infinity") {
						a = spiral.PI2 / bots[i].length * i + f;
						x = pos.x + infinityX(f / 20 * i + f) * 40;
						y = pos.y + infinityY(f / 20 * i + f) * 40;
					};
					if(animation == "Infinity 2") {
						a = spiral.PI2 / bots[i].length * i + f;
						x = pos.x + infinityX(f / 20 * i + f) * 40;
						y = pos.y + infinityY(f / 20 * i + f) * 40;
					};
					if(animation == "Square") {
						a = spiral.PI2 / bots[i].length * i + f;
						x = pos.x + squareX(f / 40 * i + f) * length / 1.285;
						y = pos.y + squareY(f / 40 * i + f) * length / 1.285;
					};
					if(animation == "Triagle") {
						let t = Math.PI * 2 / length * i + f;
						x = pos.x + (2 * Math.sin(t) + Math.sin(2 * (t))) * length / 2;
						y = pos.y + (2 * Math.cos(t) - Math.cos(2 * (t))) * length / 2;
					};
					if(animation == "Storm") {
						let t = Math.PI * 2 / length * i - f;
						let t1 = Math.PI * 3 / length * i + f;
						x1 = pos.x + (Math.cos(2 * t) * length);
						y1 = pos.y + (Math.sin(2 * t) * length);
						x = x1 + (Math.cos(3 * t) * length);
						y = y1 + (Math.sin(3 * t) * length);
					};
					if(animation == "Copy Disk") {
						let t = Math.PI * 2 / length * i + f;
						let t1 = Math.PI / length * i + f;
						x = pos.x + (2 * Math.sin(t) + Math.sin(2 * t1)) * length / 2;
						y = pos.y + (2 * Math.cos(t) - Math.cos(2 * t1)) * length / 2;
					};
					if(animation == "Disk X") {
						let t = Math.PI * 2 / length * i + f;
						let t1 = Math.PI * 2 / length * i - f;

						if(i % 2 == 0) {
							x = pos.x + (Math.cos(t) * (length * 1.5));
							y = pos.y + (Math.sin(t1) * (length * 1.5));
						} else {
							x = pos.x + (Math.cos(t1) * (length));
							y = pos.y + (Math.sin(t) * (length));
						};
					};
					if(animation == "Asshole") {
						let t = Math.PI * 2 / length * i - f;
						let t1 = Math.PI * 2 / length * i + (f * 2);
						x1 = pos.x + (Math.cos(t1) * length);
						y1 = pos.y + (Math.sin(t1) * length);
						x = x1 + (Math.cos(t) * length);
						y = y1 + (Math.sin(t) * length);
					};
					if(animation == "Smooth Disk") {
						let t = Math.PI * 2 / length * i - f;
						let t1 = Math.PI * 2 / length * i + f;
						x1 = pos.x + (Math.cos(t1) * length);
						y1 = pos.y + (Math.sin(t) * length);
						x = x1 + (Math.cos(t) * length);
						y = y1 + (Math.sin(t) * length);
					};
					if(animation == "50% Disk") {
						let t = Math.PI * 2 / length * i - f;
						let t1 = Math.PI * 2 / length * i + f;
						x1 = pos.x + (Math.cos(t1) * length);
						y1 = pos.y + (Math.sin(t) * length);
						x = x1 + (Math.cos(t1) * length);
						y = y1 + (Math.sin(t) * length);
					};
					if(animation == "Lasso") {
						let t = Math.PI * 2 / length * i - f;
						let t1 = Math.PI * 2 / length * i + f;
						let t2 = Math.PI * 3 / length * i * (f / length);
						x1 = pos.x + (Math.cos(t1) * length);
						y1 = pos.y + (Math.sin(t) * length);
						x = x1 + (Math.cos(t) * length);
						y = y1 + (Math.sin(t2) * length);
					};
					if(animation == "Smooth Disk 2") {
						let t = Math.PI * 2 / length * i - f;
						let t1 = Math.PI * 2 / length * i + f;
						let t2 = Math.PI * 3 / length * 10 * (f / length);
						x1 = pos.x + (Math.cos(t2) * length);
						y1 = pos.y + (Math.sin(t1) * length);
						x = x1 + (Math.cos(t) * length);
						y = y1 + (Math.sin(t) * length);
					};
					if(animation == "卐") {
						let t = Math.PI * 2 / length * i + f;
						if(i == 1) {
							x = pos.x + 5;
							y = pos.y + 1;
						} else if(i == 2) {
							x = pos.x + 4;
							y = pos.y + 1;
						} else if(i == 3) {
							x = pos.x + 3;
							y = pos.y + 1;
						} else if(i == 4) {
							x = pos.x + 3;
							y = pos.y + 2;
						} else if(i == 5) {
							x = pos.x + 3;
							y = pos.y + 3;
						} else if(i == 6) {
							x = pos.x + 3;
							y = pos.y + 4;
						} else if(i == 7) {
							x = pos.x + 3;
							y = pos.y + 5;
						} else if(i == 8) {
							x = pos.x + 1;
							y = pos.y + 1;
						} else if(i == 9) {
							x = pos.x + 1;
							y = pos.y + 2;
						} else if(i == 10) {
							x = pos.x + 1;
							y = pos.y + 3;
						} else if(i == 11) {
							x = pos.x + 2;
							y = pos.y + 3;
						} else if(i == 12) {
							x = pos.x + 4;
							y = pos.y + 3;
						} else if(i == 13) {
							x = pos.x + 5;
							y = pos.y + 3;
						} else if(i == 14) {
							x = pos.x + 5;
							y = pos.y + 4;
						} else if(i == 15) {
							x = pos.x + 5;
							y = pos.y + 5;
						} else if(i == 16) {
							x = pos.x + 1;
							y = pos.y + 5;
						} else if(i == 17) {
							x = pos.x + 2;
							y = pos.y + 5;
						} else if(i == 18) {
							x = pos.x + 3;
							y = pos.y + 5;
						} else {
							let t = Math.PI * 2 / (length - 18) * (i - 18) + f;
							x = pos.x + 3 + (Math.cos(t) * ((length - 18) * 1));
							y = pos.y + 3 + (Math.sin(t) * ((length - 18) * 1));
						};
					};
					bots[i].world.move(x, y);
					if(getValue("paintfollow")) bots[i].world.setPixel(x, y, OWOP.player.selectedColor);
					let tools = {
						id: {
							'cursor': 0,
							'move': 1,
							'pipette': 2,
							'eraser': 3,
							'zoom': 4,
							'fill': 5,
							'paste': 6,
							'export': 7,
							'line': 8,
							'protect': 9,
							'copy': 10
						},
						0: 'cursor',
						1: 'move',
						2: 'pipette',
						3: 'eraser',
						4: 'zoom',
						5: 'fill',
						6: 'paste',
						7: 'export',
						8: 'line',
						9: 'protect',
						10: 'copy'
					};
					let tool;
					if(getValue("animationtool") == 'Selected') tool = tools.id[OWOP.player.tool.id];
					if(getValue("animationtool") == 'Random') {
						let rank = bots[i].player.rank;
						if(rank == 1) {
							let toolList = [0, 1, 2, 4, 5, 7, 8];
							tool = getRandomItemFromArray(toolList);
						} else if(rank > 1) {
							let toolList = [0, 1, 2, 4, 5, 7, 8, 3, 6, 9, 10];
							tool = getRandomItemFromArray(toolList);
						};
					} else if(getValue("animationtool") !== 'Selected' && getValue("animationtool") !== 'Random') tool = tools.id[getValue("animationtool").toLowerCase()];
					bots[i].world.setTool(tool);
				};
				if(animation == "Infinity") {
					FOLLOWADD = PI2 / 100;
					f = (f + FOLLOWADD);
				} else if(animation == "Infinity 2") {
					FOLLOWADD = PI2 / 95;
					f = (f + FOLLOWADD);
				} else if(animation == "Eight") {
					FOLLOWADD = PI2 / 500;
					f = (f + FOLLOWADD) % PI2;
				} else {
					f = (f + FOLLOWADD - .5) % PI2;
				};
			}, 90);
		});
		{
			let animationOptions = getValue("animations");

			for (let i in animationOptions) {
				const optionElement_1 = document.createElement("option");
				optionElement_1.text = i;

				const optionElement_2 = document.createElement("option");
				optionElement_2.text = i;

				document.querySelector('select[name="animation"]').options.add(optionElement_1);
				document.getElementById("animbuilder-animations").options.add(optionElement_2);
			};

			const cvs_2 = document.getElementById("animbuilder-canvas");
			const ctx_2 = cvs_2.getContext("2d");
			const xexpr = document.getElementById("animbuilder-x-expression");
			const yexpr = document.getElementById("animbuilder-y-expression");
			const movement_toggle = document.getElementById("owopfuck-animbuilder-movement");
			let animationInterval = null;
			const bot_poses = [];
			const defaultExpression = `pos.x + (Math.cos(2 * Math.PI * 2 / length * i + f) * length);
pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);`;
			let mathexpressions = defaultExpression;
			xexpr.value = defaultExpression.split("\n")[0];
			yexpr.value = defaultExpression.split("\n")[1];

			function updateExpression() {
				mathexpressions = xexpr.value + "\n" + yexpr.value;
				xfunc = createExpressionFunction(mathexpressions.split("\n")[0]);
				yfunc = createExpressionFunction(mathexpressions.split("\n")[1]);
				clearCanvas();
			};

			xexpr.addEventListener("input", updateExpression);
			yexpr.addEventListener("input", updateExpression);

			cvs_2.addEventListener('mousedown', mouse => {
				if(mouse.button === 1) {
					const imageDataUrl = cvs.toDataURL();
					const image = new Image();
					image.src = imageDataUrl;
					image.onload = function() {
						const canvasElement = document.createElement('canvas');
						canvasElement.width = image.width;
						canvasElement.height = image.height;
						const context = canvasElement.getContext('2d');
						context.drawImage(image, 0, 0);
						canvasElement.toBlob(blob => {
							navigator.clipboard.write([
								new ClipboardItem({
									[blob.type]: blob
								})
							]);
						});
					};
				};
			});

			document.getElementById("owopfuck-animbuildintms").addEventListener("input", () => {
				clearInterval(animationInterval);
				clearCanvas();
				createInterval();
			});

			document.getElementById("animbuilder-animations").addEventListener("change", () => {
				const name = document.getElementById("animbuilder-animations").value;

				let animations = getValue("animations");

				const animation = animations[name];

				document.getElementById("animbuilder-x-expression").value = animation[0];
				document.getElementById("animbuilder-y-expression").value = animation[1];

				// redraw after loading
				updateExpression();
			});

			document.querySelectorAll('input[name^="animbuild"][type="range"]').forEach(input => {
				input.addEventListener("input", () => {
					input.parentNode.children[0].innerText = input.parentNode.children[0].innerText.replace(/\d+/g, input.value);
					clearCanvas();
				});
			});

			movement_toggle.addEventListener("change", () => {
				clearCanvas();
			});

			document.getElementById("owopfuck-animationbuilder-bots").addEventListener("input", () => {
				xfunc = createExpressionFunction(mathexpressions.split("\n")[0]);
				yfunc = createExpressionFunction(mathexpressions.split("\n")[1]);
			});

			document.getElementById("animbuilder-redraw").addEventListener("click", () => {
				clearCanvas();
			});

			document.getElementById("animbuilder-reset").addEventListener("click", () => {
				xexpr.value = "pos.x + (Math.cos(2 * Math.PI * 2 / length * i + f) * length);";
				yexpr.value = "pos.y + (Math.sin(2 * Math.PI * 2 / length * i + f) * length);";
				mathexpressions = xexpr.value + "\n" + yexpr.value;
				xfunc = createExpressionFunction(mathexpressions.split("\n")[0]);
				yfunc = createExpressionFunction(mathexpressions.split("\n")[1]);
				clearCanvas();
			});

			async function copyContent(text) {
				try {
					await navigator.clipboard.writeText(text);
				} catch (err) {
					console.error('Failed to copy: ', err);
				};
			};

			document.getElementById("animbuilder-copy").addEventListener("click", () => {
				copyContent(mathexpressions);
			});

			function clearCanvas() {
				ctx_2.clearRect(0, 0, cvs_2.width, cvs_2.height);
			};

			let PI2_2 = 3 * Math.PI,
				FOLLOWADD_2 = PI2_2 / 45,
				f_2 = 0;
			window.animbuilderCenter = {
				x: cvs_2.width / 2,
				y: cvs_2.height / 2
			};

			let xfunc = createExpressionFunction(mathexpressions.split("\n")[0]);
			let yfunc = createExpressionFunction(mathexpressions.split("\n")[1]);

			function createInterval() {
				animationInterval = setInterval(() => {
					if(movement_toggle.checked) clearCanvas();
					let bots = getValue("animbuildbots") * 8 - 1;
					let length = bots;

					for (let i = bots; i >= 0; i--) {
						const x = xfunc(animbuilderCenter, length, i, f_2);
						const y = yfunc(animbuilderCenter, length, i, f_2);

						if(movement_toggle.checked) bot_poses[i] = [x, y];

						ctx_2.fillStyle = "#5666f2";
						let width = getValue("animbuildlwidth");
						ctx_2.fillRect(x, y, width, width);
					};
					f_2 = (f_2 + FOLLOWADD_2 - 0.5) % PI2_2;
				}, getValue("animbuildintms"));
			};
			createInterval();
		};

		OWOP.world.protection = {
			intervals: {},
			pixels: {},
			chunks: []
		};
		let protection_queue = [];
		let pixbusu = false;

		async function placePixel(x, y, color, item, abc) {
			await pixbusu == true;
			if(abc === -1 || typeof abc == "undefined") {
				abc = getFree();
			};
			if(abc == -1) {
				pixbusu = false;
				return;
			};
			let setpixel = bots[abc].world.setPixel;
			if(item) setpixel = bots[abc].world[item];
			if(!setpixel) return;

			if(!eq(OWOP.world.getPixel(x, y), color)) {
				bots[abc].net.bucket.canSpend(0);
				if(bots[abc].net.bucket.allowance >= getValue("freebucket")) {
					setpixel(x, y, color);
					pixbusu = false;
				} else {
					pixbusu = false;
					await placePixel(x, y, color, item, abc);
					return;
				};
			};
			pixbusu = false;
		};
		// area table summizer
		function updateIndicator() {
			const elements = document.querySelectorAll('td[id^="owopfuck-fill-"][id$="-time"]');
			const regex = /\d+/;

			let sum = 0;

			Array.from(elements).forEach(element => {
				if(regex.test(element.id)) {
					const innerText = element.innerText;
					const number = parseFloat(innerText.replace('s', ''));
					sum += number;
				}
			});

			sum = sum.toFixed(2) + "s";
			if(sum == "0.00s") sum = "no job";
			owopfuck.infowindow.container.childNodes[0].childNodes[3].innerText = "Time remaining: " + sum;
		};
		function updateAreaPoses() {
			const elements = document.querySelectorAll('td[id^="owopfuck-fill-"][id$="-pos"]');

			owopfuck.area_poses = [];

			Array.from(elements).forEach(element => {
				element = element.children[0].title.split(";");
				let start = element[0].split(",");
				let end = element[1].split(",");
				start = start.map(Number);
				end = end.map(Number);
				let complete = [start, end];
				if(owopfuck.area_poses.indexOf(complete) == -1) owopfuck.area_poses.push(complete);
			});
		};
		// filling functions
		let jobs = 0;
		function updateJobsIndicator() {
			if(jobs > 0)
				owopfuck.infowindow.container.childNodes[0].childNodes[6].innerText = "Jobs: " + jobs;
			else if(jobs === 0)
				owopfuck.infowindow.container.childNodes[0].childNodes[6].innerText = "Jobs: no jobs";
		};
		async function fill(x1, y1, x2, y2, color, item, tool) {
			x2--; y2--;
			jobs++;
			updateJobsIndicator();
			if(bots.length === 0) return;
			for ([x, y] of patterns[document.querySelector(`select[name^='${tool}']`).selectedIndex](x1, y1, x2, y2)) {
				const abc = getFree();

				const pixel = OWOP.world.getPixel(x, y);
				if(!eq(pixel, color)) {
					await placePixel(x, y, color, item, abc);
					bots[abc].net.bucket.canSpend(0);

					if(bots[abc].net.bucket.allowance < getValue("freebucket"))
						if(getValue("instaplace"))
							await bots[abc].net.bucket.waitUntilRestore();
						else
							await sleep(Math.ceil(bots[abc].net.bucket.time * 1000 / bots[abc].net.bucket.rate) * jobs);
					else {
						if(!getValue("instaplace")) await sleep(0);
					};
				};
			};
			jobs--;
			updateJobsIndicator();
		};
		async function unfill(x1, y1, x2, y2, color, uncolor, item, tool) {
			x2--; y2--;
			jobs++;
			updateJobsIndicator();
			for ([x, y] of patterns[document.querySelector(`select[name^='${tool}']`).selectedIndex](x1, y1, x2, y2)) {
				const abc = getFree();

				const pixel = OWOP.world.getPixel(x, y);
				if(eq(pixel, uncolor) && !eq(pixel, color)) {
					bots[abc].net.bucket.canSpend(0);

					await placePixel(x, y, color, item, abc);

					if(bots[abc].net.bucket.allowance < getValue("freebucket"))
						if(getValue("instaplace"))
							await bots[abc].net.bucket.waitUntilRestore();
						else
							await sleep(Math.ceil(bots[abc].net.bucket.time * 1000 / bots[abc].net.bucket.rate) * jobs);
					else {
						if(!getValue("instaplace")) await sleep(0);
					};
				};
			};
			jobs--;
			updateJobsIndicator();
		};
		async function paste(x1, y1, imageData, assetContext) {
			jobs++;
			updateJobsIndicator();
			for ([x, y] of patterns[document.querySelector("select[name^='pastepattern']").selectedIndex](x1, y1, x1 + imageData.width - 1, y1 + imageData.height - 1)) {
				// TODO: Make color blending.
				const pixel = await OWOP.world.getPixel(x, y);
				const color = pixColor(assetContext, x - x1, y - y1);
				const i = getIbyXY(x - x1, y - y1, imageData.width);
				const transparency = Math.floor(Math.floor(imageData.data[i + 3] * 2) / 255); // 2 because the original value is devided by 2 by some reason
				const blendedColor = lerp(pixel, color, transparency);

				const abc = getFree();

				if(!eq(pixel, blendedColor)) {
					bots[abc].net.bucket.canSpend(0);

					await placePixel(x, y, blendedColor, null, abc);

					if(bots[abc].net.bucket.allowance < getValue("freebucket"))
						if(getValue("instaplace"))
							await bots[abc].net.bucket.waitUntilRestore();
						else
							await sleep(Math.ceil(bots[abc].net.bucket.time * 1000 / bots[abc].net.bucket.rate) * jobs);
					else {
						if(!getValue("instaplace")) await sleep(0);
					};
				};
			};
			jobs--;
			updateJobsIndicator();
		};
		// tools
		// let LastChunkTime = Date.now();
		OWOP.tools.addToolObject(new OWOP.tools.class('Bot Erase', OWOP.cursors.erase, OWOP.fx.player.RECT_SELECT_ALIGNED(16), OWOP.RANK.USER, function (tool) {
			tool.setFxRenderer((fx, ctx) => {
				var x = (fx.extra.player.x);
				var y = (fx.extra.player.y);
				var diameter = parseInt(getValue("eraserdiameter"));
				var pxc = tool.diam * 16;
				var fxx = (tool.diam * Math.floor(x / pxc) - OWOP.camera.x) * OWOP.camera.zoom;
				var fxy = (tool.diam * Math.floor(y / pxc) - OWOP.camera.y) * OWOP.camera.zoom;
				ctx.globalAlpha = 0.5;
				ctx.fillStyle = fx.extra.player.htmlRgb;
				ctx.fillRect(fxx, fxy, OWOP.camera.zoom * diameter, OWOP.camera.zoom * diameter);
				return 1;
			});

			tool.setEvent('mousedown mousemove', async function (mouse) {
				if(mouse.buttons === 0 || mouse.buttons === 4) return;
				if(bots.length === 0) return;
				// if(Date.now() - LastChunkTime < 100) return;
				// LastChunkTime = Date.now();
				let pix = parseInt(getValue("eraserdiameter"));
				tool.diam = pix;
				let color = mouse.buttons === 1 ? OWOP.player.selectedColor : [255, 255, 255];
				let chunkx = x1 = Math.floor(OWOP.mouse.tileX / pix) * pix;
				let chunky = y1 = Math.floor(OWOP.mouse.tileY / pix) * pix;

				const str = JSON.stringify([chunkx, chunky]);

				if(owopfuck.erase_poses.indexOf(str) === -1) {
					owopfuck.erase_poses.push(str);
					await fill(chunkx, chunky, chunkx + pix, chunky + pix, color, null, "eraserpattern");
					owopfuck.erase_poses = owopfuck.erase_poses.filter(pos => pos !== str);
				};
			});
		}));
		OWOP.on(events.tick, () => {
			if(OWOP.player.tool.name === "Bot Paste") {
				owopfuck.assetswindow.container.parentNode.hidden = false;
			} else {
				owopfuck.assetswindow.container.parentNode.hidden = true;
			};

			if(OWOP.player.tool.name.toLowerCase().includes("area")) {
				owopfuck.jobswindow.container.parentNode.hidden = false;
			} else {
				owopfuck.jobswindow.container.parentNode.hidden = true;
			};
		});
		let assetContext;
		OWOP.tools.addToolObject(new OWOP.tools.class("Bot Paste", OWOP.cursors.paste, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
			let cvs = document.createElement("canvas");

			tool.setFxRenderer(function (fx, ctx) {
				let fxx = Math.floor(OWOP.mouse.tileX << 4 / 16) - OWOP.camera.x;
				let fxy = Math.floor(OWOP.mouse.tileY << 4 / 16) - OWOP.camera.y;

				if(fx.extra.isLocalPlayer && cvs.width && cvs.height) {
					ctx.strokeStyle = "#000000";
					ctx.scale(OWOP.camera.zoom, OWOP.camera.zoom);
					ctx.drawImage(cvs, fxx, fxy);
					ctx.scale(1 / OWOP.camera.zoom, 1 / OWOP.camera.zoom);
					ctx.globalAlpha = 0.5;
					ctx.strokeRect(fxx * OWOP.camera.zoom, fxy * OWOP.camera.zoom, cvs.width * OWOP.camera.zoom, cvs.height * OWOP.camera.zoom);
					return 0;
				};
			});
			tool.setEvent("mousedown mousemove", async function (mouse) {
				if(mouse.buttons === 1) {
					if(!selectedAsset) OWOP.chat.local("No asset selected!");
					if(typeof selectedAsset === "string") {
						// convert
						let ctx = cvs.getContext('2d');
						assetContext = ctx;
						let img = new Image();
						img.onload = () => {
							cvs.width = img.width;
							cvs.height = img.height;
							ctx.globalAlpha = 0.5;
							ctx.drawImage(img, 0, 0);
							// asset
							selectedAsset = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
						};
						img.src = selectedAsset;
						return OWOP.chat.local("Image is ready.");
					};
					let Pixelization = getValue("pixelization");
					let x = !Pixelization ? OWOP.mouse.tileX : Math.floor(OWOP.mouse.tileX / 16) * 16,
						y = !Pixelization ? OWOP.mouse.tileY : Math.floor(OWOP.mouse.tileY / 16) * 16;

					paste(x, y, selectedAsset);
				};
			});
		}));
		OWOP.tools.addToolObject(new OWOP.tools.class('Bot Cursor', OWOP.cursors.cursor, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, function (tool) {
			var lastX, lastY;

			tool.setEvent('mousedown mousemove', async function (mouse) {
				if(getFree() === -1 || mouse.buttons === 4 || mouse.buttons === 0) return;
				if(!lastX || !lastY) {
					lastX = OWOP.mouse.tileX;
					lastY = OWOP.mouse.tileY;
				};

				(0, OWOP.util.line)(lastX, lastY, OWOP.mouse.tileX, OWOP.mouse.tileY, 1, async function (x, y) {
					var color = mouse.buttons === 2 ? [255, 255, 255] : OWOP.player.selectedColor;
					await placePixel(x, y, color);
				});

				lastX = OWOP.mouse.tileX;
				lastY = OWOP.mouse.tileY;
			});
			tool.setEvent('mouseup', function (mouse) {
				lastX = null;
				lastY = null;
			});
		}));
		let textContext;
		OWOP.tools.addToolObject(new OWOP.tools.class("Bot Text", OWOP.cursors.write, OWOP.fx.player.RECT_SELECT_ALIGNED(1), OWOP.RANK.USER, tool => {
			let cvs = document.createElement("canvas");
			let imageData;

			tool.setEvent("mousedown", async function (mouse) {
				if(mouse.buttons === 1) {
					var text = prompt("Text to draw:");
					var font = prompt("Text font:\n<fontSize> <fontFamily>\n30px Arial");
					imageData = getTextImageData(text, font);

					// convert
					let ctx = cvs.getContext("2d");
					textContext = ctx;

					let x = OWOP.mouse.tileX,
						y = OWOP.mouse.tileY;

					for (let i = 0; i < imageData.data.length; i += 4) {
						if(
							imageData.data[i + 3] == 255
						) {
							imageData.data[i] = 0;
							imageData.data[i + 1] = 0;
							imageData.data[i + 2] = 0;
							imageData.data[i + 3] = 255;
						};
					};

					paste(x, y, imageData, textContext);
				};
			});
		}));
		let brDiameter = 2;
		OWOP.tools.addToolObject(new OWOP.tools.class('Bot Brush', OWOP.cursors.brush, OWOP.fx.player.RECT_SELECT_ALIGNED(brDiameter), false, function (tool) {
			tool.brDiameter = 2; //Declaring variable for brush diameter.
			var lastX, lastY;

			tool.setEvent('mousedown mousemove', async function (mouse) {
				const usedButtons = 3; /* Left and right mouse buttons are always used... */
				const color = mouse.buttons === 2 ? [255, 255, 255] : OWOP.player.selectedColor; /* White color if right clicking */

				if(mouse.buttons === 2 || mouse.buttons === 1) {
					if(!lastX || !lastY) {
						lastX = OWOP.mouse.tileX;
						lastY = OWOP.mouse.tileY;
					};

					(0, OWOP.util.line)(lastX, lastY, OWOP.mouse.tileX, OWOP.mouse.tileY, 1, async function (x, y) {
						const R = Math.floor(tool.brDiameter / 2);
						if(getFree() === -1) return;
						for (var ix = 0; ix < tool.brDiameter; ix++) {
							for (var iy = 0; iy < tool.brDiameter; iy++) {
								if(!eq(OWOP.world.getPixel(x + ix - R, y + iy - R), color)) {
									await placePixel(x + ix - R, y + iy - R, color);
								};
							};
						};
					});
					lastX = OWOP.mouse.tileX;
					lastY = OWOP.mouse.tileY;
				};
				return usedButtons;
			});
			tool.setEvent('mouseup', function (mouse) {
				lastX = null;
				lastY = null;
			});
			tool.setFxRenderer(function (fx, ctx, time) {
				var x = fx.extra.player.x;
				var y = fx.extra.player.y;
				var diameter = tool.brDiameter
				var fxx = (Math.floor(x / 16) - Math.floor(diameter / 2) - OWOP.camera.x) * OWOP.camera.zoom;
				var fxy = (Math.floor(y / 16) - Math.floor(diameter / 2) - OWOP.camera.y) * OWOP.camera.zoom;
				ctx.globalAlpha = 0.8;
				ctx.strokeStyle = fx.extra.player.htmlRgb;
				ctx.strokeRect(fxx, fxy, OWOP.camera.zoom * diameter, OWOP.camera.zoom * diameter);
				return 1; /* Rendering finished (won't change on next frame) */
			});
		}));
		OWOP.windowSys.addWindow(new OWOP.windowSys.class.window('Bot Brush diameter', {}, function (win) {
			win.container.title = 'Bot Brush Diameter';
			win.container.style.height = '16px';
			win.container.style.overflow = 'hidden';

			var brDiamElmm = OWOP.util.mkHTML('span', {
				innerHTML: OWOP.tools.allTools['bot brush'].brDiameter
			});
			win.addObj(brDiamElmm);
			var Rbarr = OWOP.util.mkHTML('input', {
				type: 'range',
				style: '-moz-appearance:none;-webkit-appearance:none;appearance:none;height:6px;outline:none;float:right;',
				min: 2,
				max: 16,
				value: OWOP.tools.allTools['bot brush'].brDiameter,
				oninput: function() {
					OWOP.tools.allTools['bot brush'].brDiameter = this.value;
					brDiamElmm.innerHTML = this.value;
				},
				ondblclick: function() {
					this.value = 1;
					this.onchange();
				}
			});
			win.addObj(Rbarr);
		}).move(800, 32));
		OWOP.tools.addToolObject(new OWOP.tools.class("Bot Protection", OWOP.cursors.shield, OWOP.fx.player.RECT_SELECT_ALIGNED(16), OWOP.RANK.USER, tool => {
			tool.setFxRenderer((fx, ctx) => {
				if(!OWOP.world.protection) OWOP.world.protection = {
					intervals: {},
					pixels: {},
					chunks: []
				};
				try {
					const X = fx.extra.player.x,
						Y = fx.extra.player.y,
						cX = (16 * Math.floor(X / 256) - OWOP.camera.x) * OWOP.camera.zoom,
						cY = (16 * Math.floor(Y / 256) - OWOP.camera.y) * OWOP.camera.zoom,
						tX = fx.extra.player.tileX,
						tY = fx.extra.player.tileY,
						chunk = OWOP.world.protection.pixels[`${tX},${tY}`];
					ctx.globalAlpha = .5;
					ctx.fillStyle = chunk ? "#00FF00" : "#FF0000";
					ctx.fillRect(cX, cY, 16 * OWOP.camera.zoom, 16 * OWOP.camera.zoom);
				} catch (error) {
					const X = fx.extra.player.x,
						Y = fx.extra.player.y,
						cX = (16 * Math.floor(X / 256) - OWOP.camera.x) * OWOP.camera.zoom,
						cY = (16 * Math.floor(Y / 256) - OWOP.camera.y) * OWOP.camera.zoom,
						tX = fx.extra.player.tileX,
						tY = fx.extra.player.tileY;
					ctx.globalAlpha = .5;
					ctx.fillStyle = "#FF0000";
					ctx.fillRect(cX, cY, 16 * OWOP.camera.zoom, 16 * OWOP.camera.zoom);
				};
				return true;
			});
			tool.setEvent("mousedown mousemove", fx => {
				if(!OWOP.world.protection) return;
				const X = Math.floor(OWOP.mouse.tileX / OWOP.options.serverAddress[0].proto.chunkSize) * 16,
					Y = Math.floor(OWOP.mouse.tileY / OWOP.options.serverAddress[0].proto.chunkSize) * 16,
					chunk = OWOP.world.protection.pixels[`${X},${Y}`];
				let chunkX = Math.floor(OWOP.mouse.tileX / 16).toString();
				let chunkY = Math.floor(OWOP.mouse.tileY / 16).toString();
				switch (fx.buttons) {
					case 1:
						if(chunk) return false;
						for (let y = 0; y < 16; y++)
							for (let x = 0; x < 16; x++) {
								OWOP.world.protection.pixels[`${X + x},${Y + y}`] = OWOP.world.getPixel(X + x, Y + y);
								OWOP.world.protection.intervals[`${X + x},${Y + y}`] = setInterval(() => {
									if(!eq(OWOP.world.getPixel(X + x, Y + y), OWOP.world.protection.pixels[`${X + x},${Y + y}`])) {
										protection_queue.unshift({
											pos: [X + x, Y + y],
											color: OWOP.world.protection.pixels[`${X + x},${Y + y}`]
										});
										let abc = getFree();
										bots[abc].world.setPixel(X + x, Y + y, OWOP.world.protection.pixels[`${X + x},${Y + y}`]);
									}
								}, 2000);
							};
						if(OWOP.world.protection.chunks.indexOf(`${chunkX},${chunkY}`) == -1) OWOP.world.protection.chunks.push(`${chunkX},${chunkY}`);
						return true;
						break;
					case 2:
						if(!chunk) return false;
						for (let y = 0; y < 16; y++)
							for (let x = 0; x < 16; x++) {
								clearInterval(OWOP.world.protection.intervals[`${X + x},${Y + y}`]);
								delete OWOP.world.protection.intervals[`${X + x},${Y + y}`];
								delete OWOP.world.protection.pixels[`${X + x},${Y + y}`];
								OWOP.world.protection.chunks = OWOP.world.protection.chunks.filter(pos => pos !== `${chunkX},${chunkY}`);
							};
						break;
				};
				owopfuck.infowindow.container.childNodes[0].childNodes[9].innerText = "Protected chunks: " + OWOP.world.protection.chunks.length;
			});
		}));
		OWOP.tools.addToolObject(new OWOP.tools.class('Bot Fill', OWOP.cursors.fill, OWOP.fx.player.NONE, OWOP.RANK.USER, function (tool) {
			let stopFlag = false;

			async function flooFill(x, y, targetColor, fillColor) {
				if(!targetColor || eq(targetColor, fillColor)) return;
				const pixelQueue = [[x, y]];
				const visited = new Set();
				while (pixelQueue.length > 0) {
					if(stopFlag) return;
					const [x, y] = pixelQueue.shift();
					if(visited.has(`${x},${y}`)) continue;
					visited.add(`${x},${y}`);
					const currentColor = await OWOP.world.getPixel(x, y);
					if(!currentColor) return;
					if(currentColor[0] !== targetColor[0] || currentColor[1] !== targetColor[1] || currentColor[2] !== targetColor[2]) continue;
					await placePixel(x, y, fillColor);
					pixelQueue.push([x + 1, y]);
					pixelQueue.push([x - 1, y]);
					pixelQueue.push([x, y + 1]);
					pixelQueue.push([x, y - 1]);
					// add diagonals to the queue to fill in a circular pattern
					if(!getValue("diagfill")) {
						pixelQueue.push([x + 1, y + 1]);
						pixelQueue.push([x + 1, y - 1]);
						pixelQueue.push([x - 1, y + 1]);
						pixelQueue.push([x - 1, y - 1]);
					};
					await sleep(1);
				};
			};
			function stopFill() {
				stopFlag = true;
				busy = false;
			};
			let busy = false;
			async function startFill(newX, newY, targetColor, fillColor) {
				if(busy) return;
				busy = true;
				stopFlag = false;
				await flooFill(newX, newY, targetColor, fillColor);
			};
			tool.setEvent("mousedown", async function (mouse) {
				if(mouse.buttons == 0 || mouse.buttons == 4) return;
				if(bots.length === 0) return;
				startFill(mouse.tileX, mouse.tileY, OWOP.world.getPixel(mouse.tileX, mouse.tileY), OWOP.player.selectedColor);
			});
			tool.setEvent("mouseup deselect", () => {
				stopFill();
				return;
			});
		}));
		OWOP.tools.addToolObject(new OWOP.tools.class('Bot Area', OWOP.cursors.select, OWOP.fx.player.NONE, OWOP.RANK.USER, function (tool) {
			let step = 1;
			try {
				tool.setFxRenderer(function (fx, ctx, time) {
					if(!fx.extra.isLocalPlayer) return 1;
					let x = fx.extra.player.x;
					let y = fx.extra.player.y;
					let fxx = (Math.floor(x / step) - OWOP.camera.x) * OWOP.camera.zoom;
					let fxy = (Math.floor(y / step) - OWOP.camera.y) * OWOP.camera.zoom;
					let oldlinew = ctx.lineWidth;
					ctx.lineWidth = 1;
					if(tool.extra.end) {
						let s = tool.extra.start;
						let e = tool.extra.end;
						let x = (s[0] - OWOP.camera.x) * OWOP.camera.zoom + 0.5;
						let y = (s[1] - OWOP.camera.y) * OWOP.camera.zoom + 0.5;
						let w = e[0] - s[0];
						let h = e[1] - s[1];
						ctx.beginPath();
						ctx.rect(x, y, w * OWOP.camera.zoom, h * OWOP.camera.zoom);
						ctx.globalAlpha = 0.25;
						ctx.strokeStyle = "#FFFFFF";
						ctx.stroke();
						ctx.setLineDash([3, 4]);
						ctx.strokeStyle = "#000000";
						ctx.stroke();
						ctx.globalAlpha = 0.25 + Math.sin(time / 320) / 4;
						ctx.fillStyle = OWOP.renderer.patterns.unloaded;
						ctx.fill();
						ctx.setLineDash([]);
						let oldfont = ctx.font;
						ctx.font = "16px sans-serif";

						let txt = (!tool.extra.clicking ? "M2 Inside to void. " : '') + `(${Math.abs(w)}x${Math.abs(h)}, ${(Math.abs(w) / 16 * Math.abs(h) / 16).toFixed(4)} chunks)`
						let txtx = window.innerWidth >> 1;
						let txty = window.innerHeight >> 1;
						txtx = Math.max(x, Math.min(txtx, x + w * OWOP.camera.zoom));
						txty = Math.max(y, Math.min(txty, y + h * OWOP.camera.zoom));

						OWOP.drawText = (ctx, str, x, y, centered) => {
							ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 1;
							if(centered) {
								x -= ctx.measureText(str).width >> 1;
							}
							ctx.strokeText(str, x, y);
							ctx.globalAlpha = 1;
							ctx.fillText(str, x, y);
						};
						OWOP.drawText(ctx, txt, txtx, txty, true);
						ctx.font = oldfont;
						ctx.lineWidth = oldlinew;
						return 0;
					} else {
						ctx.beginPath();
						ctx.moveTo(0, fxy + 0.5);
						ctx.moveTo(fxx + 0.5, 0);

						//ctx.lineWidth = 1;
						ctx.globalAlpha = 0.8;
						ctx.strokeStyle = "#FFFFFF";
						ctx.stroke();
						ctx.setLineDash([3]);
						ctx.strokeStyle = "#000000";
						ctx.stroke();

						ctx.setLineDash([]);
						ctx.lineWidth = oldlinew;
						return 1;
					}
				});

				tool.extra.start = null;
				tool.extra.end = null;
				tool.extra.clicking = false;

				tool.setEvent('mousedown', function (mouse) {

					let s = tool.extra.start;
					let e = tool.extra.end;
					let isInside = function isInside() {
						return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
					};
					if(mouse.buttons === 1 && !tool.extra.end) {
						tool.extra.start = [Math.floor(mouse.tileX / step) * step, Math.floor(mouse.tileY / step) * step];
						tool.extra.clicking = true;
						tool.setEvent('mousemove', function (mouse) {
							if(tool.extra.start && mouse.buttons === 1) {
								tool.extra.end = [Math.floor(mouse.tileX / step) * step, Math.floor(mouse.tileY / step) * step];
								return 1;
							}
						});

						let finish = function finish() {
							tool.setEvent('mousemove mouseup deselect', null);
							tool.extra.clicking = false;
							let s = tool.extra.start;
							let e = tool.extra.end;

							if(e) {
								if(s[0] === e[0] || s[1] === e[1]) {
									tool.extra.start = null;
									tool.extra.end = null;
								}
								if(s[0] > e[0]) {
									let tmp = e[0];
									e[0] = s[0];
									s[0] = tmp;
								}
								if(s[1] > e[1]) {
									let tmp = e[1];
									e[1] = s[1];
									s[1] = tmp;
								}
							}
							OWOP.renderer.render(OWOP.renderer.rendertype.FX);
						};

						tool.setEvent('deselect', finish);
						tool.setEvent('mouseup', function (mouse) {
							if(!(mouse.buttons & 1)) {
								finish();
							};
						});
					} else if(mouse.buttons === 1 && tool.extra.end) {
						if(isInside()) {
							let offx = mouse.tileX;
							let offy = mouse.tileY;
							tool.setEvent('mousemove', function (mouse) {
								let dx = mouse.tileX - offx;
								let dy = mouse.tileY - offy;
								tool.extra.start = [s[0] + dx, s[1] + dy];
								tool.extra.end = [e[0] + dx, e[1] + dy];
							});
							let end = function end() {
								tool.setEvent('mouseup deselect mousemove', null);
							};

							tool.setEvent('deselect', end);
							tool.setEvent('mouseup', function (mouse) {
								if(!(mouse.buttons & 1)) {
									end();
								};
							});
						}
					} else if(mouse.buttons === 2 && tool.extra.end && isInside()) {
						let w = tool.extra.end[0] - tool.extra.start[0];
						let h = tool.extra.end[1] - tool.extra.start[1];
						let color = OWOP.player.selectedColor;

						let chunkx = tool.extra.start[0];
						let chunky = tool.extra.start[1];

						let element = document.createElement("div");
						element.style.position = "fixed";
						element.style.transformOrigin = "left top 0px";
						element.style.overflow = "hidden";
						element.style.width = gameToSize(w, h).width;
						element.style.height = gameToSize(w, h).height;
						element.style.backgroundColor = `rgba(${[color[0], color[1], color[2]].join(", ")}, 0.5)`;

						if(getValue("areahighlightblink")) {
							var style = document.createElement("style");
							style.innerHTML = `
@keyframes blink {
0% { opacity: 1; }
50% { opacity: 0; }
100% { opacity: 1; }
}`;
							element.style.animation = "blink 1s infinite";
							document.head.appendChild(style);
						};

						var shown = false;
						var ismag = false;
						var finished = false;

						function move() {
							var sc = OWOP.camera.zoom / 16;
							var pixelSize = 32 * sc;

							var gameX = chunkx / 2;
							var gameY = chunky / 2;

							var screenX = (-OWOP.camera.x) * OWOP.camera.zoom + gameX * pixelSize;
							var screenY = (-OWOP.camera.y) * OWOP.camera.zoom + gameY * pixelSize;

							if(screenX > -512 && screenY > -512 && screenX < window.innerWidth && screenY < window.innerHeight) {
								if(sc > 1.0 && !ismag) {
									ismag = true;
									element.style.imageRendering = 'pixelated';
								} else if(sc <= 1.0 && ismag) {
									ismag = false;
									element.style.imageRendering = 'auto';
								};

								element.style.transform = `matrix(${sc}, 0, 0, ${sc}, ${Math.round(screenX)}, ${Math.round(screenY)})`;

								if(!shown) {
									OWOP.elements.viewport.appendChild(element);
									shown = true;
								};
							} else {
								if(shown) {
									element.remove();
									shown = false;
								};
							};

							if(!getValue("areahighlight") || finished) {
								shown = false;
								OWOP.removeListener(OWOP.events.camMoved || OWOP.events.camera.moved, move);
								element.remove();
							};
						};

						// if(getValue("areahighlight")) {
						// 	move();

						OWOP.on(OWOP.events.tick, move);
						// };

						const totalPixels = w * h; // TODO: make this more accurate by counting every different pixel
						let filledPixels = 0;

						let job_id = `${tool.extra.start.toString()}-${tool.extra.end.toString()}`;
						let id = `owopfuck-fill-${job_id}`;
						let fillTable = document.createElement("tr");
						fillTable.innerHTML = `<td id="${id}-pos"><button id="${id}-tp" title="${tool.extra.start} ; ${tool.extra.end}" class="owopfuck-smallbtn">TP</button></td>
<td id="${id}-time">?</td>
<td id="${id}-action"><button id="${id}-stopbtn" class="owopfuck-smallbtn">STOP</button></td>`;
						fillTable.id = `owopfuck-job-${job_id}`;
						document.getElementById("owopfuck-jobs").appendChild(fillTable);

						document.getElementById(id + "-tp").addEventListener("click", () => {
							OWOP.emit(6666695, chunkx, chunky);
						});

						let item = `setPixel_${chunkx.toString().replace("-", "_")}_${chunky.toString().replace("-", "_")}_${(chunkx + w).toString().replace("-", "_")}_${(chunky + h).toString().replace("-", "_")}`;

						document.getElementById(id + "-stopbtn").addEventListener("click", () => {
							bots.forEach(bot => delete bot.world[item]);
							fillTable.remove();
							shown = false;
							finished = true;
							move();
							OWOP.removeListener(OWOP.events.camMoved || OWOP.events.camera.moved, move);
							updateIndicator();
							updateAreaPoses();
						});

						(async function() {
							bots.forEach(bot => {
								bot.world[item] = (...args) => {
									if(bot.net.bucket.allowance >= getValue("freebucket")) filledPixels++;
									bot.world.originalSetPixel(...args);
									if((!getValue("livepredtime") && filledPixels % 100 === 0) || getValue("livepredtime")) {
										const elapsedTime = Date.now() - startTime;
										let remainingTime = (elapsedTime / filledPixels) * (totalPixels - filledPixels);
										if(remainingTime < 0) remainingTime = 0;
										if(document.getElementById(id + "-time")) document.getElementById(id + "-time").innerText = `${(remainingTime / 1000).toFixed(2)}s`;
										updateIndicator();
									};
									updateAreaPoses();
								};
							});
							let startTime = Date.now();
							await fill(chunkx, chunky, chunkx + w, chunky + h, color, item, "areapattern");
							await (async () => {
								bots.forEach(bot => delete bot.world[item]);
								fillTable.remove();
								shown = false;
								finished = true;
								move();
								OWOP.removeListener(OWOP.events.camMoved || OWOP.events.camera.moved, move);
								updateIndicator();
								updateAreaPoses();
							})();
						})();
					} else {
						tool.extra.start = null;
						tool.extra.end = null;
					};
				});
			} catch (e) {
				console.log(e);
			};
		}));
		OWOP.tools.addToolObject(new OWOP.tools.class('Bot Unpixel area', OWOP.cursors.select, OWOP.fx.player.NONE, OWOP.RANK.USER, function (tool) {
			let step = 1;
			let toreplace = [0, 0, 0];
			try {
				tool.setFxRenderer(function (fx, ctx, time) {
					if(!fx.extra.isLocalPlayer) return 1;
					let x = fx.extra.player.x;
					let y = fx.extra.player.y;
					let fxx = (Math.floor(x / step) - OWOP.camera.x) * OWOP.camera.zoom;
					let fxy = (Math.floor(y / step) - OWOP.camera.y) * OWOP.camera.zoom;
					let oldlinew = ctx.lineWidth;
					ctx.lineWidth = 1;
					if(tool.extra.end) {
						let s = tool.extra.start;
						let e = tool.extra.end;
						let x = (s[0] - OWOP.camera.x) * OWOP.camera.zoom + 0.5;
						let y = (s[1] - OWOP.camera.y) * OWOP.camera.zoom + 0.5;
						let w = e[0] - s[0];
						let h = e[1] - s[1];
						ctx.beginPath();
						ctx.rect(x, y, w * OWOP.camera.zoom, h * OWOP.camera.zoom);
						ctx.globalAlpha = 0.25;
						ctx.strokeStyle = "#FFFFFF";
						ctx.stroke();
						ctx.setLineDash([3, 4]);
						ctx.strokeStyle = "#000000";
						ctx.stroke();
						ctx.globalAlpha = 0.25 + Math.sin(time / 320) / 4;
						ctx.fillStyle = OWOP.renderer.patterns.unloaded;
						ctx.fill();
						ctx.setLineDash([]);
						let oldfont = ctx.font;
						ctx.font = "16px sans-serif";

						let txt = (!tool.extra.clicking ? "M2 Inside to void. " : '') + `(${Math.abs(w)}x${Math.abs(h)}, ${(Math.abs(w) / 16 * Math.abs(h) / 16).toFixed(4)} chunks)`
						let txtx = window.innerWidth >> 1;
						let txty = window.innerHeight >> 1;
						txtx = Math.max(x, Math.min(txtx, x + w * OWOP.camera.zoom));
						txty = Math.max(y, Math.min(txty, y + h * OWOP.camera.zoom));

						OWOP.drawText = (ctx, str, x, y, centered) => {
							ctx.strokeStyle = "#000000", ctx.fillStyle = "#FFFFFF", ctx.lineWidth = 2.5, ctx.globalAlpha = 1;
							if(centered) {
								x -= ctx.measureText(str).width >> 1;
							}
							ctx.strokeText(str, x, y);
							ctx.globalAlpha = 1;
							ctx.fillText(str, x, y);
						};
						OWOP.drawText(ctx, txt, txtx, txty, true);
						ctx.font = oldfont;
						ctx.lineWidth = oldlinew;
						return 0;
					} else {
						ctx.beginPath();
						ctx.moveTo(0, fxy + 0.5);
						ctx.moveTo(fxx + 0.5, 0);

						//ctx.lineWidth = 1;
						ctx.globalAlpha = 0.8;
						ctx.strokeStyle = "#FFFFFF";
						ctx.stroke();
						ctx.setLineDash([3]);
						ctx.strokeStyle = "#000000";
						ctx.stroke();

						ctx.setLineDash([]);
						ctx.lineWidth = oldlinew;
						return 1;
					}
				});

				tool.extra.start = null;
				tool.extra.end = null;
				tool.extra.clicking = false;

				tool.setEvent('keydown', function (key) {
					if(key["17"]) {
						toreplace = OWOP.world.getPixel(OWOP.mouse.tileX, OWOP.mouse.tileY);
						OWOP.chat.local(`Unpixel [${toreplace.join(", ")}] to selected color.`);
					};
				});

				tool.setEvent('mousedown', function (mouse) {
					let s = tool.extra.start;
					let e = tool.extra.end;
					let isInside = function isInside() {
						return mouse.tileX >= s[0] && mouse.tileX < e[0] && mouse.tileY >= s[1] && mouse.tileY < e[1];
					};
					if(mouse.buttons === 1 && !tool.extra.end) {
						tool.extra.start = [Math.floor(mouse.tileX / step) * step, Math.floor(mouse.tileY / step) * step];
						tool.extra.clicking = true;
						tool.setEvent('mousemove', function (mouse) {
							if(tool.extra.start && mouse.buttons === 1) {
								tool.extra.end = [Math.floor(mouse.tileX / step) * step, Math.floor(mouse.tileY / step) * step];
								return 1;
							}
						});

						let finish = function finish() {
							tool.setEvent('mousemove mouseup deselect', null);
							tool.extra.clicking = false;
							let s = tool.extra.start;
							let e = tool.extra.end;

							if(e) {
								if(s[0] === e[0] || s[1] === e[1]) {
									tool.extra.start = null;
									tool.extra.end = null;
								}
								if(s[0] > e[0]) {
									let tmp = e[0];
									e[0] = s[0];
									s[0] = tmp;
								}
								if(s[1] > e[1]) {
									let tmp = e[1];
									e[1] = s[1];
									s[1] = tmp;
								}
							}
							OWOP.renderer.render(OWOP.renderer.rendertype.FX);
						};

						tool.setEvent('deselect', finish);
						tool.setEvent('mouseup', function (mouse) {
							if(!(mouse.buttons & 1)) {
								finish();
							};
						});
					} else if(mouse.buttons === 1 && tool.extra.end) {
						if(isInside()) {
							let offx = mouse.tileX;
							let offy = mouse.tileY;
							tool.setEvent('mousemove', function (mouse) {
								let dx = mouse.tileX - offx;
								let dy = mouse.tileY - offy;
								tool.extra.start = [s[0] + dx, s[1] + dy];
								tool.extra.end = [e[0] + dx, e[1] + dy];
							});
							let end = function end() {
								tool.setEvent('mouseup deselect mousemove', null);
							};

							tool.setEvent('deselect', end);
							tool.setEvent('mouseup', function (mouse) {
								if(!(mouse.buttons & 1)) {
									end();
								};
							});
						}
					} else if(mouse.buttons === 2 && tool.extra.end && isInside()) {
						let w = tool.extra.end[0] - tool.extra.start[0];
						let h = tool.extra.end[1] - tool.extra.start[1];
						let color = OWOP.player.selectedColor;

						let chunkx = tool.extra.start[0];
						let chunky = tool.extra.start[1];

						let element = document.createElement("div");
						element.style.position = "fixed";
						element.style.transformOrigin = "left top 0px";
						element.style.overflow = "hidden";
						element.style.width = gameToSize(w, h).width;
						element.style.height = gameToSize(w, h).height;
						element.style.backgroundColor = `rgba(${[color[0], color[1], color[2]].join(", ")}, 0.5)`;

						if(getValue("areahighlightblink")) {
							var style = document.createElement("style");
							style.innerHTML = `
@keyframes blink {
0% { opacity: 1; }
50% { opacity: 0; }
100% { opacity: 1; }
}`;
							element.style.animation = "blink 1s infinite";
							document.head.appendChild(style);
						};

						var shown = false;
						var ismag = false;
						var finished = false;

						function move() {
							var sc = OWOP.camera.zoom / 16;
							var pixelSize = 32 * sc;

							var gameX = chunkx / 2;
							var gameY = chunky / 2;

							var screenX = (-OWOP.camera.x) * OWOP.camera.zoom + gameX * pixelSize;
							var screenY = (-OWOP.camera.y) * OWOP.camera.zoom + gameY * pixelSize;

							if(screenX > -512 && screenY > -512 && screenX < window.innerWidth && screenY < window.innerHeight) {
								if(sc > 1.0 && !ismag) {
									ismag = true;
									element.style.imageRendering = 'pixelated';
								} else if(sc <= 1.0 && ismag) {
									ismag = false;
									element.style.imageRendering = 'auto';
								};

								element.style.transform = `matrix(${sc}, 0, 0, ${sc}, ${Math.round(screenX)}, ${Math.round(screenY)})`;

								if(!shown) {
									OWOP.elements.viewport.appendChild(element);
									shown = true;
								};
							} else {
								if(shown) {
									element.remove();
									shown = false;
								};
							};

							if(!getValue("areahighlight") || finished) {
								shown = false;
								OWOP.removeListener(OWOP.events.camMoved || OWOP.events.camera.moved, move);
								element.remove();
							};
						};

						// if(getValue("areahighlight")) {
						// 	move();

						OWOP.on(OWOP.events.tick, move);
						// };

						const totalPixels = w * h;
						let filledPixels = 0;

						let job_id = `${tool.extra.start.toString()}-${tool.extra.end.toString()}`;
						let id = `owopfuck-fill-${job_id}`;
						let fillTable = document.createElement("tr");
						fillTable.innerHTML = `<td id="${id}-pos"><button id="${id}-tp" title="${tool.extra.start} ; ${tool.extra.end}" class="owopfuck-smallbtn">TP</button></td>
<td id="${id}-time">?</td>
<td id="${id}-action"><button id="${id}-stopbtn" class="owopfuck-smallbtn">STOP</button></td>`;
						fillTable.id = `owopfuck-job-${job_id}`;
						document.getElementById("owopfuck-jobs").appendChild(fillTable);

						document.getElementById(id + "-tp").addEventListener("click", () => {
							OWOP.emit(6666695, chunkx, chunky);
						});
						document.getElementById(id + "-stopbtn").addEventListener("click", () => {
							w = 0;
							h = 0;
						});

						(async function() {
							let item = `setPixel_${chunkx.toString().replace("-", "_")}_${chunky.toString().replace("-", "_")}_${(chunkx + w).toString().replace("-", "_")}_${(chunky + h).toString().replace("-", "_")}`;
							bots.forEach(bot => {
								bot.world[item] = (...args) => {
									if(bot.net.bucket.allowance >= getValue("freebucket")) filledPixels++;
									bot.world.originalSetPixel(...args);
									if((!getValue("livepredtime") && filledPixels % 100 === 0) || getValue("livepredtime")) {
										const elapsedTime = Date.now() - startTime;
										let remainingTime = (elapsedTime / filledPixels) * (totalPixels - filledPixels);
										if(remainingTime < 0) remainingTime = 0;
										if(document.getElementById(id + "-time")) document.getElementById(id + "-time").innerText = `${(remainingTime / 1000).toFixed(2)}s`;
										updateIndicator();
									};
									updateAreaPoses();
								};
							});
							let startTime = Date.now();

							await unfill(chunkx, chunky, chunkx + w, chunky + h, color, toreplace, item, "areapattern");

							await (async () => {
								bots.forEach(bot => delete bot.world[item]);
								fillTable.remove();
								shown = false;
								finished = true;
								move();
								OWOP.removeListener(OWOP.events.camMoved || OWOP.events.camera.moved, move);
								updateIndicator();
								updateAreaPoses();
							})();
						})();
					} else {
						tool.extra.start = null;
						tool.extra.end = null;
					};
				});
			} catch (e) {
				console.log(e);
			};
		}));
		window.owopfuck = {
			assetswindow: OWOP.windowSys.windows["owopfuck assets"],
			infowindow: OWOP.windowSys.windows["owopfuck info"],
			jobswindow: OWOP.windowSys.windows["owopfuck jobs"],
			mainwindow: OWOP.windowSys.windows["owopfuck"],
			config: { getValue, setValue },
			irc: ircServer,
			area_poses: [],
			erase_poses: []
		};
	});
})();
