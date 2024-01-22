const UltimateConfig = (function () {
	class Config {
		constructor(name) {
			if (!localStorage[name]) localStorage[name] = "{}";
			this.name = name;

			if (localStorage[name]) {
				this.data = JSON.parse(localStorage[this.name]) || {};
			} else {
				this.data = {};
			};
		};

		setValue(value, ...path) {
			let current = this.data;

			for (let i = 0; i < path.length - 1; i++) {
				const key = path[i];
				current[key] = current[key] || {};
				current = current[key];
			}

			const lastKey = path[path.length - 1];
			current[lastKey] = value;

			this.save();
		};

		getValue(...path) {
			let current = this.data;

			for (const key of path) {
				if (current[key] !== undefined) {
					current = current[key];
				} else {
					return undefined;
				};
			};

			return current;
		};

		save() {
			localStorage[this.name] = JSON.stringify(this.data);
		};
	};

	return Config;
})();