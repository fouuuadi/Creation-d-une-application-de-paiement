import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../button/button default';
import HeaderProduit from "../../layout/header/header_produit/headerProduit"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')))

  useEffect(() => {
    //requête Post pour récupérer les produits depuis la Bdd
    axios.post('http://localhost:3001/thebradery/allProducts')
      .then((response) => {
        setProducts(response.data)
        //console.log(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des produits :', error);
      });
  }, []);

  useEffect(() => {
    if (basket === null) {
      localStorage.setItem('basket', JSON.stringify([]))
    }
  })

  const addInBasket = (produit) => {
    const alreadyIn = basket.find(p => p.id === produit.id); // si le produit que nous voulons rajouter n'est pas deja dans le panier, alreadyIn sera undefined
    if (alreadyIn) { // ici, le produit est déjà dans le panier, nous incrémentons sa quantité
      for (const p of basket) {
        if (p.id === produit.id) {
          p.quantity += 1
        }
      }
      localStorage.setItem("basket", JSON.stringify(basket));
      return setBasket(basket);
    } else { // ici, le produit sera rajouté pour la première fois dans le panier
      basket.push({
        ...produit,
        quantity: 1
      }) // le panier existant + le nouveau produit avec la quantité 1
      localStorage.setItem('basket', JSON.stringify(basket)) // localstorage
      setBasket(basket) // state
    }
  }

  return (
    <div>
      <HeaderProduit />
      <div className='body'>
        <div className='tilte-products'>
          Liste des Produits
        </div>
        <div className='container'>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>Prix : {product.price} €</p>
              <p>Quantité maximale : {product.inventory}</p>
              <Button
                label={
                  <span>
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add
                  </span>
                }
                onClick={() => addInBasket(product)}
                color="green"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;