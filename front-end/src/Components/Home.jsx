import React, { useState } from 'react';
import axios from 'axios';
import "./style.css"

const ProductCard = ({ product }) => {
  // Afficher les informations du produit dans une carte
  return (
    <div className="container">
      <h2>Product info</h2>
      <div className="card">
        <div className="card-header">
        <img src={product.image_front_thumb_url} alt="hover" />
        </div>
        <div className="card-body">
          <span className='tag tag-teal'>{product.product_name}</span>
          <h4>{product.brands}</h4>
          <span>Energy : {product.nutriments.energy_serving} calories</span>
          <span>Nutri-Score : {product.nutriscore_grade}</span>
        </div>
      </div>
    </div>
  );
}


const Home = () => {
  
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setBarcode(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Faire une requête à l'API openFoodFacts avec le code barre
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then((response) => {
        // Mettre à jour le state avec le produit retourné par l'API
        setProduct(response.data.product);
      })
      .catch((error) => {
        // Mettre à jour le state avec l'erreur
        setError(error);
      });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <label>
        Code barre :
        <input type="text" value={barcode} onChange={handleChange} />
      </label>
      <button type="submit">Rechercher</button>
      <button>ok</button>
      {console.log(product)}
      {error && <p>{error.message}</p>}
      {product && <ProductCard product={product} />}
    </form>
    </div>
    
  );

}

export default Home;
