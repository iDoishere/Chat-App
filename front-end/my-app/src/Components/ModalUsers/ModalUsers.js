import React, { Component } from 'react'
import {  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import OnlineList from '../../Components/OnlineList/OnlineList';
import { MDBBtn } from 'mdbreact';

export default class ModalUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,     
        };      
      }
    render() {
        const {
            openModal,
            onlineUsers,
            toggle
        } = this.props
        return (
            <div>     
            <Modal isOpen={openModal} toggle={ toggle} >
              <ModalHeader toggle={ toggle}>Online Users</ModalHeader>
              <ModalBody>

              <OnlineList onlineUsers = { onlineUsers}/>    
                
            </ModalBody>
              <ModalFooter>          
              <MDBBtn outline color="info"  
                      onClick={ toggle}>
                close 
              </MDBBtn>
               </ModalFooter>
            </Modal>
          </div>
        )
    }
}
