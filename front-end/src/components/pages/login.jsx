import React, { useState } from "react";
import Button from "../button/button default";

const Login = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    function handleSubmit(event){
        
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="username" placeholder="Enter your username"
                        onChange={e => setUsername(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password"
                        onChange={e => setPassword(e.target.value)}></input>    
                    </div>
                    <Button label="login"
                            color="blue"/>
                </form>
            </div>
        </div>
    )
}

export default Login;