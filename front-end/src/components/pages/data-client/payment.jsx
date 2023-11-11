import React, { useState } from "react";
import Button from "../../button/button default";
import HeaderPayment from "../../layout/header/header_paiement/headerPayment";

const Payment = () => {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    function handleSubmit(event){
        
    }

    return (
        <div>
            <HeaderPayment/>
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
                    <Button label="Commander"
                            color="blue"/>
                </form>
            </div>
        </div>
    )
}

export default Payment;