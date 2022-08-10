import { Component } from 'react';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        charData: [],
        error: false,
        spinner: true,
        newCharsLoading: false,
        offset: 1540,
        offsetEnd: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) => {
        this.setState({error: false, newCharsLoading: true})

        this.marvelService.getAllCharacters(offset)
        .then(this.onLoaded)
        .catch(this.onError);
    }

    onLoaded = (newCharData) => {
        let ended = newCharData.length < 9 ? true : false;

        this.setState(({charData,offset}) => ({
            charData: [...charData, ...newCharData], 
            spinner: false, 
            newCharsLoading: false,
            offset: offset + 9,
            offsetEnd: ended
        }))
    }

    onError = () => {
        this.setState({error: true, spinner: false, newCharsLoading: false});
    }

    render() {
        const {charData, error, spinner, newCharsLoading, offsetEnd} = this.state

        const charList = charData.map(item => {
            let {id, name, thumbnail} = item;

            const imgStyle = /image_not_available/ig.test(thumbnail) ? {objectFit: 'contain'} : null;

            return (
                <li key={id} onClick={() => this.props.onGetCharId(id)} className="char__item">
                    <img src={thumbnail} style={imgStyle} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        const content = !spinner && !error && !newCharsLoading ? charList : null;
        const loading = spinner ? <Spinner /> : null;
        const errorMessage = error ? <Error /> : null;
        const newCharList = newCharsLoading ? <Spinner /> : null;

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {content}
                    {loading}
                    {newCharList}
                    {errorMessage}
                </ul>
                <button className="button button__main button__long"
                        style={{display: offsetEnd ? 'none' : 'block'}}
                        onClick={() => this.onRequest(this.state.offset)} 
                        disabled={newCharsLoading}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;