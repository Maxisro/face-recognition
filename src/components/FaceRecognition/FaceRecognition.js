import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
	return (
		<div className="center image-container">
			<div className="box">
				<img id="inputImage" src={imageUrl} alt="" className="image"/>
				<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
};

export default FaceRecognition;
