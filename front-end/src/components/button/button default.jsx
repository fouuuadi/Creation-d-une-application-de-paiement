import React from "react";

const Button = ({ label, onClick, color }) => {
    return (<button
        style={{ backgroundColor: color }}
        onClick={onClick}
    >{label}</button>)
}

export default Button;