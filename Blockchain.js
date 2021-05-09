const Block = require("./Block");

class Blockchain {
  constructor(io) {
    this.chain = [this.startGenesisBlock()];
    this.difficulty = 3;
    this.nodes = []; // liste des noeuds
    this.io = io; // io étant le serveur
  }
  startGenesisBlock() {
    let block = new Block({ sender: "", recipient: "", qty: 0 }, "23/02/2001");
    return block;
  }
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  addNewBlock(newblock) {
    newblock.precedingHash = this.getLatestBlock().hash;
    newblock.index = this.getLatestBlock().index + 1;
    newblock.proofOfWork(this.difficulty);
    this.chain.push(newblock);
    this.io.emit("miningdone", this.chain);
  }

  addNewNode(node) {
    this.nodes.push(node); // l'ajout de nouveau noeud
  }

  validityBlock() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const precedingBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.precedingHash != precedingBlock.hash) {
        return false;
      }
    }
  }
}

module.exports = Blockchain;
