import React from 'react';
import thebraderyLogo from '../../image/thebraderyLogo.png'; // Assurez-vous de spécifier le bon chemin vers votre image.

function Imagelogo() {
  const imageSize = {
    width: '40px', // Remplacez par la largeur souhaitée
    height: '40px', // Remplacez par la hauteur souhaitée
    marginLeft: '20px'
  };

  return (
    <div>
      <img src={thebraderyLogo} alt="Image personnalisée" style={imageSize} />
    </div>
  );
}

export default Imagelogo;