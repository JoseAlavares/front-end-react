import React, { Fragment, useState, useEffect } from "react";
import { 
    MDBContainer,
    MDBCol,
    MDBRow, 
    MDBCard, 
    MDBCardImage, 
    MDBCardTitle, 
    MDBCardText,
    MDBCardBody,
    MDBIcon
} from "mdbreact";
import UserForm from "../../components/UserForm/UserForm";
import Navbar from "../../components/Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Modules
import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PORT}`;

const EditUser = (props) => {
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
    
    const token = window.sessionStorage.getItem("jwt");
    const {match: { params } } = props;
    const location = props.location.pathname;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    
    const getDataUser = () => {
        axios({
            method: "GET",
            url: `${BACKEND_URL}/api/users/${params.id}`,
            headers: headers
        })
        .then(result => {
            setInputValues({
                name: result.data.data.name,
                email: result.data.data.email
            });
        })
        .catch(err =>{
            console.error(err);            
        });
    };

    useEffect(() => {
        getDataUser();
    }, []);
        
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
        if(
            inputValue.password && inputValue.confirm_password &&
            inputValue.password.length <= 4 &&
            (inputValue.password.toLowerCase() !== inputValue.confirm_password.toLowerCase())
        ) {
            errors.push("Las contraseñas no coinciden");
        }

        if(errors.length) {
            for(let i=0; i<errors.length; i++) {
                toast.error(errors[i], configNotify);
            }

            return;
        }

        setBtnTxt("");
        setLoading(true);
        setDisableBtn(true);

        let formData = {
            id: params.id,
            name: inputValue.name,
            email: inputValue.email            
        };

        if(inputValue.password) {
            formData.password = inputValue.password;
        }

        axios({
            method: "PUT",
            url: `${BACKEND_URL}/api/users`,
            headers: headers,
            data: formData
        })
        .then(result => {
            toast.success("Los datos fueron modificados correctamente", configNotify);
            setTimeout(() => {
                props.history.push("/list-user");
            }, 2000);
        })
        .catch(err => {
            console.error(err);
            setLoading(false);
            setBtnTxt("Registrarse");
            setDisableBtn(false);
            toast.error(err.response.data.message, configNotify);
        });
    };

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
                        formName={"Editar mis datos"}                
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

export default EditUser;