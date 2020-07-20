import React from "react";
import { 
    MDBContainer, 
    MDBBtn, 
    MDBModal, 
    MDBModalBody, 
    MDBModalHeader, 
    MDBModalFooter 
} from "mdbreact";

const ModalMessage = (props) => {
    return (
        <MDBContainer>
            <MDBModal isOpen={props.showModal} toggle={props.show}>
                <MDBModalHeader toggle={props.show}>Mensajes del sistema</MDBModalHeader>
                <MDBModalBody>
                    {props.message}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={props.show}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
};

export default ModalMessage;