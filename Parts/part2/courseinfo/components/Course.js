const Header = (props) => {
    return (
        <>
            <h1>
                {props.name}
            </h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>
                {props.name} {props.exercises}
            </p>
        </>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(element =>
                <Part key={element.name} name={element.name} exercises={element.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    // let total = 0

    // props.parts.map(element =>
    //     total += element.exercises
    // )

    const total = parts.reduce((sum, exercise) => sum + exercise.exercises, 0)

    return (
        <>
            <p>
                Total of {total} exercises
            </p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            {course.map(course =>
                <div key={course.id}>
                    <Header name={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )}

        </div>
    )

}

export default Course