import React, { useState } from "react";
import { 
    MDBNavbar, 
    MDBNavbarBrand, 
    MDBNavbarNav, 
    MDBNavItem,
    MDBNavbarToggler, 
    MDBCollapse, 
    MDBDropdown,
    MDBDropdownToggle, 
    MDBDropdownMenu, 
    MDBDropdownItem, 
    MDBIcon
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [token, setToken] = useState("");
    const [idUser, setIdUser] = useState("");

    useState(() => {
        if(window.sessionStorage.length) {
            setToken(window.sessionStorage.getItem("jwt"));
            setIdUser(window.sessionStorage.getItem("user"));
        }           
    }, []);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Router>
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">MDBootstrap React</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
                    <MDBNavbarNav left>                    
                            <MDBNavItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="bars" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <MDBDropdownItem
                                            href="/home">
                                            Inicio
                                        </MDBDropdownItem>
                                        <MDBDropdownItem 
                                            href="/list-user">
                                            Usuarios
                                        </MDBDropdownItem>                                
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    {token &&
                        <MDBNavbarNav right>                    
                            <MDBNavItem>
                                <MDBDropdown dropleft>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <MDBDropdownItem onClick={() => { window.sessionStorage.clear(); }}
                                            href="/login">
                                            Cerrar sesion
                                        </MDBDropdownItem>
                                        <MDBDropdownItem 
                                            href={`/edit-user/${JSON.parse(idUser).id}`}>
                                            Perfil de usuario
                                        </MDBDropdownItem>                                
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    }
                    {(!token && props.location !== "/login") &&
                        <MDBNavbarNav right>                    
                            <MDBNavItem>
                                <MDBDropdown dropleft>
                                    <MDBDropdownToggle nav caret>
                                        <MDBIcon icon="user" />
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu className="dropdown-default">
                                        <MDBDropdownItem
                                            href="/login">
                                            Iniciar sesion
                                        </MDBDropdownItem>
                                        <MDBDropdownItem 
                                            href="/register">
                                            Registrarse
                                        </MDBDropdownItem>                                
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    }
                </MDBCollapse>
            </MDBNavbar>
        </Router>
    );
};

export default Navbar;