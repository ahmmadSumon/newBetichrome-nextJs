"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../store/page';
interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface Props {
  products: ProductProps[];
}

const Product = ({ products }: Props) => {
  const [imageLoadError, setImageLoadError] = useState<number[]>([]);
  const [showFullDescription, setShowFullDescription] = useState<{ [key: number]: boolean }>({});

  const addItemToCart = useCartStore(state => state.addItem);
  const handleAddToCart = (item: ProductProps) => {
    addItemToCart(item);
  };
  const handleImageError = (productId: number) => {
    setImageLoadError(prevState => [...prevState, productId]);
  };

  const handleToggleDescription = (productId: number) => {
    setShowFullDescription(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const truncateDescription = (desc: string) => {
    const maxLength = 100;
    return desc.length > maxLength ? `${desc.slice(0, maxLength)}...` : desc;
  };

  return (
    <>
    <div className='text-center mt-16'>

    <h1 className='text-5xl' >All caterories product</h1>
    </div>
    <div className="  grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      
      {products.map((item) => (
        
          <div className='bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm'>
            <div className='mb-4'>
              {imageLoadError.includes(item.id) ? (
                <img src="/path/to/fallback-image.png" alt="Fallback" />
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg"
                  style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">
              {showFullDescription[item.id] ? item.description : truncateDescription(item.description)}
              <span className="text-blue-500 cursor-pointer" onClick={() => handleToggleDescription(item.id)}>
                {showFullDescription[item.id] ? ' Read less' : ' Read more'}
              </span>
            </p>
            <p className="text-lg font-bold text-indigo-600 mb-4">
              Price: ${item.price ? item.price.toFixed(2) : "N/A"}
            </p>
            <div className="flex space-x-4">
            <Link href={{pathname:"/singleproduct", query:{id: item?.id}}} key={`${item.id}-link1`}>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white 
font-semibold py-2 px-4 rounded"
       
        >
          View Details
        </button>
        </Link>
        <Link  href={{pathname:"/singleproduct", query:{id: item?.id}}} key={`${item.id}-link2`}>
        <button
       
          className="bg-green-500 hover:bg-green-600 text-white 
font-semibold py-2 px-4 rounded"
         
        >
          Buy Now
        </button>
        </Link>
      </div>
          </div>
        
      ))}
      
    </div>
    </>
  );
};

export default Product;
