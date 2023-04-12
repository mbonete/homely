import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import LogInForm from './components/LogInForm';
import Profile from "./components/Profile";
import SignUpForm from './components/SignUpForm'
import {APIProvider} from './hooks/useAPI';
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoute";
import AllAdsList from "./components/AllAdsList/AllAdsList";
import CreateAdForm from "./components/CreateAdForm/CreateAdForm";
import SideBar from "./components/SideBar/SideBar"
import MyAds from "./components/MyAds/MyAds";
import SelectedAd from "./components/SelectedAd/SelectedAd";
import EditAdForm from './components/EditAdForm/EditAdForm'

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
      
        <APIProvider>
          <Header />
          <Main>  
            <Routes>
              <Route path='/' element={
                <>
                  <SideBar/>
                  <AllAdsList />
                  
                </>
              } />
              <Route path='/ads' element={
                <>
                  <SideBar />
                  <AllAdsList />
                </>
              } />
              <Route path='/users/:id/ads' element={
                <>
                  <MyAds/>
                </>
              } />
              <Route path='/adform' element={
                <>
                  <CreateAdForm />
                </>
              } />
              <Route path='/ads/:id/edit' element={
                <>
                  <EditAdForm />
                </>
              } />
              <Route path='/ads/:id' element={
                <>
                  <SelectedAd />
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
      </BrowserRouter> 
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

export default App
