import {axiosClient , config} from '../Axios/axiosClient';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import React, {HtmlHTMLAttributes, useState} from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import SignIn from './components/SignIn';
import Header from './components/Header';
import ImageUpload from '../PiApp/ImageUpload';
// @ts-ignore
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
import Gallery from '../PiApp/Gallery/Gallery';
import ImageDetails from '../PiApp/Gallery/GalleryComponent/ImageDetails';



type MyPaymentMetadata = {};

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
}

export type User = AuthResult['user'];

interface PaymentDTO {
  amount: number,
  user_uid: string,
  created_at: string,
  identifier: string,
  metadata: Object,
  memo: string,
  status: {
    developer_approved: boolean,
    transaction_verified: boolean,
    developer_completed: boolean,
    cancelled: boolean,
    user_cancelled: boolean,
  },
  to_address: string,
  transaction: null | {
    txid: string,
    verified: boolean,
    _link: string,
  },
};

// Make TS accept the existence of our window.__ENV object - defined in index.html:
interface WindowWithEnv extends Window {
  __ENV?: {
    web3_api_key:string,
    backendURL: string, // REACT_APP_BACKEND_URL environment variable
    sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
  }
}

const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;



// const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};


export default function Shop() {
  
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const signIn = async () => {
    //("Sigin in")
    const scopes = ['username', 'payments'];
    const authResult: AuthResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
    
    if(!authResult) return;
    signInUser(authResult);
    setUser(authResult.user);
    setAuthRes(authResult)
  }

  const signOut = () => {
    setUser(null);
    signOutUser();
  }

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('/user/signin', {authResult});
    return setShowModal(false);
  }

  const signOutUser = () => {
    axiosClient.get('/user/signout');
    setUser(null);
    setAuthRes(null)
    
    
  }

  const onModalClose = () => {
    setShowModal(false);
  }

  const orderProduct = async (memo: string, amount: number, paymentMetadata: MyPaymentMetadata) => {
    if(user === null) {
      return setShowModal(true);
    }
    const paymentData = { amount, memo, metadata: paymentMetadata };
    const callbacks = {
      onReadyForServerApproval,
      onReadyForServerCompletion,
      onCancel,
      onError
    };
    const payment = await window.Pi.createPayment(paymentData, callbacks);
    //(payment);
  }

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    //("onIncompletePaymentFound", payment);
    return axiosClient.post('/payments/incomplete', {payment});
  }

  const onReadyForServerApproval = (paymentId: string) => {
    //("onReadyForServerApproval", paymentId);
    axiosClient.post('/payments/approve', {paymentId}, config);
  }

  const onReadyForServerCompletion = (paymentId: string, txid: string) => {
    //("onReadyForServerCompletion", paymentId, txid);
    axiosClient.post('/payments/complete', {paymentId, txid}, config);
  }

  const onCancel = (paymentId: string) => {
    //("onCancel", paymentId);
    return axiosClient.post('/payments/cancelled_payment', {paymentId});
  }

  const onError = (error: Error, payment?: PaymentDTO) => {
    //("onError", error);
    if (payment) {
      //(payment);
      // handle the error accordingly
    }
  }

  
  

  const [authRes, setAuthRes] = useState<AuthResult|null>()

  const [file, setFile] = useState<File|null>(null)
  if(!authRes){
    <SignIn onSignIn={signIn} onModalClose={onModalClose} />
  }

  const [showGallery, setShowGallery] = useState(false)
  const [showApp, setShowApp] = useState(false)
  return (
    <>
    <Header user={user} onSignIn={signIn} onSignOut={signOut} />  
    {authRes ?
    <>
            {
              !showGallery && !showApp ?(
                <>
                <button 
                className="w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={()=>{setShowGallery(!showGallery)}}>
                      {showGallery ? 
                      (
                      <>
                      Hide Gallery 
                      </>
                      ): 
                      <>
                      Show Gallery
                      </>
                      }
                  </button>
                <ImageUpload  {...authRes}/>
                </>
              ):(
                showGallery  && !showApp?(
                  <>
                  <p className="font-sans text-center text-xl font-bold">Gallery</p>
                  <Gallery {...authRes}/>
                  </>
                ):(
                  showApp && !showGallery?(
                    <ImageUpload  {...authRes}/>
                
                  ):<>
                      <footer className="footer-1 bg-gray-100 py-8 sm:py-12" style={{
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  textAlign:"center"}}>
  
      <ProductCard
        name="π "
        description="Support our developers with PI CryptoCurrency"
        price={1}
        onClickBuy={() => {
            if(!authRes){
               setShowModal(true);
              return;
            }
          orderProduct("Support", 1, { productId: 'supporting' })
        }}
      />
     
  </footer>
                  </>
                )
              )

            }  
    
    </>
    :(
      <>
      <p className='w-full flex  md:items-start h-screen bg-white-500 text-lg text-blue-1700 font-semibold  justify-center items-center bg-white-500 text-white-1100 font-semibold hover:text-blue bg-white-500 py-2 px-4 '>
            Login first
        </p>
            <footer className="footer-1 bg-gray-100 py-8 sm:py-12" style={{
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100%",
  textAlign:"center"}}>
  
      <ProductCard
        name="π "
        description="Support our developers with PI CryptoCurrency"
        price={1}
        onClickBuy={() => {
            if(!authRes){
               setShowModal(true);
              return;
            }
          orderProduct("Support", 1, { productId: 'supporting' })
        }}
      />
     
  </footer>
      
      </>
    )
}
{/*    
    
    { authRes && showGallery &&
            <Gallery {...authRes}/>
    }  */}

    
  {/* { !showGallery && showApp && 

} */}
      { showModal && <SignIn onSignIn={signIn} onModalClose={onModalClose} /> }
    </>
  );
}


