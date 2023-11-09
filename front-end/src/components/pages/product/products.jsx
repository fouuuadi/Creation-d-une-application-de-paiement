import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../button/button default';
import HeaderProduit from "../../layout/header/header_produit/headerProduit"
import Footer from "../../layout/footer/footer"
import Panier from '../panier/panier';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //requête Post pour récupérer les produits depuis la Bdd
    axios.post('http://localhost:3001/thebradery/allProducts')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);

  return (
    <div>
      <HeaderProduit/>
      <h1>Liste des Produits</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>Prix : {product.price} €</p>
            <p>Quantité maximale : {product.inventory}</p>
            <Button label="Ajoute au panier"
                    color="green"
                    onClick={() => Panier.Addpanier(product)}/>
          </li>
        ))}
      </ul>
    <Footer/>
    </div>
  );
}

export default ProductList;