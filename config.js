const GENESIS_DATA = {
    timestamp: new Date(),
    prevHash: null,
    hash: "0x000",
    data: []
}
const MINE_RATE = 1000 // 1 second
const INTIAL_DIFFICULTY = 0;
module.exports = {
    GENESIS_DATA,
    INTIAL_DIFFICULTY,
    MINE_RATE,
}

