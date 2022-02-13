import logo from './logo.svg';
import './App.css';
import './component/componentStyle.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import FormComponent from './component/FormComponent'
import { useContext, useEffect, useReducer, useState } from 'react';
import DataContext from './data/DataContext';
import ReportContext from './component/ReportContext';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Title = () => <h1 className="header" > Todo List </h1>
const Description = () => <h3 className="header"> รายการที่ต้องทำ </h3>
const Transaction = (props) => {
    const { items } = props
    return (
        <div>
            <ul className="orderList">
                {items.map((element) => {
                    return <Item {...element} key={element.id}></Item>
                })}
            </ul>
        </div>
    )
}

const Item = ({ name, status }) => {
    const isEmpty = name === "" ? "empty" : "notEmpty"
    return <li className={isEmpty}> <p> {name} {isEmpty} </p><p>{status}</p></li>
}

Item.propTypes = {
    name: PropTypes.string,
    status: PropTypes.number.isRequired
}

function App() {
    // const initialState = [
    //     { name: 'TodoList1',status: 0},
    //     { name: 'TodoList2',status: 0},
    //     { name: 'TodoList3',status: 0}
    // ]

    const [items, setItems] = useState([])
    const [reportConcat, setReportConcat] = useState('')
    const onAddNewItem = (newItem) => {
        setItems((prevItem) => {

            return [newItem, ...prevItem]
        })
    }

    useEffect(() => {
        const names = items.map(items => items.name)
        const total = names.reduce((total, element) => total.concat(',', element), '')
        setReportConcat(total);
    }, [items, reportConcat])

    //Reducer useState
    // const [showReport, setShowReport] = useState(false)
    // const reducer = (state, action) => {
    //     switch (action.type) {
    //         case "SHOW" :
    //             return setShowReport(true)
    //         case "HIDE" : 
    //             return setShowReport(false)
    //     }
    // }

    // const [result,dispatch] = useReducer(reducer,showReport)

    return (
        <DataContext.Provider value={{ Todo: reportConcat, status: 0 }}>
            <div className="container">
                <Title />
                <Description />
                <Router>
                    <div>
                        <ul className="horizontal-menu">
                            <li>
                                <Link to="/">Report Context</Link>
                            </li>
                            <li>
                                <Link to="/transactions">Transactions</Link>
                            </li>
                        </ul>
                        <Routes>
                            <Route exact path="/" element={<ReportContext />} />
                            <Route exact path="/transactions" element={<FormComponent onAddItem={onAddNewItem} />} />
                        </Routes>

                        <Transaction items={items} />
                    </div>
                </Router>
                {/* {showReport && <ReportContext/>} */}
                {/* <div align="center">
                    <button onClick={()=>dispatch({type:"SHOW"})}>Show</button>
                    <button onClick={()=>dispatch({type:"HIDE"})}>Hide</button>
                </div> */}
            </div>
        </DataContext.Provider>

    );
}
export default App; 