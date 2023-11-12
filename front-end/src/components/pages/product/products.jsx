import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../button/button default';
import HeaderProduit from "../../layout/header/header_produit/headerProduit"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')))
  const [search, setSearch] = useState('');
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

  //fonction filtrage des produits (Bonus)
  const filteredProduct = products.filter((product) => {
    const productName = product.name.toLowerCase(); //retourne la chaîne de caractères product.name en minuscules
    const query = search.toLowerCase();//retourne le state en minuscules
    return productName.includes(query);//permer de déterminer
  })

  return (
    <div>
      <HeaderProduit />
      <div className='body'>
        <div className='tilte-products'>
          Liste des Produits
        </div>
        <input className='search'
          type='text'
          placeholder='Rechercher des produits'
          value={search}
          onChange={(e) => setSearch(e.target.value)}>
        </input>
        <div className='container'>
          {filteredProduct.map((product) => (
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