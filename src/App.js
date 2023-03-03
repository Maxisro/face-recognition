import React, { Component } from "react";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import "./App.css";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

const app = new Clarifai.App({
	apiKey: "dbebc45a48b34819abf37587742c12e8",
});

// https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80
// https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80
//https://images.unsplash.com/photo-1522850403397-b0c8f2f75451?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80
// https://myfacelady.com/wp-content/uploads/elementor/thumbs/Dermal-Fillers-scaled-ptauziv7b066by5yquig7thlakfd6x3gcvwlibngy0.jpeg

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: "",
			imageUrl: "",
			box: {},
			route: "signin",
			isSignedIn: false,
		};
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({ box });
	};

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	};

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input });

		app.models
			.predict(
				{
					id: "face-detection",
					name: "face-detection",
					version: "6dc7e46bc9124c5c8824be4822abe105",
					type: "visual-detector",
				},
				this.state.input
			)
			.then((response) => {
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === 'signout'){
			this.setState({isSignedIn: false})
		}else if (route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({ route: route });
	};

	render() {
		const { imageUrl, box, isSignedIn } = this.state;
		return (
			<div className="App">
				<ParticlesBg type="cobweb" num={100} color={"#ffffff"} bg={true} />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
				<Logo />
				{this.state.route === "home" ? (
					<>
						<Rank />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</>
				) : (this.state.route === "signin" || this.state.route === "signout") ? (
					<Signin onRouteChange={this.onRouteChange} />
				) : (
					<Register onRouteChange={this.onRouteChange} />
				)}
			</div>
		);
	}
}

export default App;
