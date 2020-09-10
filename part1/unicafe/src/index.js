import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => (
  <button onClick = {props.handleClick}>{props.text}</button>
)

const Statistic = (props) => {
  return(
    <>
    <td>{props.text}</td> 
    <td>{props.value}</td>
    </>
  )
}

const Statistics = (props) => {
  
  const all = props.good + props.bad + props.neutral
  const average = (props.good - props.bad) / all
  const positive = (props.good) / all

  if(props.good === 0 && props.bad === 0 && props.neutral === 0){
    return(
      <p>No Feedback Given</p>
    )
  }

  return(
    <>
      <table>
        <tbody>
        <tr><Statistic text="good" value ={props.good} /></tr>
        <tr><Statistic text="neutral" value ={props.neutral} /></tr>
        <tr><Statistic text="bad" value = {props.bad} /></tr>
        <tr><Statistic text="all" value = {all} /></tr>
        <tr><Statistic text="average" value = {average} /></tr>
        <tr><Statistic text="positive" value = {positive} /></tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick = {() => {setGood(good + 1)}}  text={"Good"} />
      <Button handleClick = {() => {setNeutral(neutral + 1)} } text={"Neutral"} />
      <Button handleClick = {() => {setBad(bad + 1)}} text={"Bad"} />
      <h1>Statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)