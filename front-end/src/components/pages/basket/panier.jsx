import React, { useEffect, useState } from 'react';
import Footer from "../../layout/footer/footer";
import HeaderPanier from "../../layout/header/header_panier/headerPanier";
import Button from '../../button/button default';

const Basket = () => {

  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')))
  
  const basketRemove = (produit) => {
    if (produit.quantity > 1) {
      for (const p of basket) {
        if (p.id === produit.id) {
          p.quantity -= 1
        }
      }
      localStorage.setItem("basket", JSON.stringify(basket));
      setBasket(basket);
    } else {
      const basketWithoutProduct = basket.filter(b => b.id !== produit.id);
      localStorage.setItem('basket', JSON.stringify(basketWithoutProduct));
      setBasket(basketWithoutProduct);
    }

    window.location.reload();
  }

  return (
    <div>
      <HeaderPanier />
      <div className='body'>
        <div className='title-basket'>
          <h1>Votre Panier</h1>
        </div>
        <div className='button-commande'>
          <Button label="Valider ma commande"
                  color="green"/>
        </div>
        {basket && basket.map((produit) => (
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

export default Basket;