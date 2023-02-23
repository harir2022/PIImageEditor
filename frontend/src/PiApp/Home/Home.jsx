import React, { useState } from "react";
import canvasToImage from "canvas-to-image";

import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from "react-filerobot-image-editor";

function Home() {
	const [imageURL, setImageURL] = useState(
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQPB6I6Rez5QqrWw117mX0ZzsJAH4Eq6yvA&usqp=CAU"
	);
	const [editedImage, setEditedImage] = useState(null);

	const handleUpload = (event) => {
		setImageURL(URL.createObjectURL(event.target.files[0]));
	};

	const handleDownload = (event) => {
		canvasToImage(editedImage);
	};
	return (
		<div>
			<h1 className="lg:text-5xl m-auto w-max p-10 font-bold b-2 text-4xl">
				Image Editor
			</h1>

			<div className="mb-8 ml-8 flex justify-center">
				<label htmlFor="image font-bold">Upload the image</label>
				<input
					className="pl-2  border-solid border-r-amber-50"
					type="file"
					accept="image/jpeg, image/png, image/jpg"
					name="image"
					id="image"
					onChange={handleUpload}
				/>
			</div>
			<div>
				<FilerobotImageEditor
					source={imageURL}
					onSave={(editedImageObject, designState) => {
						console.log("saved", editedImageObject, designState);
						setEditedImage(editedImageObject.imageCanvas);
					}}
					annotationsCommon={{
						fill: "#ff0000",
					}}
					Text={{ text: "Starfox" }}
					Rotate={{ angle: 90, componentType: "slider" }}
					tabsIds={[
						TABS.ADJUST,
						TABS.ANNOTATE,
						TABS.WATERMARK,
						TABS.FILTERS,
						TABS.FINETUNE,
						TABS.RESIZE,
					]} // or {['Adjust', 'Annotate', 'Watermark']}
					defaultTabId={TABS.ANNOTATE} // or 'Annotate'
					defaultToolId={TOOLS.TEXT} // or 'Text'
				/>
			</div>
			<button
				className="flex justify-center items-center gap-2 shadow-lg shadow-gray-700 p-6 cursor-pointer hover:scale-110 ease-in duration-300"
				onClick={handleDownload}
			>
				Download
			</button>
		</div>
	);
}

export default Home;
