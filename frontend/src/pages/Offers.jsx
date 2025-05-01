import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiTag } from 'react-icons/fi';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/offers');
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading offers...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Current Offers</h1>
      
      {offers.length === 0 ? (
        <div className="text-center py-12">
          <FiTag className="mx-auto text-4xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">No current offers available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={offer.imageUrl} 
                  alt={offer.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {offer.discount}% OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{offer.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <FiTag className="mr-1" />
                  <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;