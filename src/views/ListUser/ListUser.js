import React, { Fragment, useEffect, useState } from 'react';
import {
    MDBDataTableV5,  
    MDBCard, 
    MDBCardBody, 
    MDBCardHeader, 
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBadge,
    MDBBtn
} from 'mdbreact';

//Components
import Navbar from "../../components/Navbar/Navbar";

//Modules
import axios from "axios";

const BACKEND_URL = `${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PORT}`;

const ListUser = (props) => {
    const [gridStructure, setGridStructure] = useState({});

    const generateStructure = (data) => {

        const keys = Object.keys(data[0]);
        let columns = [{
                "label": "#",
                "field": "#",
                "sort": "asc"
            },
            {
                'label': 'id',
                'field': '_id',
                'sort': 'asc'
            },
            {
                'label': 'Nombre',
                'field': 'name',
                'sort': 'asc'
            },
            {
                'label': 'Correo',
                'field': 'email',
                'sort': 'asc'
            },
            {
                'label': 'Estatus',
                'field': 'active',
                'sort': 'asc'
            },
            {
                'label': 'Acciones',
                'field': 'actions'
        }];
        if(keys.length === 5) {
            data = data.map((item, index) => {
                return {
                    "#": ++index,
                    "_id": item._id,
                    "name": item.name,
                    "email": item.email,
                    "created_at": item.created_at,
                    "active": <MDBBadge pill color="success">Activo</MDBBadge>,
                    "actions": <MDBBtn href={`/profile/${item._id}`} size="sm" color="success">Perfil</MDBBtn>
                };
            });
        } else {
            columns.splice(1, 1);
            columns.splice(2, 1);
            columns.splice(3, 1);
            data = data.map((item, index) => {
                return {
                    "#": ++index,
                    "name": item.name,
                    "active": <MDBBadge pill color="success">Activo</MDBBadge>
                };
            });
        }
        console.log({
            columns: columns,
            rows: data
        });
        return {
            columns: columns,
            rows: data
        };
    };

    const getUsers = () => {
        const token = window.sessionStorage.getItem("jwt") || "";
        let headers = {"Content-Type": "application/json"};
        
        if(token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        axios({
            method: "GET",
            url: `${BACKEND_URL}/api/users`,
            headers: headers
        })        
        .then(async (data) => {
            //const isAuthenticated = (token) ? true : false;
            const {data: { data: d }} = data;
            //data.data.data
            const newData = generateStructure(d);
            setGridStructure(newData);    
        })
        .catch((err) => {
            console.error(err);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);
    
    const location = props.location.pathname;
    return(
        <Fragment>
            <Navbar
                location={location}/>
            <MDBContainer>
                <MDBRow style={{"paddingTop": "10px"}}>                    
                    <MDBCol md="12">
                        <MDBCard narrow>
                            <MDBCardHeader 
                                className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                                <h3 style={{"color": "white"}}>Lista de usuarios</h3>
                            </MDBCardHeader>
                            <MDBCardBody cascade>
                                <MDBDataTableV5
                                    hover 
                                    entriesOptions={[5, 20, 25]} 
                                    entries={5} 
                                    pagesAmount={4} 
                                    data={gridStructure}/>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Fragment>
    );
};

export default ListUser;