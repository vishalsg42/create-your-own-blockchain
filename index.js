const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require("./blockchain");
const PubSub = require("./publishsubscriber");

const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain })

setTimeout(()=> {
    pubsub.broadcastChain()
}, 1000)

const app = express();

app.use(bodyParser.json());
app.get(`/api/blocks`, (req, res)=> {
    res.json(blockchain.chain)
})

app.post(`/api/mine`, (req, res)=> {
    const { data } = req.body;
    blockchain.addBlock({data})
    res.redirect('/api/blocks')
});

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Listening at localhost:${PORT}`)
})