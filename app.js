const express = require('express');
const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json')
const contractABI = MyContract.abi
const contractAddress = '0xf260e3b88ded8Fc5F6EDfe7f4ba49058a34568f7'
const rpcEndpoint = 'http://127.0.0.1:8545'

const app = express()
const web3 = new Web3(new Web3.providers.HttpProvider(rpcEndpoint));
const contract = new web3.eth.Contract(contractABI, contractAddress)

app.use(express.json())

app.get('/number', async(req, res) => {
    const number = await contract.methods.getNumber().call();
    res.json({ number })
})

app.post('/number', async(req, res) => {
    const {number} = req.body
    const accounts = await web3.eth.getAccounts()
    const result = await contract.methods.setNumber(number).send({from: accounts[0]})
    res.json({message: 'number set success'})
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})