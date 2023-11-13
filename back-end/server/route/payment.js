const express = require("express");
const router = new express.Router();
const connection = require("../db");


router.post("/createOrder", async (req, res) => {
  try {
      const { total_price, order_date } = req.body;

      const insertOrderQuery = "INSERT INTO Command (total_price, order_date) VALUES (?, ?)";
      const values = [total_price, order_date];

      connection.query(insertOrderQuery, values, (error, results) => {
          if (error) {
              console.error(error);
              res.status(500).send("Erreur lors de l'insertion de la commande dans la base de données.");
          } else {
              res.status(200).json({ message: "Commande enregistrée avec succès" });
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
