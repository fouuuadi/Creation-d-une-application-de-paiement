const express = require("express");
const router = new express.Router();
const connection = require("../db");

const updateProductStock =(basketProducts, results) => {
  
  
  basketProducts.forEach(el => {
    // 1) on recupere le produit qui a pour id => el.id pour avoir son stock actuel
    const selectQuery = 'SELECT * FROM products WHERE id = ?';
    const values = [el.id];
    
    connection.query(selectQuery, values,(err,res) => {
      if (err) {
        console.error(err)
        return results.status(500).send("Erreur lors de la mise a jour du stock");
      }else {
        // 2) une fois qu'on a recupere le produit
        const foundProduct = res[0]
        
        const updateQuery = 'UPDATE products SET inventory = ? WHERE id = ?';

        // on met a jour le stock avec le nombre d'element dans la commande
        const updateValues = [foundProduct.inventory - el.quantity, el.id]
        connection.query(updateQuery, updateValues, (updateErr, updateRes) => {
          if (updateErr) {
            console.error(err)
            return results.status(500).send("Erreur lors de la mise a jour du stock"); 
          }
        })
      }
    })
    
    
  })
  
  
}


const saveInCommandProductsTable = (basketProducts, commandId, res) => {
  // on cree une liste d'elements a sauvegarder dans la table command_product
  const elementsToSave = basketProducts.map(element => {
    return {
      command_id: commandId,
      product_id: element.id,
      unit_price: element.price,
      quantity: element.quantity 
    }
  });

  // pour chacun de ces element, on cree une ligne dans command_product
  elementsToSave.forEach(el => {
    const insertQuery = 'INSERT INTO command_product (command_id, product_id, quantity, unit_price) values (?, ?, ?, ?)';
    
    const values = [el.command_id, el.product_id, el.quantity, el.unit_price];
    
    connection.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur lors de l'insertion du produit dans la commande");
      }
    })
  });
  // si l'execution s'est bien passee, on met a jour le stock (inventory)
  updateProductStock(basketProducts, res);
  res.status(200).json({message: "Commande enregistree avec succes"})

  
}


router.post("/createOrder", async (req, res) => {
  try {
    const basketProducts  = req.body;
    
    let totalPrice = 0.0;
    const today = new Date()
    basketProducts.forEach((e) => {
      totalPrice += e.price;
    })
    const insertOrderQuery = "INSERT INTO Command (total_price, order_date) VALUES (?, ?)";
    const values = [totalPrice, today];
    
    connection.query(insertOrderQuery, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'insertion de la commande dans la base de données.");
      } else {
        
        saveInCommandProductsTable(basketProducts, results.insertId, res)
      }
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Erreur lors de la gestion de la requête.");
  }
});















// router.post("/payment", async (req, res) => {
//   try {
//     // Récupérez les données à partir du corps de la requête (vous devez envoyer les données depuis votre client)
//     const { products, commandId } = req.body;

//     // Commencez une transaction pour vous assurer que les insertions sont atomiques
//     connection.beginTransaction((error) => {
//       if (error) {
//         console.error(error);
//         return connection.rollback(() => {
//           res.status(500).send("Erreur lors du démarrage de la transaction.");
//         });
//       }

//       // Insertion des produits dans la table "Products"
//       const productsQuery = "INSERT INTO Products (name, price, inventory) VALUES ?";
//       const productsValues = products.map((product) => [
//         product.name,
//         product.price,
//         product.inventory,
//       ]);

//       connection.query(productsQuery, [productsValues], (error, productsResults) => {
//         if (error) {
//           console.error(error);
//           return connection.rollback(() => {
//             res.status(500).send("Erreur lors de l'insertion des produits.");
//           });
//         }

//         // Insertion des données dans la table "Command_product"
//         const commandProductQuery =
//           "INSERT INTO Command_product (command_id, product_id, quantity, unit_price) VALUES ?";
//         const commandProductValues = products.map((product) => [
//           commandId,
//           productsResults.insertId, // Utilisez l'ID du produit inséré précédemment
//           product.quantity,
//           product.price,
//         ]);

//         connection.query(
//           commandProductQuery,
//           [commandProductValues],
//           (error, commandProductResults) => {
//             if (error) {
//               console.error(error);
//               return connection.rollback(() => {
//                 res.status(500).send("Erreur lors de l'insertion des données de commande.");
//               });
//             }

//             // Si tout s'est bien passé, validez la transaction
//             connection.commit((commitError) => {
//               if (commitError) {
//                 console.error(commitError);
//                 return connection.rollback(() => {
//                   res.status(500).send("Erreur lors de la validation de la transaction.");
//                 });
//               }

//               res.status(200).json("Données enregistrées avec succès.");
//             });
//           }
//         );
//       });
//     });
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).send("Erreur lors de la gestion de la requête.");
//   }
// });

module.exports = router;
