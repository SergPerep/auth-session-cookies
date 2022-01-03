const Button = props => {
    const { design, onClick, disabled } = props;
    return <button
        className={`btn btn-${design}`}
        disabled={disabled}
        onClick={onClick}>
        {props.children}
    </button>
}

export default Button;