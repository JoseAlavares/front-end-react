import React, { Fragment, useState, useEffect } from 'react';
import { 
    MDBCard, 
    MDBCardBody, 
    MDBCardImage, 
    MDBCardTitle, 
    MDBCardText, 
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBIcon,
    MDBCardHeader,
    MDBDataTableV5,
    MDBBadge
} from 'mdbreact';
import "./Profile.css";

//Components
import Navbar from "../../components/Navbar/Navbar";
import axios from 'axios';

const BACKEND_URL = `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PORT}`;

const Profile = (props) => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [userHistory, setUserHistory] = useState(null);
    
    const location = props.location.pathname;
    const {match: { params } } = props;
    const token = window.sessionStorage.getItem("jwt") || "";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };    
    
    const gridStructure = (data) => {
        const _data = data.map((item, index) => {
            return {
                "#": ++index,
                id: item.id,
                title: item.title,
                body: item.body,
                active: <MDBBadge pill color="success">Activo</MDBBadge>
            };
        });

        return _data;
    };

    const getUserData = () => {
        axios({
            method: "GET",
            url: `${BACKEND_URL}/api/users/${params.id}`,
            headers: headers
        })
        .then(result => {
            const {data: { data } } = result;
            setUser(data.name);
            setEmail(data.email);
            setCreatedAt(data.created_at.substring(0, 16).replace(/[A-Z]/g, " "));
        })
        .catch(err => {
            console.error(err);
        });
    };

    const getUserHistory = () => {
        axios({
            method: "GET",
            url: `${BACKEND_URL}/api/user/history/${params.id}`,
            headers: headers
        })
        .then(result => {
            const {data: { data } } = result;
            const rows = gridStructure(data.rows);

            const dataGrid = {
                columns: [{
                    "label": "#",
                    "field": "#",
                    "sort": "asc"
                },                
                {
                    'label': 'Id',
                    'field': 'id',
                    'sort': 'asc'
                },                
                {
                    'label': 'Titulo',
                    'field': 'title',
                    'sort': 'asc'
                },
                {
                    'label': 'Cuerpo',
                    'field': 'body',
                    'sort': 'asc'
                },
                {
                    'label': 'Estatus',
                    'field': 'active'
                }],
                rows: rows
            };

            setUserHistory(dataGrid);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        const promise1 = getUserData();
        const promise2 = getUserHistory();

        Promise.all([promise1, promise2])
            .then(result => {
                console.log("promises reolved");
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <Fragment>
            <Navbar
                location={location}/>
            <MDBContainer style={{paddingTop: "5px"}} className="profile-card">
                <MDBRow>
                    <MDBCol md="4">
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
                                        Nombre: {user || "n/a"}
                                    <br/>
                                    <MDBIcon 
                                        icon="envelope" 
                                        size="3x" 
                                        className="amber-text pr-3"/>
                                        Correo: {email || "n/a"}
                                    <br/>
                                    <MDBIcon
                                        icon="calendar-alt" 
                                        size="3x"
                                        className="amber-text pr-3"/>
                                        Fecha y hora de alta: {createdAt || "n/a"}
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCard narrow>
                            <MDBCardHeader 
                                className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                                <h3 style={{"color": "white"}}>Historial de actividades</h3>
                            </MDBCardHeader>
                            <MDBCardBody cascade>
                            <MDBDataTableV5
                                hover 
                                entriesOptions={[5, 20, 25]} 
                                entries={3} 
                                pagesAmount={4} 
                                data={userHistory || {}}/>                            
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>            
        </Fragment>
    );

};

export default Profile;