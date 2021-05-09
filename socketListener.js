const { mode } = require("crypto-js");
const Block = require("./Block");
const Blockchain = require("./Blockchain");

// partie cliente de l'app

const socketListener = (socket, chain) => {
  socket.on("mine", (sender, receiver, qty) => {
    let block = new Block({ sender, receiver, qty });
    chain.addNewBlock(block);
    console.info(`Block number ${block.index} just mined`);
  });

  socket.on("blockmined", (newChain) => {
    blockchain.chain = newChain;
    console.info(`Blockchain synchronized`);
  });
  return socket;
};
module.exports = socketListener;
