const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            previousBlock: this.chain[this.chain.length - 1],
            data
        })
        this.chain.push(newBlock)
    }

    static isValidChain(chain) {

        // Comparing genesis block
        // console.log("chain[0]", JSON.stringify(chain[0]))
        // console.log("Block.genesis()",JSON.stringify(Block.genesis()))
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false;
        }
        // Validating each block in the chain
        for (let index = 1; index < chain.length; index++) {
            const eachBlock = chain[index];
            const { timestamp, prevHash, hash, nonce, difficulty, data } = eachBlock;
            const lastDifficulty = chain[index-1].difficulty;
            // Fetching last block hash
            const actualHash = chain[index - 1].hash;

            // Comparing previous block hash with last block hash
            if (prevHash !== actualHash) return false;

            // Validating hash of exisitng each block hash
            const validatedHash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
            if (hash !== validatedHash) return false;
            console.log("lastDifficulty",lastDifficulty)
            console.log("difficulty",difficulty)
            console.log("lastDifficulty - difficulty",lastDifficulty - difficulty)
            if(Math.abs(lastDifficulty - difficulty)> 1) return false;

        }
        return true
    }

    replaceChain(incomingChain) {
        if (incomingChain.length <= this.chain.length) {
            console.error("The incoming chain must be longer")
            return;
        }

        if (!Blockchain.isValidChain(incomingChain)) {
            console.error("The incoming chain must be valid")
            return;
        }
        this.chain = incomingChain;
    }
}
module.exports = Blockchain;

// const blockchain = new Blockchain();
// blockchain.addBlock({ data: "Suraj" })
// blockchain.addBlock({ data: "Shailesh" })
// blockchain.addBlock({ data: "Vishal" })
// console.log("blockchain", blockchain)
// const result = Blockchain.isValidChain(blockchain.chain)
// console.log("result", result)
// blockchain.replaceChain(blockchain.chain)