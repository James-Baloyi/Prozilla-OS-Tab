import { EventEmitter } from "../utils/events.js";

import { VirtualRoot } from "./virtualRoot.js";

export class VirtualBase extends EventEmitter {
	/**
	 * @param {string} name 
	 */
	constructor(name) {
		super();
		this.name = name;
	}

	get id() {
		return this.name;
	}

	/**
	 * @param {string} name 
	 * @returns {VirtualBase}
	 */
	setName(name) {
		this.name = name;
		this.getRoot().saveData();
		return this;
	}

	/**
	 * @param {string} alias 
	 * @returns {ThisType}
	 */
	setAlias(alias) {
		if (this.alias === alias)
			return;

		this.alias = alias;
		this.getRoot().addShortcut(alias, this);
		this.getRoot().saveData();
		return this;
	}

	/**
	 * @param {VirtualBase} parent
	 * @returns {VirtualBase}
	 */
	setParent(parent) {
		if (this.parent === parent)
			return;

		this.parent = parent;
		this.getRoot().saveData();
		return this;
	}

	delete() {
		const parent = this.parent;

		if (parent == null)
			return;

		parent.remove?.(this);
		parent.getRoot()?.saveData();
	}

	open() {}

	get path() {
		return this.alias ?? this.absolutePath;
	}

	get absolutePath() {
		return this.parent?.path + "/" + this.id;
	}

	/**
	 * @returns {VirtualRoot}
	 */
	getRoot() {
		const root = this.root ?? this.parent?.getRoot();

		if (root === null) {
			throw new Error("Root not found");
		}

		return root;
	}

	toJSON() {
		const object = {
			nam: this.name
		};

		return object;
	}
}