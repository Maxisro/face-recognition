import React from "react";
import Tilt from "react-parallax-tilt";
import "../Logo/Logo.css";
import logo from "../Logo/logo_transparent.png";

const Logo = () => {
	return (
		<div className="wrap">
			<Tilt
				className="tilt shadow-5 parallax-effect-img"
				tiltMaxAngleX={35}
				tiltMaxAngleY={35}
				perspective={900}
				scale={1.1}
				transitionSpeed={2000}
				gyroscope={true}
			>
				<img src={logo} className="inner-element" alt="pic" />
			</Tilt>
		</div>
	);
};

export default Logo;
