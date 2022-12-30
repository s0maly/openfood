import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const navigate = useNavigate();
    

// récupérer la liste des produits de l'utilisateur
const handleGetProducts = (e) => {
    e.preventDefault();
    const products = {
        token: localStorage.getItem('token')
      }
    axios.get('http://localhost:8000/products', {params:products})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
        
}


        


    return (
        <div>
        <h1>User</h1>
        <button onClick={handleGetProducts}>Get products</button>
        </div>
    );
    }

export default User;