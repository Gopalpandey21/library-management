class HashTable {
  constructor(size = 100) {
    this.size = size;
    this.table = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }

  add(user) {
    const index = this._hash(user.id);
    if (!this.table[index]) {
      this.table[index] = [];
    }

    const exists = this.table[index].find(u => u.id === user.id);
    if (!exists) {
      this.table[index].push(user);
    }
  }

  find(userId) {
    const index = this._hash(userId);
    const bucket = this.table[index];
    if (!bucket) return null;
    return bucket.find(user => user.id === userId) || null;
  }

  getAllUsers() {
    return this.table.flat().filter(Boolean);
  }

  delete(userId) {
    const index = this._hash(userId);
    if (this.table[index]) {
      this.table[index] = this.table[index].filter(user => user.id !== userId);
    }
  }
}

module.exports = HashTable;
