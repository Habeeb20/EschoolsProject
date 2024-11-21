import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Visitor = () => {
  const [stats, setStats] = useState(null);


  const getOrCreateId = (key) => {
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID(); 
      localStorage.setItem(key, id);
    }
    return id;
  };


  const userId = getOrCreateId('userId'); 
  const sessionId = getOrCreateId('sessionId'); 


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APIV}/initialize`);
        setStats(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);


  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_APIV}/visit`, { userId });
        console.log('Visit count updated.');
      } catch (error) {
        console.error('Error updating visit count:', error);
      }
    };

    trackVisit();
  }, [userId]);

  useEffect(() => {
    const addActiveUser = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_APIV}/activeUser`, { sessionId });
        console.log('Active user added.');
      } catch (error) {
        console.error('Error adding active user:', error.response?.data || error.message);
      }
    };
  
    const removeActiveUser = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_APIV}/inactiveUser`, { sessionId });
        console.log('Active user removed.');
      } catch (error) {
        console.error('Error removing active user:', error.response?.data || error.message);
      }
    };
  
    addActiveUser();
  
    return () => {
      removeActiveUser();
    };
  }, [sessionId]);
  

  useEffect(() => {
    const checkReturningUser = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_APIV}/returningUser`, { userId });
        console.log(response.data);
      } catch (error) {
        console.error('Not a returning user:', error.response?.data || error.message);
      }
    };
  
    checkReturningUser();
  }, [userId]);

  return (
    <div className=" bg-gray-50">
      <div className="max-w-6xl mx-auto p-1">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">Website Stats</h1>
        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Visits</h2>
              <p className="text-3xl font-bold text-green-500">{stats.totalVisits}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Active Users</h2>
              <p className="text-3xl font-bold text-blue-500">{stats.activeUsers}</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Returning Users</h2>
              <p className="text-3xl font-bold text-yellow-500">{stats.returningUsers}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Visitor;
