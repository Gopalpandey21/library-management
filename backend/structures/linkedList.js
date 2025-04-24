class Node {
  constructor(bookId) {
    this.bookId = bookId;
    this.date = new Date().toLocaleString(); // timestamp
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  add(bookId) {
    const newNode = new Node(bookId);
    newNode.next = this.head;
    this.head = newNode;
  }

  remove(bookId) {
    let current = this.head;
    let prev = null;

    while (current) {
      if (current.bookId === bookId) {
        if (prev) {
          prev.next = current.next;
        } else {
          this.head = current.next;
        }
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  toArray() {
    const result = [];
    let node = this.head;
    while (node) {
      result.push({ bookId: node.bookId, date: node.date });
      node = node.next;
    }
    return result;
  }
}

module.exports = LinkedList;
