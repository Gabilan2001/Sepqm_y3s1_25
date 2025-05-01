// // pages/AdminDashboard.js
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

// const AdminDashboard = () => {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [currentOffer, setCurrentOffer] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     discount: '',
//     validUntil: '',
//     imageUrl: '',
//   });

//   useEffect(() => {
//     const fetchOffers = async () => {
//       try {
//         const { data } = await axios.get('/api/offers');
//         setOffers(data);
//       } catch (error) {
//         console.error('Error fetching offers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOffers();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = JSON.parse(localStorage.getItem('userInfo')).token;
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       if (currentOffer) {
//         // Update existing offer
//         const { data } = await axios.put(
//           `/api/offers/${currentOffer._id}`,
//           formData,
//           config
//         );
//         setOffers(offers.map((offer) =>
//           offer._id === currentOffer._id ? data : offer
//         ));
//       } else {
//         // Create new offer
//         const { data } = await axios.post('/api/offers', formData, config);
//         setOffers([...offers, data]);
//       }

//       setShowModal(false);
//       setCurrentOffer(null);
//       setFormData({
//         title: '',
//         description: '',
//         discount: '',
//         validUntil: '',
//         imageUrl: '',
//       });
//     } catch (error) {
//       console.error('Error saving offer:', error);
//     }
//   };

//   const handleEdit = (offer) => {
//     setCurrentOffer(offer);
//     setFormData({
//       title: offer.title,
//       description: offer.description,
//       discount: offer.discount,
//       validUntil: offer.validUntil.split('T')[0],
//       imageUrl: offer.imageUrl,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const token = JSON.parse(localStorage.getItem('userInfo')).token;
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       await axios.delete(`/api/offers/${id}`, config);
//       setOffers(offers.filter((offer) => offer._id !== id));
//     } catch (error) {
//       console.error('Error deleting offer:', error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center p-8">Loading offers...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
//         >
//           <FiPlus className="mr-2" /> Add Offer
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {offers.map((offer) => (
//           <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={offer.imageUrl}
//               alt={offer.title}
//               className="w-full h-48 object-cover"
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/300';
//               }}
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
//               <p className="text-gray-600 mb-3">{offer.description}</p>
//               <div className="flex justify-between items-center mb-3">
//                 <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
//                   {offer.discount}% OFF
//                 </span>
//                 <span className="text-sm text-gray-500">
//                   Valid until: {new Date(offer.validUntil).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => handleEdit(offer)}
//                   className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
//                 >
//                   <FiEdit className="mr-1" /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(offer._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
//                 >
//                   <FiTrash2 className="mr-1" /> Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-4">
//                 {currentOffer ? 'Edit Offer' : 'Add New Offer'}
//               </h2>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     rows="3"
//                     required
//                   ></textarea>
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Discount (%)</label>
//                   <input
//                     type="number"
//                     name="discount"
//                     value={formData.discount}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     min="1"
//                     max="100"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Valid Until</label>
//                   <input
//                     type="date"
//                     name="validUntil"
//                     value={formData.validUntil}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2">Image URL</label>
//                   <input
//                     type="url"
//                     name="imageUrl"
//                     value={formData.imageUrl}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded"
//                     required
//                   />
//                 </div>
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowModal(false);
//                       setCurrentOffer(null);
//                     }}
//                     className="px-4 py-2 bg-gray-300 rounded"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-blue-600 text-white rounded"
//                   >
//                     {currentOffer ? 'Update' : 'Create'} Offer
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiPlus, FiEdit, FiTrash2, FiTag } from 'react-icons/fi';

const AdminDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        const { data } = await axios.get('http://localhost:5000/api/offers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      if (currentOffer) {
        const { data } = await axios.put(
          `http://localhost:5000/api/offers/${currentOffer._id}`,
          formData,
          config
        );
        setOffers(offers.map(offer => offer._id === currentOffer._id ? data : offer));
      } else {
        const { data } = await axios.post(
          'http://localhost:5000/api/offers',
          formData,
          config
        );
        setOffers([...offers, data]);
      }

      setShowModal(false);
      setCurrentOffer(null);
      setFormData({
        title: '',
        description: '',
        discount: '',
        validUntil: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const handleEdit = (offer) => {
    setCurrentOffer(offer);
    setFormData({
      title: offer.title,
      description: offer.description,
      discount: offer.discount,
      validUntil: offer.validUntil.split('T')[0],
      imageUrl: offer.imageUrl,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      await axios.delete(`http://localhost:5000/api/offers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOffers(offers.filter(offer => offer._id !== id));
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading offers...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <FiPlus className="mr-2" /> Add Offer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => (
          <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={offer.imageUrl} 
              alt={offer.title} 
              className="w-full h-48 object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-3">{offer.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                  {offer.discount}% OFF
                </span>
                <span className="text-sm text-gray-500">
                  Valid until: {new Date(offer.validUntil).toLocaleDateString()}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(offer)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <FiEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                >
                  <FiTrash2 className="mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {currentOffer ? 'Edit Offer' : 'Add New Offer'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Valid Until</label>
                  <input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setCurrentOffer(null);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    {currentOffer ? 'Update' : 'Create'} Offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;