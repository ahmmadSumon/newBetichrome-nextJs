"use client"
import React, { useEffect, useState } from 'react';
import Mens from '../component/Mens';
import Electronics from '../component/Electronics';

async function getData() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const Page = () => {
  const [electronicsProduct, setElectronicsProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getData();
        const electronicsProduct = products.filter(product => product.category === "electronics");
        setElectronicsProduct(electronicsProduct);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='mt-20'>
      <div className='py-10'>
        <Electronics products={electronicsProduct} />
      </div>
    </div>
  );
};

export default Page;
