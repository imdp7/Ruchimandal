import React from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const Modals = ({show,close,links}) => {  
    return (
      <>
          {
     show ?
            <div>
        <Modal open={open} onClose={close} center closeOnEsc>
        <img src={`${links}`} alt={`${links}`} />
      </Modal>
        </div>
        :null}
      </>
    );
  }
  
export default Modals