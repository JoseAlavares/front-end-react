import React, { Fragment, useState } from "react";
import {
    MDBContainer,
    MDBCol, 
    MDBRow,
    MDBCard,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCardBody,
    MDBIcon
} from "mdbreact";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserForm from "../../components/UserForm/UserForm";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const SERVER = process.env.REACT_APP_DOMAIN;
const PORT = process.env.REACT_APP_PORT;
const BACKEND_URL = `${SERVER}${PORT}`;
const API_KEY = process.env.REACT_APP_API_KEY;

const CreateUser = (props) => {
    const [inputValue, setInputValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [btnTxt, setBtnTxt] = useState("Registrarse");
    const configNotify = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleInput = (event) => {
        const value = event.target.value;
        setInputValues({
            ...inputValue,
            [event.target.name]: value
        });
    };

    const handleSubmit = () => {
        let errors = [];
        if(!inputValue.name) errors.push("El campo del nombre no puede estar vacio");
        if(!inputValue.email) errors.push("El campo de email no puede estar vacio");
        if(!inputValue.password) errors.push("El campo de contraseña no puede estar vacio");
        if(!inputValue.confirm_password) errors.push("El campo de confirmación de contraseña no puede estar vacio");
        if(inputValue.password.toLowerCase() !== inputValue.confirm_password.toLowerCase())
        errors.push("Las contraseñas no coinciden");

        if(errors.length) {
            for(let i=0; i<errors.length; i++) {
                toast.error(errors[i], configNotify);
            }

            return;
        }
        
        setLoading(true);
        setDisableBtn(true);
        setBtnTxt("");
        
        axios({
            method: "POST",
            url: `${BACKEND_URL}/api/users`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `ApiKey ${API_KEY}`
            },
            data: {
                name: inputValue.name,
                email: inputValue.email,
                password: inputValue.password
            }
        })
        .then(result => {
            toast.success(
                "La cuenta fue creada correctamente, seras redirigido a el inicio de sesion", 
                configNotify
            );
            setTimeout(() => {
                props.history.push("/home");
            }, 3000);
            
        })
        .catch(err => {
            setLoading(false);
            setBtnTxt("Registrarse");
            setDisableBtn(false);
            toast.error(err.response.data.message, configNotify);
        });
    };

    const location = props.location.pathname;

    return (
        <Fragment>
            <Navbar
                location={location}/>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />

            <MDBContainer style={{paddingTop: "5px"}} className="profile-card">
                <MDBRow>
                    <UserForm
                        columnSize={"8"}
                        formName={"Registrar cuenta"}
                        name={inputValue.name}
                        email={inputValue.email}
                        handleInput={handleInput}
                        handleSubmit={handleSubmit}
                        buttonTxt={btnTxt}
                        loading={loading}
                        disableBtn={disableBtn}/>
                    <MDBCol md="4" style={{paddingTop: "5px"}}>
                        <MDBCard className="profile-card">
                            <MDBCardImage 
                                className="img-fluid" 
                                src="https://icon-library.com/images/icon-programmer/icon-programmer-14.jpg" 
                                waves />
                            <MDBCardBody>
                                <MDBCardTitle>Perfil de usuario</MDBCardTitle>
                                <MDBCardText>
                                    <MDBIcon 
                                        icon="user" 
                                        size="3x" 
                                        className="amber-text pr-3"/>
                                        Nombre: {inputValue.name || "n/a"}
                                    <br/>
                                    <MDBIcon 
                                        icon="envelope" 
                                        size="3x" 
                                        className="amber-text pr-3"/>
                                        Correo: {inputValue.email || "n/a"}                                
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Fragment>
    );
};

export default CreateUser;