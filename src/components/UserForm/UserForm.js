import React from "react";
import { 
    MDBCol, 
    MDBInput, 
    MDBBtn, 
    MDBCard, 
    MDBCardBody 
} from 'mdbreact';

const EditUser = (props) => {
    return (        
        <MDBCol md={props.columnSize}>
            <MDBCard>
                <MDBCardBody>
                    <form>
                        <p className="h4 text-center py-4">
                            {props.formName}
                        </p>
                        <div className="grey-text">                                  
                            <MDBInput
                                name="name"
                                value={props.name || ""}
                                onChange={props.handleInput}
                                label="Nombre completo"
                                icon="user"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"/>
                            <MDBInput
                                name="email"
                                onChange={props.handleInput}
                                value={props.email || ""}
                                label="Correo electronico"
                                icon="envelope"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"/>                          
                            <MDBInput
                                name="password"
                                onChange={props.handleInput}
                                label="Contraseña"
                                icon="lock"
                                group
                                type="password"
                                validate/>
                            <MDBInput
                                name="confirm_password"
                                onChange={props.handleInput}
                                label="Confirmar contraseña"
                                icon="lock"
                                group
                                type="password"
                                validate/>
                        </div>
                        <div className="text-center py-4 mt-3">
                            <MDBBtn 
                                color="success" 
                                type="button"
                                onClick={props.handleSubmit}
                                disabled={props.disableBtn}>
                                {props.buttonTxt }
                                {props.loading &&
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                }
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>            
    );
};

export default EditUser;