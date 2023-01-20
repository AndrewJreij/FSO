import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const StatisticLine = (props) =>
(<>
    <td>{props.text}</td>
    <td>{props.count}</td>
</>
)

const Statistics = (props) => {
    if (props.total === 0) {
        return (
            <div>No feedback given</div>
        )
    }
    return (
        <table>
            <tbody>
                <tr><StatisticLine text='good' count={props.good} /></tr>
                <tr><StatisticLine text='neutral' count={props.neutral} /></tr>
                <tr><StatisticLine text='bad' count={props.bad} /></tr>
                <tr><StatisticLine text='all' count={props.total} /></tr>
                <tr><StatisticLine text='average' count={props.average} /></tr>
                <tr><StatisticLine text='positive' count={props.positive} /></tr>
            </tbody>
        </table>
    )
}



const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    let total = good + bad + neutral
    let average = (good - bad) / total
    let positive = (good / total) * 100

    return (
        <>
            <Header text='give feedback' />
            <Button handleClick={() => setGood(good + 1)} text='good' />
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
            <Button handleClick={() => setBad(bad + 1)} text='bad' />
            <Header text='statistics' />
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive + ' %'} />
        </>
    )
}

export default App