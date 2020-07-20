import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { MDBContainer, 
	MDBRow, 
	MDBCol, 
	MDBInput, 
	MDBBtn,
	MDBCard,
	MDBCardBody,
	MDBCardFooter
} from "mdbreact";
import "./Login.css";

//Components
import ModalMessage from "../../components/ModalMessage/ModalMessage";
import Navbar from "../../components/Navbar/Navbar";

//Modules
import axios from "axios";

import { validateEmail, confirmPassword } from "../../utils/utils";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;
const BACKEND_URL = `${DOMAIN}${PORT}`;
const API_KEY = process.env.REACT_APP_API_KEY;

const Login = (props) => {

	const token = window.sessionStorage.getItem("jwt");	
	if(token) {			
		props.history.push("/home");		
	}

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [errorText, setErrorText] = useState(null);
	const [disableBtn, setDisableBtn] = useState(false);
	const [showErrors, setShowErrors] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState("");

	const changeUser = (event) => {
		const value = event.target.value;
		setUser(value);
	};

	const changePassword = (event) => {
		const value = event.target.value;
		setPassword(value);
	};
	
	const handleLogin = (e) => {
		e.preventDefault();		
		let errors = [];

		if(!user) errors.push(<p key={1} style={{"color": "red"}}>El campo correo no puede estar vacio</p>);
		if(!password) errors.push(<p key={2} style={{"color": "red"}}>El campo contraseña no puede estar vacio</p>);			
		if(!validateEmail(user)) errors.push(<p key={1} style={{"color": "red"}}>El formato del correo no es valido</p>);
		if(password.length <= 4 && password) errors.push(<p key={1} style={{"color": "red"}}>La longitud de la contraseña debe ser mayo a 4 caracteres</p>);

		if(errors.length > 0){
			setErrorText(errors);
			setShowErrors(true);
			setTimeout(() => {
				setShowErrors(false);
			}, 3500);
		
			return;
		}

		setLoading(true);
		setDisableBtn(true);

		axios({
            method: "POST",
            url: `${BACKEND_URL}/auth/signin`,
            data: {
                user: user,
                password: password
            },
            headers: {
				"Content-Type": "application/json",
				"Authorization": `ApiKey ${API_KEY}`,				
            }
        })
        .then(data => {
			console.log(data);
			window.sessionStorage.setItem("jwt", data.data.data.token);
			window.sessionStorage.setItem("user", JSON.stringify(data.data.data));
			props.history.push("/home");
        })
        .catch(err => {
			setShowModal(true);
			setModalText(err.response.data.message);
			setLoading(false);
			setDisableBtn(false);
			setUser("");
			setPassword("");
        });
	};

	const show = () =>{
		setShowModal(!showModal);
	};

	const location = props.location.pathname;

	return (
		<Fragment>
			<Navbar
				location={location}/>
			<MDBContainer>
				<MDBRow>  				
					<MDBCard id="login-form">
						<MDBCardBody>
						<MDBCol md="12" lg="12">    				
		      				<form>
		        				<p className="h5 text-center mb-4">Sign in</p>
		        				<div className="grey-text">
		          					<MDBInput
									  	value={user}
		          						name="user"
		          						onChange={changeUser}
		          						label="Type your email" 
		          						icon="envelope" 
		          						group type="text" 
		          						validate error="wrong"
		            					success="right" />
		          					<MDBInput
									  	value={password}
		          						name="password"
		          						onChange={changePassword}
		          						label="Type your password" 
		          						icon="lock" 
		          						group type="password" 
		          						validate />
		        				</div>
		        				<div className="text-center">
		          					<MDBBtn
		          						onClick={handleLogin}
		          						disabled={disableBtn}
		          						type={"button"}>
		          						Login
	          						</MDBBtn>
		        				</div>
		      				</form>      				
						</MDBCol>
					</MDBCardBody>
					<MDBCardFooter>
						<Link to="/register">Registrarse</Link>
						<br/>						
						<center>
							{loading &&
								<div className="spinner-grow text-success" role="status">
		        					<span className="sr-only">Loading...</span>
		      					</div>
	      					}
      					</center>
      					<div id="errors">
      						{showErrors &&
      							errorText
      						}
      					</div>
					</MDBCardFooter>
				</MDBCard>
			</MDBRow>
			<ModalMessage
				showModal={showModal}
				message={modalText}
				show={show}
				/>
		</MDBContainer>
	</Fragment>		
	);
};

export default Login;