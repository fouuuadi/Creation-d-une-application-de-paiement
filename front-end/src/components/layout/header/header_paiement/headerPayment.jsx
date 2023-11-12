import React from "react";
import { Link } from "react-router-dom";
import Imagelogo from "../../../image_comp/imageLogo"

function HeaderPayment() {
  return (
    <header className="header">
      <div className="logo">
        <Imagelogo />
      </div>
      <h1 className="title">The Bradery</h1>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/panier">Panier</Link>
        <Link to="/produits">Produits</Link>
        <Link to="/login">Connexion</Link>
      </nav>
    </header>
  );
}

export default HeaderPayment;