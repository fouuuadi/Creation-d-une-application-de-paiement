import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Produits from "../pages/products";

const AppPaiementRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/produits" element={<Produits/>}/>
                <Route path="/connexion" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppPaiementRouter;