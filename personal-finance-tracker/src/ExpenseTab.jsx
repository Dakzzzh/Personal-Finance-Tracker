import { useState, useEffect } from 'react'
import crossIcon from './assets/crossIcon.png'
import './ExpenseTab.css'

function ExpenseTab(props){
    const [form, setForm] = useState();

    const handleInput = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8080/expenseAdd', {
            method:'POST',
            body:JSON.stringify(form),
            headers:{
                'Content-Type':'application/json'
            }
        })

        const data = await response.json();
        console.log(data)
        props.setTrigger(false)
    }

    return(props.trigger ? 
        <>
            <div className='expenseTabContainer'>
                <img src={crossIcon} height='35' width='35' className='closeIcon' onClick={() => props.setTrigger(false)}></img>
                <span className='expenseAddTitle'>Add an Expense...</span>
                <form onSubmit={handleSubmit} className='expenseAddContainer' autoComplete='off'>
                    <input type="text" placeholder="Enter Expense Name..." name="expenseName" onChange={handleInput}></input>
                    <input type="number" placeholder="Enter Expense Amount..." name="expenseAmount" onChange={handleInput}></input>
                    <select name="expenseType" onChange={handleInput}>
                        <option value="">Select Expense Type</option>
                        <option value="Food">Food</option>
                        <option value="Home">Home</option>
                        <option value="Grocery">Grocery</option>
                    </select>
                    <input type="submit" value="Add Expense" className='submitBtn'></input>
                </form>
            </div>
            
        </> : ""
    )

}

export default ExpenseTab