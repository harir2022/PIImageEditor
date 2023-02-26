import axios from 'axios';
interface WindowWithEnv extends Window {
     __ENV?: {
       web3_api_key:string,
       backendURL: string, // REACT_APP_BACKEND_URL environment variable
       sandbox: "true" | "false", // REACT_APP_SANDBOX_SDK environment variable - string, not boolean!
     }
   }
   
const _window: WindowWithEnv = window;
const backendURL = _window.__ENV && _window.__ENV.backendURL;
const axiosClient = axios.create({ baseURL: `${backendURL}`, timeout: 20000, withCredentials: true});

const config = {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}};
export   {axiosClient,config};