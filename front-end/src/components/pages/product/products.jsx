import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../button/button default';
import HeaderProduit from "../../layout/header/header_produit/headerProduit"
import Footer from "../../layout/footer/footer"

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
    const alreadyIn = basket.find(p => p.id === produit.id);
    if (alreadyIn) {
      localStorage.setItem('basket', JSON.stringify(basket.map(p => p.id === produit.id ? { ...p, quantity: p.quantity + 1 } : p)))
      return setBasket(basket.map(p => p.id === produit.id ? { ...p, quantity: (p.quantity + 1) } : p))
    } else {
      localStorage.setItem('basket', JSON.stringify([...basket, { ...produit, quantity: 1 }]))
      setBasket([...basket, { ...produit, quantity: 1 }])
    }
  }

  return (
    <div>
      <HeaderProduit />
      <div className='body'>
        <h1>Liste des Produits</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>Prix : {product.price} €</p>
              <p>Quantité maximale : {product.inventory}</p>
              <Button
                label="Ajoute au panier"
                color="green"
                onClick={() => addInBasket(product)} />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default ProductList;
