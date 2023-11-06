import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/login";

const AppPaiementRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppPaiementRouter;