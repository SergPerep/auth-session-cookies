import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Button from "../Button";
import Card from "../Card";

const DashboardPage = () => {
    const { logOut } = useContext(AuthContext);
    const cards = [
        {
            title: "Bloodsuckers",
            desc: "I wanna kiss your neck… with my teeth… and suck a little…"
        }, {
            title: "Bad wolf",
            desc: "What does the wolf say? The wolf says that life itself is meaningless and you better call your mum."
        }, {
            title: "Full chest",
            desc: "I feel strangely overwhelmed with sorrow, death and pancakes."
        }, {
            title: "Potential lover",
            desc: "Look in the eyes of this ugly duck and then smooch it like there’s no tomorrow"
        }, {
            title: "Love potion",
            desc: "Love is when your spirit is so big that has to possess an additional body."
        },
        {
            title: "Chicken soup",
            desc: "I’ve made you chicken soup but I afraid it might be too spicy for you."
        }
    ];
    return (
            <main>
                <h1>Dashboard</h1>
                <div className="card-list">{cards.map((card, index) => <Card key={index} title={card.title}>{card.desc}</Card>)}</div>
                <Button onClick={logOut}>Log out</Button>
            </main>
    )
}

export default DashboardPage;