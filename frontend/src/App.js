import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';

import Context from './Context';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/userSlice';


function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.Current_User.url, {
        method: SummaryApi.Current_User.method,
        credentials: 'include'
      });

      const dataApi = await dataResponse.json();
      console.log("userdata", dataApi)


      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
        console.log("apidata", dataApi.data)
      }
      console.log("data-api", dataApi);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  });

  return (


    <Context.Provider value={{ fetchUserDetails }}>
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>


  );
}

export default App;
