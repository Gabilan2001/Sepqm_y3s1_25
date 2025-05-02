// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaCaretDown } from 'react-icons/fa';

// const Header = ({ isLoggedIn, userInfo, onLogout }) => {
//   const [isToggleOpen, setIsToggleOpen] = useState(false);

//   // Close dropdown when clicking elsewhere
//   useEffect(() => {
//     const handleClickOutside = () => {
//       if (isToggleOpen) {
//         setIsToggleOpen(false);
//       }
//     };
    
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [isToggleOpen]);

//   const role = userInfo?.role || 'Guest';
//   const userName = userInfo?.name || 'Guest';

//   return (
//     <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
//       <div className="text-xl font-semibold">IT22060426</div>
      
//       <div className="flex items-center space-x-4">
//         {/* User dropdown toggle */}
//         {isLoggedIn && (
//           <div className="relative">
//             <button 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setIsToggleOpen(!isToggleOpen);
//               }} 
//               className="flex items-center space-x-1"
//             >
//               <span className="font-medium">{userName}</span>
//               <FaCaretDown size={16} className={`transition-transform ${isToggleOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {/* Dropdown menu */}
//             {isToggleOpen && (
//               <div 
//                 className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-3 border-b border-gray-600">
//                   <p className="text-sm font-medium">Signed in as</p>
//                   <p className="text-sm font-semibold truncate">{userName}</p>
//                 </div>
//                 <div className="p-3">
//                   <p className="text-xs text-gray-300">Role: {role}</p>
//                 </div>
//                 <Link 
//                   to="/profile" 
//                   className="block px-3 py-2 text-sm hover:bg-gray-600"
//                   onClick={() => setIsToggleOpen(false)}
//                 >
//                   Your Profile
//                 </Link>
//                 {role === 'Admin' && (
//                   <Link 
//                     to="/admin-dashboard" 
//                     className="block px-3 py-2 text-sm hover:bg-gray-600"
//                     onClick={() => setIsToggleOpen(false)}
//                   >
//                     Admin Dashboard
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     onLogout();
//                     setIsToggleOpen(false);
//                   }}
//                   className="block w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-gray-600"
//                 >
//                   Sign out
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Auth buttons */}
//         {!isLoggedIn && (
//           <div className="flex space-x-3">
//             <Link 
//               to="/login" 
//               className="px-3 py-1.5 rounded text-sm bg-blue-500 hover:bg-blue-600 transition-colors"
//             >
//               Login
//             </Link>
//             <Link 
//               to="/register" 
//               className="px-3 py-1.5 rounded text-sm bg-green-500 hover:bg-green-600 transition-colors"
//             >
//               Register
//             </Link>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCaretDown, FaTag } from 'react-icons/fa';

const Header = ({ isLoggedIn, userInfo, onLogout }) => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => {
      if (isToggleOpen) {
        setIsToggleOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isToggleOpen]);

  const role = userInfo?.role || 'Guest';
  const userName = userInfo?.name || 'Guest';

  return (
    <header className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <div className="text-xl font-semibold">IT22060426</div>
      
      <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsToggleOpen(!isToggleOpen);
              }} 
              className="flex items-center space-x-1"
            >
              <span className="font-medium">{userName}</span>
              <FaCaretDown size={16} className={`transition-transform ${isToggleOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToggleOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-3 border-b border-gray-600">
                  <p className="text-sm font-medium">Signed in as</p>
                  <p className="text-sm font-semibold truncate">{userName}</p>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-300">Role: {role}</p>
                </div>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-sm hover:bg-gray-600 flex items-center"
                  onClick={() => setIsToggleOpen(false)}
                >
                  <FaTag className="mr-2" /> Your Profile
                </Link>
                <Link 
                  to="/offers" 
                  className="block px-3 py-2 text-sm hover:bg-gray-600 flex items-center"
                  onClick={() => setIsToggleOpen(false)}
                >
                  <FaTag className="mr-2" /> View Offers
                </Link>
                {role === 'Admin' && (
                  <Link 
                    to="/admin-dashboard" 
                    className="block px-3 py-2 text-sm hover:bg-gray-600 flex items-center"
                    onClick={() => setIsToggleOpen(false)}
                  >
                    <FaTag className="mr-2" /> Admin Dashboard
                  </Link>
                )}
                {role === 'Admin' && (
                  <Link 
                    to="/product" 
                    className="block px-3 py-2 text-sm hover:bg-gray-600 flex items-center"
                    onClick={() => setIsToggleOpen(false)}
                  >
                    <FaTag className="mr-2" /> Product
                  </Link>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setIsToggleOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-gray-600"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}

        {!isLoggedIn && (
          <div className="flex space-x-3">
            <Link 
              to="/login" 
              className="px-3 py-1.5 rounded text-sm bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="px-3 py-1.5 rounded text-sm bg-green-500 hover:bg-green-600 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;