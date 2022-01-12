const Card = props => {
    const { title } = props;
    return <div className="card">
        <div className="card-title">{title}</div>
        <div className="card-desc">{props.children}</div>
    </div>
}

export default Card;