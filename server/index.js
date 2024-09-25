const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://cwt:test123@expensecluster.tig6z.mongodb.net/expenses?retryWrites=true&w=majority&appName=ExpenseCluster');
  console.log('DB Connected');
}

const server = express();

server.use(cors());
server.use(bodyParser.json())

const expenseSchema = new mongoose.Schema({
    expenseName: String,
    expenseAmount: Number,
    expenseType: String
})

const Expense = mongoose.model('Expense', expenseSchema)

server.post('/expenseAdd', async (req, res) => {
    let expense = new Expense()
    expense.expenseName = req.body.expenseName
    expense.expenseAmount = req.body.expenseAmount
    expense.expenseType = req.body.expenseType
    const doc = await expense.save();

    console.log(doc)
    res.json(doc)
})

server.get('/getExpense', async (req, res) => {
    const docs = await Expense.find({});
    res.json(docs)
})

server.post('/deleteExpense', async (req, res) => {
    const { expenseid } = req.body;
    try{
        await Expense.deleteOne({_id:expenseid})
    } catch(err){
        console.log(err)
    }
})

server.listen(8080, ()=>{
    console.log("Server Started");
})