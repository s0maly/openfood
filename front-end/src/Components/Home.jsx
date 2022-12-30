import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css"


function Home() {

  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [openFoodFactUrl, setOpenFoodFactUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  }

 
  const handleSubmit = (event) => {
    event.preventDefault();


    // Faire une requête à l'API openFoodFacts avec la requête
    axios.get(`https://fr.world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&json=1`)
      .then((response) => {
        console.log('response', response.data.products)
        // Mettre à jour le state avec les résultats de la requête
        setResults(response.data.products);

      })
      .catch((error) => {
        // Mettre à jour le state avec l'erreur
        setError(error);
      });
  }




  // ajouter la categorie dans la base de données
  const handleAddCategory = (e) => {
    e.preventDefault();
    const categories = {
      name: categoryName,
      description: categoryDescription,
    }
    axios.post('http://localhost:8000/categories/', categories)
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
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <img src={product.image_thumb_url} alt="hover" />
          </div>
          <button className="btn btn-warning" onClick={handleAddProduct} data-id={product.code}>Ajouter au favoris</button>
          <div className="card-body">
            <span className='tag tag-teal'>{product.product_name}</span>
            <h4>{product.brands}</h4>
            <span><strong>Ingredients :</strong><br />{product.ingredients_text}</span>
            <span><br /><strong>Energy : </strong>{product.nutriments.energy_serving} calories</span>
            <span><strong>Nutri-Score : </strong>{product.nutriscore_grade}</span>
            <span><strong>Magasins :</strong></span>
            <p>{product.stores_tags[0]}</p>
            <button className="btn btn-primary" onClick={() => navigate(`/product/${product._id}`)}>Voir plus</button>
          </div>
        </div>
      </div>
    );
  }




  const handleAddProduct = (event) => {
    let code = event.target.dataset.id;
    event.preventDefault();

    axios.get(`https://fr.world.openfoodfacts.org/api/v0/product/${code}.json`)
      .then((response) => {
        // Mettre à jour le state avec le produit retourné par l'API
        setProduct(response.data.product);
        console.log('token init',localStorage.getItem('token'));

        setToken(localStorage.getItem('token').toString());
        
        console.log('token string : ',token);

        setProductName(response.data.product.product_name);
        setDescription(response.data.product.ingredients_text);
        setOpenFoodFactUrl(response.data.product.link);
        setImageUrl(response.data.product.image_front_url);
        setBarcode(response.data.product.code);
    
        // sauvegarder le produit dans la base de données
        const products = {
          name: productName,
          description: description,
          code: barcode,
          url: openFoodFactUrl,
          image_url: imageUrl,
          token: token,
          category: 'hello'
        }
        axios.post('http://localhost:8000/products/', products)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // Mettre à jour le state avec l'erreur
        setError(error);
      });
  }

  return (
    <div className="container">
      <form className='form-inline' onSubmit={handleSubmit}>
        <div >
          <label >
            <input className='form-control mr-sm-2' type="text" value={query} onChange={handleChange} placeholder='Recherche' />
          </label>
          <button type="submit" className='btn btn-secondary'>Rechercher</button>
        </div>
      </form>

      {error && <p>{error.message}</p>}
      {results.length > 0 && (
        <div className='container-fluid d-flex justify-content-center'>
          <div className='row'>
            {results.map((product) => (
              <ProductCard key={product.code} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>

  );

}

export default Home;
