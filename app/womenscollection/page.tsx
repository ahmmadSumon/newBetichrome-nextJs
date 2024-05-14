"use client"
import React, { useEffect, useState } from 'react';
import Womens from "../component/Womens"
async function getData() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const WomensCollection = () => {
  const [womensClothingProducts, setWomensClothingProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getData();
        const womensProducts = products.filter(product => product.category === "women's clothing");
        setWomensClothingProducts(womensProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='mt-20'>
      <div className='py-10'>
      <Womens products={womensClothingProducts} />
      </div>
    </div>
  );
};

export default WomensCollection;
