import React, { useState } from 'react';
import FilerobotImageEditor, { TABS, TOOLS} from 'react-filerobot-image-editor';

// import App from './Gallery/App';

interface imageType{
  submitHandler: (e:any, image:any)=>void;
}
interface saveType{
  onFileSave:(image:any)=>void;
}

function App({onFileSave}:saveType) {

  //   function fck(url:any){  
  //     fetch(url)
  //         .then((d)=>d.blob())
  //         .then(blob=>{
  //             readFIle(blob) 
  //             const file = new File([blob] , 'image',{type:blob.type});
  //              onFileSave(file);
  //         }
  //         ).catch((e)=>{console.log(e)})
  
  // function readFIle(file:any){
  //      const fs = new FileReader();
  
  //      fs.addEventListener('load',()=>{
  //           const res = fs.result;
  //           // console.log(res)
  //      })     
  //      fs.readAsDataURL(file);
  // }
  // }
  
  
    const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  
    const openImgEditor = () => {
      setIsImgEditorShown(true);
    };
  
    const closeImgEditor  = () => {
      setIsImgEditorShown(false);
    };
  
  
    
  
    const [file,setFile] = useState("https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png");
  
    return (
      <div>
       <input type="file" onChange={(e:any)=>{
            setFile(URL.createObjectURL(e.target.files[0]))
       }}/>
       <button onClick={openImgEditor}>Open Filerobot image editor</button>
              {isImgEditorShown && (
              <FilerobotImageEditor
            source={file}
            onSave={(editedImageObject, designState) => {
              (onFileSave(editedImageObject))
              // fck(designState.imgSrc);
              console.log(editedImageObject);
              console.log(designState);
            } }
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: '#ff0000'
            }}
            Text={{ text: 'Filerobot...' }}
            Rotate={{ angle: 90, componentType: 'slider' }}
            tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
            savingPixelRatio={0} previewPixelRatio={0}/>
              )}
        </div>
    );
  }
  
  


  //image uploaded 
function ImageUpload({submitHandler}:imageType) { 
  const [file, setFile] = useState(null)

  
  const onFileSave=async(image:any)=>{
            setFile(image)
            console.log(image)
            setConfirmSave(true);           
}

const [confirmSave, setConfirmSave] = useState(false)
  return (
    <>
          <form onSubmit={(e)=>submitHandler(e,file)}>
                  <App onFileSave={onFileSave}/>
                  {confirmSave?<input type='submit' value={"Save to Drive"}/>:<></>}
          </form>
          
    </>
  )
}

export default ImageUpload;