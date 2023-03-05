import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const LoginHandler = (props) => {

    const [login, setLogin] = useState(true);

    return (
        <div className="login-handler">
            {login ? (<Login setUser={props.setUser} setLogin={setLogin}/>) : (
            <Register setUser={props.setUser} setLogin={setLogin} />)}
        </div>
    );
}
 
export default LoginHandler;