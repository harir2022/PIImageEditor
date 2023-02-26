import React, { useState } from 'react';
import FilerobotImageEditor, { TABS, TOOLS} from 'react-filerobot-image-editor';
import {axiosClient }from '../Axios/axiosClient'
import canvasToImage from "canvas-to-image";

interface imageType{
  submitHandler: (e:any, image:any)=>void;
}
interface saveType{
  onFileSave:(image:any)=>void;
}

interface ModalType{
  setModal:(modal:boolean)=>void;
  success:boolean
}

type modalType ={
  visible:boolean,
  success:boolean;
}

type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
}



function MyApp({onFileSave}:saveType) {
  
    const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  
    const openImgEditor = () => {
      setIsImgEditorShown(true);
      setShowInput(true);
    };
  
    const closeImgEditor  = () => {
      setIsImgEditorShown(false);
    };
  
  
    
    const [showInput, setShowInput] = useState(false)
  
    const [file,setFile] = useState("https://www.google.co.in/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png");
  
    return (
      <div>
        {!showInput &&
        <>
                      <label className="block text-gray-700 font-bold mb-2" htmlFor="fileInput">
                      Edit An  Image 
                </label>
                  <input type="file" 
                  className='className="appearance-none border border-gray-400 py-2 px-4 rounded text-gray-700 leading-tight focus:outline-none focus:border-gray-500 bg-white cursor-pointer"'
                  onChange={(e:any)=>{
                      setFile(URL.createObjectURL(e.target.files[0]))
                  }}/>
                  <button 
                  className='className="appearance-none border border-gray-400 py-2 px-4 rounded text-gray-700 leading-tight focus:outline-none focus:border-gray-500 bg-white cursor-pointer"'
                  onClick={openImgEditor}>Open Image editor</button>
        </>
        }
       
              {isImgEditorShown && (
              <FilerobotImageEditor
            source={file}
            onSave={(editedImageObject, designState) => {
              (onFileSave(editedImageObject))
              // fck(designState.imgSrc);
              //(editedImageObject);
              //(designState);
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
function ImageUpload({accessToken,user}:any) { 
  const [file, setFile] = useState<object>()
  //image upload
  const  submitHandler= async(e:any, image:any)=>{    
        e.preventDefault();
        if(image==null) return ;   
        const authRes = accessToken;
        

        // //(image);
        if(!authRes) return;
        const  formdata = new FormData();
        formdata.set('image',image.imageBase64);      
        formdata.set('imageName',image.name)
        formdata.set('uid',user.uid)       

        // //(formdata)
        setDis(true);

        let  config = {headers: {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*'}};
        
                
        const {data}=   await axiosClient.post("/users/upload",formdata,config);      
        setModal({visible:true,success:data.success});      
        setFile({});  
        setDis(false);
  }

const [dis,setDis]=useState(false);
  
  const onFileSave=async(image:any)=>{
            setFile(image)
            setDownload(image.imageCanvas)
            //(image)
            setConfirmSave(true);           
}

const [modal, setModal] = useState<modalType>(null)
const [download, setDownload] = useState()
const [confirmSave, setConfirmSave] = useState(false)
  return (
    <>
          <form onSubmit={(e)=>submitHandler(e,file)}>
          {
                    modal && modal.visible ?
                    (
                <SuccessModal success={modal.success} setModal={setModal}/>
                    ):(
                  <>
                  <MyApp onFileSave={onFileSave}/>
                  {confirmSave?
                  <>
                  <input type='submit'
                    className=" content-center tems-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    disabled={dis}
                  value={"Save to Drive"}/>

                  <input type='button'
                    className=" content-center tems-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  value={"Save to Device"}
                    onClick={()=>{
                      if(!file) return;
                      canvasToImage(download);
                    }}
                  />
                  </>
                  :<></>}

                  </>
                    )
                    
          }
                
          </form>
          
    </>
  )
}

function SuccessModal({success, setModal}:ModalType){

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div className="bg-[#68d391] px-4 py-5 sm:px-6">
        {success ? (
          <h3 className="text-lg leading-6 font-medium text-white">Upload Successful</h3>
        ) : (
          <h3 className="text-lg leading-6 font-medium text-white">Upload Failed</h3>
        )}
      </div>
      <div className="px-4 py-5 sm:p-6">
        {success ? (
          <p className="text-sm text-gray-700">
            Your file has been successfully uploaded.
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            There was an error uploading your file.
          </p>
        )}
      </div>
      <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#68d391] text-base font-medium text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={()=>{
            setModal(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>

  )
}

export default ImageUpload;