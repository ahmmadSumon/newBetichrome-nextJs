"use client"
import React, { useEffect, useState } from 'react';
import Herosection from './component/Herosection';
import Products from './component/Products';
import Mens from './component/Mens';
import Womens from './component/Womens';
import Electronics from './component/Electronics';
import Jwelery from './component/Jwelery';

async function getData() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default function Page() {
  const [products, setProducts] = useState([]);
  const [mensClothingProducts, setMensClothingProducts] = useState([]);
  const [womenClothingProducts, setWomenClothingProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [jweleryProducts, setJweleryProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        setProducts(data);
        setMensClothingProducts(data.filter(product => product.category === "men's clothing"));
        setWomenClothingProducts(data.filter(product => product.category === "women's clothing"));
        setElectronicsProducts(data.filter(product => product.category === "electronics"));
        setJweleryProducts(data.filter(product => product.category === "jewelery"));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className='flex flex-col justify-center items-center mx-auto '>
        <Herosection />
        <div>
          <Womens products={womenClothingProducts} />
        </div>
        <div>
          <Mens products={mensClothingProducts} />
        </div>
        <div>
          <Jwelery products={jweleryProducts} />
        </div>
        <div>
          <Electronics products={electronicsProducts} />
        </div>
        <div className='container'>
          <Products products={products} />
        </div>
      </div>
    </main>
  );
}
