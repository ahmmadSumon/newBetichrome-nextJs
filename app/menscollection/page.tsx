"use client"
import React, { useEffect, useState } from 'react';
import Mens from '../component/Mens';

async function getData() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const Page = () => {
  const [mensClothingProducts, setMensClothingProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getData();
        const mensProducts = products.filter(product => product.category === "men's clothing");
        setMensClothingProducts(mensProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='mt-20'>
      <div className='py-10'>
        <Mens products={mensClothingProducts} />
      </div>
    </div>
  );
};

export default Page;
