import React,{useState,useEffect} from 'react'
import {axiosClient,  config } from '../../Axios/axiosClient'
import Image from './GalleryComponent/Image'



type IMAGE ={
        url:string,
        name:string
}


function Gallery({accessToken,user}:any) {

  
  const [images, setImages] = useState<IMAGE[]>([])

  const fetchImages=  () => {
    if(!user) return;
    
    const  uid  = user.uid;
       
     axiosClient.get(`/users/gallery/${uid}`).then((data:any)=>{
      setImages([...data.data.images]);
     });
    //  //(data);
  }

  useEffect( () => {
      fetchImages();   
      // //("gallery called")
  },[])
  




  return (
    
    <section className="overflow-hidden text-neutral-700">
              
    <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-12">
              <div className="-m-1 flex flex-wrap md:-m-2">

              {
            images.map((image)=>{              
              return (
              <div key={image.url}>
                  <Image imageUrl={image.url} imageName={image.name} user={user}/>
              </div>
              )
            })
          }
        </div>              
    </div>

</section>
    
       
          

          
    
  )
}

export default Gallery