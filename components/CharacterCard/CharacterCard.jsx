import React from 'react';
import styles from './character-styles.scss';

const CharacterCard = ({character, loading, modalHandler}) => {

    const {name, image, species, gender, status} = character;

    const characterCard = (
        <div>
            <img className={'character-card-image'} alt={'character image'} src={image}/>
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
                </div>
                <div className={'character-card-read-more'} onClick={() => modalHandler(character)}>
                    <p className={'read-more-text'}>Read More</p>
                    <span className={'read-more-icon'}/>
                </div>
            </div>
        </div>
    );

    //Skeleton card for when the Character card is in Loading State (Is rendered on top of the card)
    const loadingSkeletonCard = (
        <div className={'character-card-loading'}>
            <div className={'character-card-loading-modal'}>
            </div>
            <p className={'character-card-loading-modal-text'}>Loading...</p>
        </div>
    );

    return (
        <div className={'character-card'}>
            {characterCard}
            {loading && loadingSkeletonCard}
        </div>
    );

};


export default CharacterCard;