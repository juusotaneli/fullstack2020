import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header header="give feedback" />
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />
            <Header header="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}
const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)
const Header = ({ header }) => (
    <h1>
        {header}
    </h1>

)
const Statistics = (props) => {

    if (props.good + props.neutral + props.bad === 0)
        return (
            <>
                No feedback given
            </>
        )
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={props.good} />
                <StatisticLine text="neutral" value={props.neutral} />
                <StatisticLine text="bad" value={props.bad} />
                <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
                <StatisticLine text="average" value={(props.good * 1 + props.bad * -1) / (props.good + props.neutral + props.bad)} />
                <StatisticLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100} />
            </tbody>
        </table>
    )
}
const StatisticLine = (props) => {

    if (props.text === "positive")
        return (
            <tr>
                <td>
                    {props.text}
                </td>
                <td>
                    {props.value} %
                </td>
            </tr>
        )
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}
            </td>
        </tr>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
