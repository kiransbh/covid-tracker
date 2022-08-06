import React from 'react';

// Router package
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Home from '../Components/Home/HomeObj';
import Detailed from '../Components/Detailed/Detailed';

function Router() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={ <Home /> } />
            <Route exact path='/detailed/:id' element={ <Detailed /> } />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router