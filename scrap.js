const Blockchain = require("./blockchain");
const blockchain = new Blockchain();

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

const TOTAL_BLOCKS = 1000;
for (let index = 0; index < TOTAL_BLOCKS; index++) {
    prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp
    blockchain.addBlock({ data: `block ${index}` });
    nextBlock = blockchain.chain[blockchain.chain.length - 1];
    nextTimestamp = nextBlock.timestamp;
    timeDiff = nextTimestamp - prevTimestamp;
    times.push(timeDiff);
    average = times.reduce((total, num) => (total + num)) / times.length;
    console.log(`Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms. Valid: ${Blockchain.isValidChain(blockchain.chain)}`)
}