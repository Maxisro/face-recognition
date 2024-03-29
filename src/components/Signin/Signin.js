import React from "react";
import "./Signin.css";

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
		};
	}
	onEmailChange = (event) => {
		this.setState({ signInEmail: event.target.value });
	};
	onPasswordChange = (event) => {
		this.setState({ signInPassword: event.target.value });
	};

	onSubmitSignIn = (event) => {
		event.preventDefault();
		fetch("https://floating-sierra-56066.herokuapp.com/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword,
			}),
		})
			.then((response) => response.json())
			.then((user) => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				}
			});
	};

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
					<form className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw10 lh-copy f4" htmlFor="email-address">
									Email
								</label>
								<input
									onChange={this.onEmailChange}
									className="pa2 input-reset ba b--black bw1 bg-transparent hover-bg-black w-100 emailinput"
									type="email"
									name="email-address"
									id="email-address"
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f4" htmlFor="password">
									Password
								</label>
								<input
									onChange={this.onPasswordChange}
									className="b pa2 input-reset ba bw1 b--black bg-transparent hover-bg-black hover-b--white hover-white w-100"
									type="password"
									name="password"
									id="password"
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bw1 b--black bg-transparent grow pointer f6 dib signbut"
								type="submit"
								value="Sign in"
								onClick={this.onSubmitSignIn}
							/>
						</div>
						<div className="lh-copy mt3">
							<p
								onClick={() => onRouteChange("register")}
								className="f5 link dim black db pointer grow"
							>
								Register
							</p>
						</div>
					</form>
				</main>
			</article>
		);
	}
}

export default Signin;
