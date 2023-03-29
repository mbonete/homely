import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import LogInForm from './components/LogInForm';
import Profile from "./components/Profile";
import SignUpForm from './components/SignUpForm'
import HomelyIllustration from "./components/HomelyIllustration/HomelyIllustration";
import {APIProvider} from './hooks/useAPI';
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import AdsList from "./components/AdsList/AdsList";

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <APIProvider>
          <Header />
          <Main>  
            <Routes>
              <Route path='/' element={
                <>
                  <ImageGallery/>
                  <HomelyIllustration/>
                  
                </>
              } />
              <Route path='/advertisements' element={
                <>
                  <AdsList />
                </>
              } />
              <Route path='/login' element={
                <>
                  <ImageGallery/>
                  <LogInForm />
                </>
                
              } />
              <Route path='/signup' element={
                <>
                  <ImageGallery/>
                  <SignUpForm />
                </>
              } />
              <Route path='/users/:id' element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </Main>
          <Footer />
        </APIProvider>
      </Wrapper>
    </BrowserRouter>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export default App
