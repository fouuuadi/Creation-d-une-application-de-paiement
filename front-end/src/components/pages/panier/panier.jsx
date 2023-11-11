import React, { useEffect, useState } from 'react';
import Footer from "../../layout/footer/footer";
import HeaderPanier from "../../layout/header/header_panier/headerPanier";

const Panier = () => {

  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')))

  const basketRemove = (produit) => {
    if (produit.quantity > 1) {
      localStorage.setItem('basket', JSON.stringify(basket.map(p => p.id === produit.id ? { ...p, quantity: p.quantity - 1 } : p)))
      return setBasket(basket.map(p => p.id === produit.id ? { ...p, quantity: (p.quantity - 1) } : p))

    } else {
      localStorage.setItem('basket', JSON.stringify(basket.filter(b => b.id !== produit.id)))
      setBasket(basket.filter(b => b.id !== produit.id))

    }
  }

  return (
    <div>
      <HeaderPanier />
      <div className='body'>
        <h1>Votre Panier</h1>
        {basket.map((produit) => (
          <div key={produit.id} className='cart-container'>
            <div className='cart'>
              <div>
                <div>{produit.name}  x{produit.quantity}</div>
                <div>Prix : {produit.price} €</div>
                {/* Ajoutez d'autres détails du produit si nécessaire */}
              </div>
              <div className='trash' onClick={() => basketRemove(produit)}>
                <img color='white' width={18} height={18} src='/trash.png' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Panier;
