import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Produits from "../pages/product/products";
import Payment from "../pages/data-client/payment";
import Basket from "../pages/basket/panier";

const AppPaiementRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/produits" element={<Produits/>}/>
                <Route path="/connexion" element={<Login/>}/>
                <Route path="/panier" element={<Basket/>}/>
                <Route path="/payment" element={<Payment/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default AppPaiementRouter;