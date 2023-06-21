const expenseSchema = require("../models/expenseModel")

exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const expense = expenseSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All fields are required!"})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: "Amount must be a postitive number!"})
        }
        await expense.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getExpense = async (req, res) =>{
    try {
        const expense = await expenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expense)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    expenseSchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}