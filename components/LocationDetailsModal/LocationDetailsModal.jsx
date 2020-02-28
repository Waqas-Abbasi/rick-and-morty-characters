import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import styles from './location-details-modal.scss';

const LocationDetailsModal = ({modalStatus, toggleModal, selectedLocationURL}) => {


    //Loading flag for Loading State
    const [loading, setLoading] = useState(true);

    //LocationInfo state for storing Location Info when it is fetched
    const [locationInfo, setLocationInfo] = useState({});

    //totalResidents state variable to keep track of total residents at a location
    const [totalResidents, setTotalResidents] = useState(0);

    //Fetches the location based on the clicked URL
    const fetchLocation = async () => {
        try {
            let resp = await fetch(selectedLocationURL);
            resp = await resp.json();
            setLocationInfo(resp);
            setTotalResidents(resp.residents.length);
        } catch (e) {
            setLocationInfo({
                name: 'Error',
                type: 'unknown',
                dimension: 'unknown',
            });
            setTotalResidents('-');
        }
    };

    //Fetches the location after componentMounts
    useEffect(() => {
        fetchLocation().catch(err => console.log(err));
    }, []);

    //Toggle loading modal off after LocationInfo is populated
    useEffect(() => {
        setLoading(false);
    }, [locationInfo]);

    const loadingModal = (
        <div>
            Loading
        </div>
    );


    const locationView = (
        <div className={'character-card-details'}>
            <p className={'location-title'}>{locationInfo.name}</p>
            <div className={'character-card-details'}>
                <div className={'character-card-details-row'}>
                    <p className={'detail-type'}>TYPE</p>
                    <p className={'detail-value'}>{locationInfo.type === 'unknown' ? '-' : locationInfo.type}</p>
                </div>
                <div className={'character-card-details-row'}>
                    <p className={'detail-type'}>DIMENSION</p>
                    <p className={'detail-value'}>{locationInfo.dimension === 'unknown' ? '-' : locationInfo.dimension}</p>
                </div>
                <div className={'character-card-details-row'}>
                    <p className={'detail-type'}>TOTAL RESIDENTS</p>
                    <p className={'detail-value'}>{totalResidents}</p>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={modalStatus}
            onRequestClose={toggleModal}
            className='location-details-modal'
            overlayClassName='location-details-overlay'
            contentLabel="">
            <span className={'close-icon'} onClick={toggleModal}>X</span>
            {loading ? loadingModal : locationView}
        </Modal>
    );
};

export default LocationDetailsModal;
