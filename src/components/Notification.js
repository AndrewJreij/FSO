import '../index.css'

const Notification = ({ message, className }) => {
    if (message === null || message === '') {
        return null
    }

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification