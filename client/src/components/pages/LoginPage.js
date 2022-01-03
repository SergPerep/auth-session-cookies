import Input from "../Input";

const LoginPage = () => {
    return (
        <>
        <h1>LoginPage</h1>
        <form>
            <Input 
            label="Name"
            type="text"
            placeholder="Ivan"
            value="Ivan"
            />
        </form>
        </>
    )
}

export default LoginPage;