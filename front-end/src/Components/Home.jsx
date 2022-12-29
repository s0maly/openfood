import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css"


function Home() {
  
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [openFoodFactUrl, setOpenFoodFactUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

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
        setProductName(response.data.product.product_name);
        setDescription(response.data.product.ingredients_text);
        setOpenFoodFactUrl(response.data.product.url);
        setImageUrl(response.data.product.image_front_url);
        setBarcode(response.data.product._id);
      })
      .catch((error) => {
        // Mettre à jour le state avec l'erreur
        setError(error);
      });
  }

  // sauvegarder le produit dans la base de données
  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      code: barcode,
      name: productName,
      description: description,
      url : openFoodFactUrl,
      image_url: imageUrl
    }
    axios.post('http://localhost:3000/products/', product)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const ProductCard = ({ product }) => {
    // Afficher les informations du produit dans une carte
    return (
      <div className="container">
        <h2>Product info</h2>
        <div className="card">
          <div className="card-header">
            <img src={product.image_front_url} alt="hover" />
            <button className="btn btn-primary">Ajouter au panier</button>
          </div>
          <div className="card-body">
            <span className='tag tag-teal'>{product.product_name}</span>
            <h4>{product.brands}</h4>
            <span>Energy : {product.nutriments.energy_serving} calories</span>
            <span>Nutri-Score : {product.nutriscore_grade}</span>
            <div>
              <span>Stores :</span>
              <p>{product.stores}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   console.log('home page not authenticated');
  //   setTimeout(() => navigate('/login'), 0);
  // } else {
  //   console.log('home page authenticated');
  // }




  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <label>
          Code barre :
          <input type="text" value={barcode} onChange={handleChange} />
        </label>
        <button type="submit">Rechercher</button>
        {console.log(product)}
        {error && <p>{error.message}</p>}
        {product && <ProductCard product={product} />}
      </form>
    </div>
    
  );

}

export default Home;
