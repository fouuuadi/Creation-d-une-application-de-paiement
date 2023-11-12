import React, { useState } from "react";
import Button from "../../button/button default";
import HeaderPayment from "../../layout/header/header_paiement/headerPayment";


const Payment = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expirationDate: '',
        cvv: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique pour traiter le paiement avec les données du formulaire
        console.log('Données du formulaire soumises :', formData);
    };

    return (

        <div>
            <div>
                <HeaderPayment/>
            </div>
            <h2>Formulaire de paiement par carte de crédit</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Numéro de carte de crédit</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                    />
                </div>
                <div>
                    <label>Titulaire de la carte</label>
                    <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label>Date d'expiration</label>
                    <input
                        type="text"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                    />
                </div>
                <div>
                    <label>CVV</label>
                    <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                    />
                </div>
                <button type="submit">Payer</button>
            </form>
        </div>
    );
};

export default Payment;