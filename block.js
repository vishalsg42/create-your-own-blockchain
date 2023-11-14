const { GENESIS_DATA, INTIAL_DIFFICULTY, MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");
const hexToBinary = require('hex-to-binary')


class Block {
    constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp; // current timestamp
        this.prevHash = prevHash; // previous block hash
        this.hash = hash; // current block hash
        this.data = data; // transaction data
        this.nonce = nonce; // nonce value
        // difficulty value is a target value for the hash
        this.difficulty = difficulty; // difficulty value
    }
    static genesis() {
        // return new this(GENESIS_DATA);
        const timestamp = -1;
        const data = "Initial Block";
        const prevHash = null;
        const nonce = 0;
        const difficulty = INTIAL_DIFFICULTY;
        return new this({
            timestamp,
            prevHash,
            data,
            nonce,
            difficulty,
            hash: cryptoHash(timestamp, null, data, nonce, difficulty)
        })
    }

    static mineBlock({ previousBlock, data }) {
        let timestamp, hash;
        const prevHash = previousBlock?.hash || null;
        let nonce = 0;
        let difficulty;
        if (!previousBlock) {
            difficulty = INTIAL_DIFFICULTY;
        } else {
            difficulty = previousBlock.difficulty;
        }
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: previousBlock, timestamp });
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));

        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash
        })
    }

    static adjustDifficulty({ originalBlock, timestamp }) {
        const { difficulty } = originalBlock;
        if (difficulty < 1) return 1;
        const difference = timestamp - originalBlock.timestamp;
        if (difference > MINE_RATE) return difficulty - 1;
        return difficulty + 1;
    }
}

// const block = new Block();
// const block2 = new Block();
// const genesisBlock = new Block({
//     timestamp: new Date(),
//     prevHash: null,
//     hash: "0x123",
//     data: ["100"]
// })

// const genesisBlock = Block.mineBlock({
//     prevHash: null,
//     data: "Initial Block"
// })
// console.log("genesisBlock", genesisBlock)
// const block1 = Block.mineBlock({
//     previousBlock: null,
//     data: "Vishal"
// })

// const block2 = Block.mineBlock({
//     previousBlock: block1,
//     data: "Shailesh"
// })
// console.log("Block1", block1)
// const block1 = new Block(new Date(), "0x123", "0xprq", "200")
// const block2 = new Block(new Date(), block1.hash, "0xabcd", "300")
// const chain = [genesisBlock, block1, ];
// console.log("genesisBlock", genesisBlock);
// console.log("block1", block1);
// console.log("block2", block2);
// const result = 
module.exports = Block;