import ExpenseTab from './ExpenseTab.jsx'
import whiteCrossIcon from './assets/whiteCrossIcon.png'
import emptyWallet from './assets/emptyWallet.png'
import { useState, useEffect } from 'react'
import './MainPage.css'

function MainPage(){
    const [openPop, setOpenPop] = useState(false);
    const [expenses, setExpenses] = useState([]);

    const getExpenses = async () => {
        const response = await fetch('http://localhost:8080/getExpense', {
            method:'GET'
        })
        const data = await response.json();
        setExpenses(data);
    }

    const deleteExpense = async (id, name) => {
        const response = await fetch('http://localhost:8080/deleteExpense', {
            method:'POST',
            body:JSON.stringify({expenseid : id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json();
        setExpenses(data)
    }

    useEffect(() => {
        getExpenses();
    }, [expenses])

    return((expenses.length > 0) ?  
        <>
            <ExpenseTab trigger={openPop} setTrigger={setOpenPop}/>
            <button onClick={() => setOpenPop(true)}>Add an Expense</button>
            <div className='mainPageContainer'>
                <div className='expenseListContainer'>
                    <ul className='nameTypeList'>
                        {expenses.map(expense=>
                            <li key={expense._id}>
                                <div className='listDiv'>
                                    <div><span className='nameSpan'>{expense.expenseName}</span> 
                                    <br></br>
                                    <span className='typeSpan'>{expense.expenseType}</span></div> <span className='amountSpan'>${expense.expenseAmount}</span> 
                                    <div className='deleteExpenseIcon' onClick={() => deleteExpense(expense._id, expense.expenseName)} title='Delete Expense'>
                                        <img src={whiteCrossIcon} height='35' width='35'></img>
                                    </div>
                                </div>
                            </li>)}
                    </ul>
                </div>
            </div>
        </> : <>
            <ExpenseTab trigger={openPop} setTrigger={setOpenPop}/>
                <button onClick={() => setOpenPop(true)}>Add an Expense</button>
                <div className='mainPageContainer'>
                    <div className='expenseListContainer'>
                        <img src={emptyWallet} height='300' width='300'></img> <br></br>
                        <span className='emptyListText'>Uh Oh! Looks like the list is empty <br></br> Click <span className='emptyListAdd' onClick={() => setOpenPop(true)}>Add Expense</span> to start the list!</span>
                    </div>
                </div>
        </>
    )
}

export default MainPage