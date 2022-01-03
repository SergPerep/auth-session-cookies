const Input = props => {
    const {
        name,
        value,
        label,
        placeholder,
        type,
        autoFocusWhenRendered,
        onChange
    } = props;
    return <div className="input-field">
        <label>{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            autoFocus={autoFocusWhenRendered}
            onChange={onChange} />
    </div>
}

export default Input;