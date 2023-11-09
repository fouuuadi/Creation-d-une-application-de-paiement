import React, { useState } from 'react';
import Footer from "../../layout/footer/footer";
import HeaderPanier from "../../layout/header/header_panier/headerPanier";


const Panier = () => {
  const [panier, setPanier] = useState([]);

  const AddPanier = (produit) => {
    setPanier([...panier, produit]);
  };

  return (
    <div>
        <HeaderPanier/>
            <h1>Votre Panier</h1>
            <ul>
                {panier.map((produit) => (
                <li key={produit.id}>
                    <p>{produit.name}</p>
                    <p>Prix : {produit.price} €</p>
                    {/* Ajoutez d'autres détails du produit si nécessaire */}
                </li>
                ))}
            </ul>
        <Footer/>
    </div>
  );
};

export default Panier;