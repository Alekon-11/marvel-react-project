import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
// import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
    state = {
        char: null,
        spinner: false,
        error: false
    }
    marvelService = new MarvelService();
    
    componentDidMount(){
        this.onSetCharInfo();
    }

    componentDidUpdate(prevProps){
        if(prevProps.charId !== this.props.charId){
            this.onSetCharInfo();
        }
    }

    onSetCharInfo = () => {
        if(!this.props.charId){
            return;
        }

        this.setState({spinner: true, error: false});

        this.marvelService.getCharacter(this.props.charId)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({char, spinner: false, error: false}) // объект, приходящий из res сам подстраиваеттся под свойства State объекта
    }

    onError = () => {
        this.setState({spinner: false, error: true})
    }

    render() {
        const {char, spinner, error} = this.state;

        const skeleton = char || spinner || error ? null : <Skeleton />;
        const loading = spinner ? <Spinner /> : null;
        const errorMessage = error ? <Error /> : null;
        const content = !spinner && !error && char ? <View char={char} /> : null;


        return (
            <div className="char__info">
                {skeleton}
                {loading}
                {errorMessage}
                {content}
            </div>
        )
    }
    
}

function View({char}){

    const {thumbnail, name, descr, homepage, wiki, comics} = char;
    
    const description = descr ? `${descr.length > 210 ? `${descr.slice(0,210)}...` : descr}` : 'Description not found...'
    const imgStyle = /image_not_available/ig.test(thumbnail) ? {objectFit: 'contain'} : null;

    const comicsList = comics.map((item, num) => {
        return <li key={num} className="char__comics-item">{item.name}</li>
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length ? comicsList.slice(0, 12) : 'Comics not found...'}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;