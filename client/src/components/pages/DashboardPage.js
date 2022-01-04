import Button from "../Button";

const DashboardPage = () => {
    return (
        <>
            <h1>Dashboard</h1>
            <p>Hello, user</p>
            <div className="dashboard">
                This is your dashboard
            </div>
            <Button>Log out</Button>
        </>
    )
}

export default DashboardPage;