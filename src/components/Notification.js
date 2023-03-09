import '../index.css'

const Notification = ({ message, className }) => {
    if (!message) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}

export default Notification