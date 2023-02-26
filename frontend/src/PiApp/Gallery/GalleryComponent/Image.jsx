import React ,{useState,useEffect}from 'react'
import {Link} from 'react-router-dom'
import ImageDetails from './ImageDetails';
function Image({imageUrl,imageName,user}) {
   
     const [details, setDetails] = useState(false)
     useEffect(() => {
      
     }, [details])
     const [showVisible, setShowVisible] = useState(false)


     

   //   useEffect(()=>{

   //   },[showVisible])

   //   if(showVisible){
   //       return(
   //          <ImageDetails imageUrl={imageUrl} imageName={imageName}/>
   //       )
   //   }
     
  return (
     <>
     {   !showVisible && user !=null ?
               (<div className="flex w-1/3 flex-wrap">
               <div className="w-full p-1 md:p-2">       
                  {/* <Link to={`/imageDetails/${imageName}/${user.uid}`}> */}
                  <Link to={`/imageDetails?url=${imageUrl}`}>
               
                              <img
                              alt={imageName}
                              className="block h-full w-full rounded-lg object-cover object-center"
                              src={imageUrl}
                              onClick={()=>{
                                 setShowVisible(!showVisible)
                              }}                                    
                              />               
                  
               </Link>
               </div>
               </div>
            ):(
               <>No IMages</>
            )
     }
             
         
     </>
     
    
  )
}

export default Image