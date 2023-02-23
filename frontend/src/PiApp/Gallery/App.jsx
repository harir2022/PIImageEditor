
import React, { useState } from 'react';
import FilerobotImageEditor, { TABS, TOOLS} from 'react-filerobot-image-editor';

export default function App({onFileSave}) {
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
     <input type="file" onChange={(e)=>{
          setFile(URL.createObjectURL(e.target.files[0]))
     }}/>
     <button onClick={openImgEditor}>Open Filerobot image editor</button>
            {isImgEditorShown && (
            <FilerobotImageEditor
                source={file}
                onSave={(editedImageObject, designState) => (onFileSave(editedImageObject))}
                onClose={closeImgEditor}
                annotationsCommon={{
                  fill: '#ff0000'
                }}
                Text={{ text: 'Filerobot...' }}
                Rotate={{ angle: 90, componentType: 'slider' }}
                tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK,TABS.FILTERS]} // or {['Adjust', 'Annotate', 'Watermark']}
                defaultTabId={TABS.ANNOTATE} // or 'Annotate'
                defaultToolId={TOOLS.TEXT} // or 'Text'
              />
            )}
      </div>
  );
}

