import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Uint8Array(6))
    const [mostvotes, setNew] = useState()

    const giveVote = () => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
        let i = copy.indexOf(Math.max(...copy));
        setNew(anecdotes[i])

    }
    return (
        <div>
            <Header text="Anecdote if the day" />
            {props.anecdotes[selected]}
            <br />
            has {points[selected]} votes
            <br />
            <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
            <Button handleClick={() => giveVote()} text="vote" />
            <Header text="Anecdote with most votes" />
            <MostVotes mostvotes = {mostvotes} totalvotes = {Math.max(...points)} />
        </div>
    )
}
const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)
const Header = ({text}) => (
    <h3>{text}</h3>
)
const MostVotes = (props) => {
    if (props.mostvotes !== 0)
    return (
        <div>
        {props.mostvotes} <br></br>
        has {props.totalvotes} votes
        </div>
    )
    return (
        <div>
        no votes yet!
        </div>
    )

}
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
