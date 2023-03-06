import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const hideWhenVisibile = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <div>
            <div style={hideWhenVisibile}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )

}

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable