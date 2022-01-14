import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const LoginPage = props => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const handleChange = event => {
        switch (event.target.name) {
            case "username":
                setUsername(event.target.value)
                break;
            case "password":
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.setUserLoggedIn(true)
        navigate("/")
    }

    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name="username" value={username} onChange={handleChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" value={password} onChange={handleChange}/>
                </div>
                <button>Login!</button>
            </form>
        </>
    )
}

export default LoginPage