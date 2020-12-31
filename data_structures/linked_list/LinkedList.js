const Node = require("./Node.js");

/**
	@author: Ngoc Huy
	Simple LinkedList
*/
module.exports = class LinkedList {
	constructor() {
		this.head = null;
		this.tail = this.head;
	}

	visit() {
		if (this.head === this.tail === null) {
			return this;
		}

		let node = this.head;

		while (node) {
			console.log(node.data);
			node = node.next;
		}

		return this;
	}

	addHead(data) {
		const node = new Node(data);

		if (this.head == null) {
			this.head = this.tail = node;
			
			return this;
		}

		node.next = this.head;
		this.head = node;

		return this;
	}

	addTail(data) {
		const node = new Node(data);

		if (this.tail == null) {
			this.head = this.tail = node;
			
			return this;
		}

		this.tail.next = node;
		this.tail = node;

		return this;
	}

	// if the data stored in this List is an Object,
	// then all the attributes constructed in the Object must be
	// exactly mirrored in order to do a comparison on them
	find(data, callback) {
		if (!this.head || !this.tail) {
			return null;
		}

		let node = this.head;

		while (node) {
			if (JSON.stringify(data) === JSON.stringify(node.data)) {
				callback && typeof callback === 'function' ? callback(node) : 1;

				return node;
			}
			
			node = node.next;
		}

		return null;
	}

	delete(data) {
		let node = this.find(data);

		if (!node)
			return this;

		if (this.head === node) {
			this.head = node.next;
			node = null;

			return this;
		}

		let cursor = this.head;

		while (cursor.next !== node) {
			cursor = cursor.next;
		}
		
		cursor.next = node.next;
		node = null;

		return this;
	}
}