import React, {useEffect, useState} from 'react';
import styles from '../styles/index.scss';
import CharacterCard from '../components/CharacterCard/CharacterCard';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import CharacterDetailModals from '../components/CharacterDetailsModal/CharacterDetailsModal';
import Modal from 'react-modal';
import API_URLS from '../api-urls';

class App extends React.Component {

    //Server-side renders the page. Fetches page information before rendering the page and returns data to React Page
    static async getInitialProps({query: {page = 1}}) {
        if (page < 1) {
            page = 1;
        }

        const res = await fetch(`${API_URLS.CHARACTER_URL}?page=${page}`);
        const json = await res.json();
        if (page > json.info.pages) {
            page = json.info.pages;
        }
        //Returned data recieved by React Page Props
        return {characters: json.results, page, totalPages: json.info.pages};
    };


    constructor(props) {
        super(props);
        //Set Modal App Element
        Modal.setAppElement('body');
    }

    /*
    loading - Loading State for Character Cards
    characterDetailsModalStatus - Character Modal Flag for toggling Modal
    character - character state for character details modal
    page - page state for pagination of API
     */
    state = {
        loading: false,
        characterDetailsModalStatus: false,
        character: '',
        page: this.props.page,
    };


    //Increments router path 'page' query
    nextPage = () => {
        if (this.props.page < this.props.totalPages) {
            //Enables Loading State for Character Cards, increments page and disbales Loading after timeout
            this.setState(prevState => ({
                loading: true,
                page: Number.parseInt(prevState.page) + 1 + '',
            }), () => {
                Router.push(`/?page=${this.state.page}`)
                    .catch(err => console.log(err));


                setTimeout(() => {
                    this.setState({loading: false});
                }, 300);
            });
        }
    };

    //Decrements router path 'page' query
    previousPage = () => {
        //Enables Loading State for Character Cards, increments page and disbales Loading after timeout
        if (this.props.page > 1) {
            this.setState(prevState => ({
                loading: true,
                page: Number.parseInt(prevState.page) - 1 + '',
            }), () => {
                Router.push(`/?page=${this.state.page}`)
                    .catch(err => console.log(err));


                setTimeout(() => {
                    this.setState({loading: false});
                }, 300);
            });
        }
    };


    //Toggle Handler for Character Details Modal - useful for closing modal when it is active
    toggleCharacterModal = () => {
        this.setState(prevState => ({
            characterDetailsModalStatus: !prevState.characterDetailsModalStatus
        }));
    };

    //Method for when a character card 'read-more' is clicked, saves the clicked character to state and toggles character-details modal
    openCharacterDetails = (character) => {
        this.setState({
            character: character,
        }, () => {
            this.setState({characterDetailsModalStatus: true,});
        });
    };

    render() {
        //Iterates over characters list and maps them into CharacterCard Component
        const CharacterCards = (
            <div className={'character-list'}>
                {this.props.characters.map((character, index) => (
                    <CharacterCard
                        key={index}
                        modalHandler={character => this.openCharacterDetails(character)}
                        character={character}
                        loading={this.state.loading}/>
                ))}
            </div>
        );

        //Only show CharacterDetailsModal when a character is selected
        const characterDetailsModal = this.state.character ? (
            <CharacterDetailModals
                modalStatus={this.state.characterDetailsModalStatus}
                toggleModal={this.toggleCharacterModal}
                character={this.state.character}/>) : '';

        return (
            <div id={'main'}>
                {characterDetailsModal}
                <div className={'banner'}>
                    <p className={'banner-title'}>Rick and Morty Characters</p>
                </div>
                <div className={'pagination-buttons'}>
                    <button onClick={this.previousPage}>
                        <p>{'<'}</p>
                    </button>
                    <button onClick={this.nextPage}>
                        <p>{'>'}</p>
                    </button>
                </div>
                <div className={'character-container'}>
                    {CharacterCards}
                </div>
                <div className={'pagination-buttons'}>
                    <button onClick={this.previousPage}>
                        <p>{'<'}</p>
                    </button>
                    <button onClick={this.nextPage}>
                        <p>{'>'}</p>
                    </button>
                </div>
            </div>
        );
    }
}


export default App;