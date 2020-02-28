import Modal from 'react-modal';
import React, {useState} from 'react';
import styles from './character-details-modal.scss';
import LocationDetailsModal from '../LocationDetailsModal/LocationDetailsModal';

const CharacterDetailModals = ({character, modalStatus, toggleModal, locationClick}) => {

    const {name, image, species, gender, status, origin, location, episode} = character;

    //Flag for toggling Location Details Modal
    const [locationDetailsModalStatus, setLocationDetailsModalStatus] = useState(false);

    //URL for Location Details Modal. Location Details Modal uses this URL to fetch information about the location
    const [locationURL, setLocationURL] = useState('');

    //Iterates over episode list and creates paragraph items with each Episode Number
    const episodeList = (
        <div className={'character-card-details-row episode-list'}>
            <p className={'detail-type'}>EPISODES</p>
            <div className={'episode-list-numbers'}>
                {
                    episode.map((episode, index) => {
                        const episodeNumber = episode.split('episode/')[1];
                        return (
                            <p className={'detail-value'}
                               key={index}>{episodeNumber}</p>
                        );
                    })
                }
            </div>
        </div>
    );


    //When a location is clicked (Origin Location or Current Location) then sets locationURL in state and toggles the Location Modal
    locationClick = (url) => {
        setLocationURL(url);
        setLocationDetailsModalStatus(true);
    };

    //Render modal, when the location modal is clicked
    const locationModal = locationDetailsModalStatus &&
        <LocationDetailsModal
            selectedLocationURL={locationURL}
            modalStatus={locationDetailsModalStatus}
            toggleModal={() => setLocationDetailsModalStatus(!locationDetailsModalStatus)}
        />;

    return (
        <div>
            <Modal
                isOpen={modalStatus}
                onRequestClose={toggleModal}
                className='character-details-modal'
                overlayClassName='character-details-overlay'
                contentLabel="">
                {locationModal}
                <span className={'close-icon'} onClick={toggleModal}>X</span>
                <img className={'character-details-modal-image'} src={image} alt={`${name} image`}/>
                <div className={'character-card-info'}>
                    <p className={'character-card-title'}>{name}</p>
                    <div className={'character-card-details'}>
                        <div className={'character-card-details-row'}>
                            <p className={'detail-type'}>SPECIES</p>
                            <p className={'detail-value'}>{species === 'unknown' ? '-' : species}</p>
                        </div>
                        <div className={'character-card-details-row'}>
                            <p className={'detail-type'}>GENDER</p>
                            <p className={'detail-value'}>{gender === 'unknown' ? '-' : gender}</p>
                        </div>
                        <div className={'character-card-details-row'}>
                            <p className={'detail-type'}>STATUS</p>
                            <p className={'detail-value'}>{status === 'unknown' ? '-' : status}</p>
                        </div>
                        <div className={'character-card-details-row'}>
                            <p className={'detail-type'}>ORIGIN</p>
                            <p className={origin.name === 'unknown' ? 'detail-value' : 'detail-value detail-click'}
                               onClick={() => locationClick(origin.url)}>{origin.name === 'unknown' ? '-' : origin.name}</p>
                        </div>
                        <div className={'character-card-details-row'}>
                            <p className={'detail-type'}>LOCATION</p>
                            <p className={location.name === 'unknown' ? 'detail-value' : 'detail-value detail-click'}
                               onClick={() => locationClick(location.url)}>{location.name === 'unknown' ? '-' : location.name}</p>
                        </div>
                        {episodeList}
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CharacterDetailModals;