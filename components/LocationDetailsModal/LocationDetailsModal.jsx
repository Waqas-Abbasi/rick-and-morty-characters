import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import styles from './location-details-modal.scss'

const LocationDetailsModal = ({modalStatus, toggleModal, selectedLocationURL}) => {

    const [loading, setLoading] = useState(true);
    const [locationInfo, setLocationInfo] = useState({});

    const fetchLocation = async () => {
        const resp = await fetch(selectedLocationURL);
        return await resp.json();
    };
    useEffect(() => {
        fetchLocation().then(resp => setLocationInfo(resp));
    }, []);

    useEffect(() => {
        setLoading(false);
    }, [locationInfo]);

    const loadingModal = (
        <div>
            Loading
        </div>
    );

    const residents = (
        <div>
            Residents
        </div>
    );

    const locationView = (
        <div>
            <p className={'location-title'}>{locationInfo.name}</p>
            <div className={'character-card-details-row'}>
                <p className={'detail-type'}>TYPE</p>
                <p className={'detail-value'}>{locationInfo.type === 'unknown' ? '-' : locationInfo.type}</p>
            </div>
            <div className={'character-card-details-row'}>
                <p className={'detail-type'}>DIMENSION</p>
                <p className={'detail-value'}>{locationInfo.dimension === 'unknown' ? '-' : locationInfo.dimension}</p>
            </div>
            {residents}
        </div>
    );

    return (
        <Modal
            isOpen={modalStatus}
            onRequestClose={toggleModal}
            className='Modal'
            overlayClassName='Overlay'
            contentLabel="">
            <span className={'close-icon'} onClick={toggleModal}>X</span>
            {loading ? loadingModal : locationView}
        </Modal>
    );
};

export default LocationDetailsModal;
