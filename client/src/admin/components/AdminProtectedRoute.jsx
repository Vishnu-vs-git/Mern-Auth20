import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); // null = loading, true = authed, false = unauth
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/admin/validate', { withCredentials: true });
        if (res.data.authenticated) {
          setAuth(true);
        } else {
          setAuth(false);
          navigate('/admin/login', { replace: true });
        }
      } catch (error) {
        console.log('Authentication failed', error);
        setAuth(false);
        navigate('/admin/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  if (auth === null) {
   
    return <div className="text-center mt-10 text-gray-500">Checking Authentication...</div>;
  }

  return children;
};

export default AdminProtectedRoute;
