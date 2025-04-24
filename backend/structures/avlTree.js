class Node {
  constructor(book) {
    this.book = book;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insertNode(node, book) {
    if (!node) return new Node(book);

    if (book.id < node.book.id) {
      node.left = this.insertNode(node.left, book);
    } else if (book.id > node.book.id) {
      node.right = this.insertNode(node.right, book);
    } else {
      return node; // No duplicate ID
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalance(node);

    if (balance > 1 && book.id < node.left.book.id) return this.rightRotate(node);
    if (balance < -1 && book.id > node.right.book.id) return this.leftRotate(node);
    if (balance > 1 && book.id > node.left.book.id) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && book.id < node.right.book.id) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  insert(book) {
    this.root = this.insertNode(this.root, book);
  }

  searchNode(node, id) {
    if (!node) return null;
    if (id === node.book.id) return node.book;
    if (id < node.book.id) return this.searchNode(node.left, id);
    return this.searchNode(node.right, id);
  }

  search(id) {
    return this.searchNode(this.root, id);
  }

  update(id, updates) {
    const book = this.search(id);
    if (!book) return false;
    Object.assign(book, updates);
    return true;
  }

  findMin(node) {
    let current = node;
    while (current.left) current = current.left;
    return current;
  }

  deleteNode(node, id) {
    if (!node) return null;

    if (id < node.book.id) {
      node.left = this.deleteNode(node.left, id);
    } else if (id > node.book.id) {
      node.right = this.deleteNode(node.right, id);
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right;
      } else {
        const minNode = this.findMin(node.right);
        node.book = minNode.book;
        node.right = this.deleteNode(node.right, minNode.book.id);
      }
    }

    if (!node) return null;

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalance(node);

    if (balance > 1 && this.getBalance(node.left) >= 0) return this.rightRotate(node);
    if (balance > 1 && this.getBalance(node.left) < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && this.getBalance(node.right) <= 0) return this.leftRotate(node);
    if (balance < -1 && this.getBalance(node.right) > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  delete(id) {
    this.root = this.deleteNode(this.root, id);
  }

  inOrderTraversal(node = this.root, callback) {
    if (!node) return;
    this.inOrderTraversal(node.left, callback);
    callback(node.book);
    this.inOrderTraversal(node.right, callback);
  }
}

module.exports = AVLTree;
