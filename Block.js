const sha256 = require("crypto-js/sha256");

class Block {
  constructor(data, date) {
    this.index = 0;
    this.timestamp = date;
    this.data = data;
    this.precedingHash = "0";
    this.nonce = 0;
    this.hash = this.computeHash();
  }

  computeHash() {
    return sha256(
      this.index +
        this.timestamp +
        JSON.stringify(this.data) +
        this.precedingHash +
        this.nonce
    ).toString();
  }
  // il faut enlever proof d 'ici et quelle retourne un promèse 
  proofOfWork(difficulty) {
    // Tant que le nombre de zéro  n'est pas égale à la difficulté
    while (
      // on vient récuperer le substring du hash
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++; // on continue d'ingrémenter le nombre nonce
      this.hash = this.computeHash(); // on repart sur cette boucle jusqu'a trouver un nombre de zéro = à la difficulté
    }
  }
}

module.exports = Block;
