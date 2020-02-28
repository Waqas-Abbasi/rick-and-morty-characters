import Modal from 'react-modal';
import React from "react";
import modalStyles from './character-details-modal.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const CharacterDetailModals = ({character, modalStatus, toggleModal}) => {

    return (
        <div>
            <button onClick={toggleModal}>Open Modal</button>
            <Modal
                isOpen={modalStatus}
                onRequestClose={toggleModal}
                className='character-details-modal'
                contentLabel="Example Modal"
            >

                <h2>Hello</h2>
                <button onClick={toggleModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input/>
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    )
};

export default CharacterDetailModals;