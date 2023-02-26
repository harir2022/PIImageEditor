import React,{useEffect,useState} from 'react'
import { useParams,useLocation } from 'react-router-dom';

function ImageDetails({match}) {

     const  Button= ({text})=>{
          return (
               <div className="flex justify-center space-x-2">
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                              {text}
                    </button>
               </div>
          )
     }
//    if(!imageName){
//      return <></>
//    }

// const {imageName,uid}  = useParams();
//     const [url, setUrl] = useState("")
//     useEffect(() => {
//           //(uid);
//           //(imageName);
//           // //(url);
//     }, []);
    
const location = useLocation();
const params= new URLSearchParams(location.search);
const url = params.get("url");
// //(url)

  return (
     <div className="items-center justify-center md:items-start h-screen">
          
                <img
                         className="w-full h-auto object-cover object-center sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
                         src={url}
                         width="233px"
                         alt="My Image"
               />
          <Button text={"Edit"}/>
          <Button text={"Share"}/>   
     </div>

    
  )
}

export default ImageDetails