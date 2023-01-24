import '../index.css'

const Note = ({ note, toggleImportance }) => {
    const label = note.important
        ? 'make not important' : 'make important'

    return (
        <li className='note' key={note.key}>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li>
    )
}

export default Note