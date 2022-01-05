import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Button from "../Button";

const DashboardPage = () => {
    const { logOut } = useContext(AuthContext);
    return (
        <>
            <h1>Dashboard</h1>
            <p>Hello, user</p>
            <div className="dashboard">
                This is your dashboard
            </div>
            <Button onClick={logOut}>Log out</Button>
        </>
    )
}

export default DashboardPage;