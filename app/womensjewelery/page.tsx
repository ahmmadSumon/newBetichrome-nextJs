"use client"
import React, { useEffect, useState } from 'react';
import Mens from '../component/Mens';
import Jwelery from '../component/Jwelery';

async function getData() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const Page = () => {
  const [jeweleryProducts, setJeweleryProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const products = await getData();
        const jeweleryProducts = products.filter(product => product.category === "jewelery");
        setJeweleryProducts(jeweleryProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='mt-20'>
      <div className='py-10'>
        <Jwelery products={jeweleryProducts} />
      </div>
    </div>
  );
};

export default Page;
