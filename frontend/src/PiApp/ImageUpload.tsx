import React,{useState} from 'react'
import App from './Gallery/App';

interface imageType{
  submitHandler: (e:any, image:any)=>void;
}


const cvtURLtoFile= (objectUrl:any)=>{
  return  fetch(objectUrl)
      .then(response => response.blob())
      .then(blob => {
        // Create a new File object from the blob
        const file = new File([blob], 'filename.jpg', {type: 'image/jpeg'});
        // Use the File object as needed
        return file;
      })
      .catch(error => {
        console.error('Error downloading blob:', error);
        return null;
      });
      

}

function ImageUpload({submitHandler}:imageType) { 
  const [file, setFile] = useState<File|null>(null)

  
  const onFileSave=async(image:any)=>{
      if(!image) return;
          
      let properImage=
           cvtURLtoFile(image).then((file)=>{
            // properImage=file;
            setFile(file);
            console.log(file)
            return file;
          });

          if(!properImage) return;

          console.log("File savign...")
            // console.log(properImage);
            // setFile(await properImage);
            setConfirmSave(true);            
            
}

const [confirmSave, setConfirmSave] = useState(false)
  return (
    <>
          <form onSubmit={(e)=>submitHandler(e,file)}>
                  <App onFileSave={onFileSave}/>
                  {confirmSave?<button type='submit'>Save to Drive</button>:<></>}
          </form>
          
    </>
  )
}

export default ImageUpload;