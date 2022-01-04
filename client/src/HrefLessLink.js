const HrefLessLink = props => {
    const { onClick } = props;
    return <button className="link" onClick={onClick}>
        {props.children}
    </button>
}

export default HrefLessLink;