import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
	if (Array.isArray(box)) {
		return (
			<>
				<div className="center image-container">
					<div className="box">
						<img id="inputImage" src={imageUrl} alt="" className="image" />
						{box.map((item, index) => {
							return (
								<div
									key={index}
									className="bounding-box"
									style={{
										top: item.topRow,
										right: item.rightCol,
										bottom: item.bottomRow,
										left: item.leftCol,
									}}
								></div>
							);
						})}
					</div>
				</div>
			</>
		);
	} else {
		return (
			<div className="center image-container">
				<div className="box">
					<img id="inputImage" src={imageUrl} alt="" className="image" />
					<div
						className="bounding-box"
						style={{
							top: box.topRow,
							right: box.rightCol,
							bottom: box.bottomRow,
							left: box.leftCol,
						}}
					></div>
				</div>
			</div>
		);
	}
};

export default FaceRecognition;
