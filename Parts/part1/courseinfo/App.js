const Header = (props) => {
    return (
        <>
            <h1>
                Course name: {props.name}
            </h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.name}, Number of exercises= {props.exercises}
            </p>
        </>
    )
}

const Content = (props) => {
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    return (
        <>
            <Part name={part1} exercises={exercises1} />
            <Part name={part2} exercises={exercises2} />
            <Part name={part3} exercises={exercises3} />
        </>
    )
}

const Total = (props) => {
    return (
        <>
            <p>
                Total number of exercises: {props.total}
            </p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    // const part1 = 'Fundamentals of React'
    const exercises1 = 10
    // const part2 = 'Using props to pass data'
    const exercises2 = 7
    // const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header name={course} />
            <Content />
            <Total total={exercises1 + exercises2 + exercises3} />
            {/* <p>Number of exercises {exercises1 + exercises2 + exercises3}</p> */}
        </div>
    )
}

export default App