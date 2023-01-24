const Filter = ({ text, inputValue, inputOnChange }) => {
    return (
        <>
            {text}: <input
                value={inputValue}
                onChange={inputOnChange}
            />
        </>
    )
}



export default Filter