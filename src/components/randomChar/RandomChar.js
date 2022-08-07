import {Component} from 'react';

import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import './randomChar.scss';


class RandomChar extends Component{
    state = {
        char: {},
        spinner: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char, spinner: false, error: false}) // объект, приходящий из res сам подстраиваеттся под свойства State объекта
    }

    onError = () => {
        this.setState({spinner: false, error: true})
    }

    updateChar = () => {
        const id = Math.round(Math.random() * (1011400 - 1011000) + 1011000);

        this.setState({spinner: true, error: false});

        this.marvelService.getCharacter(id)
        .then(this.onCharLoaded) 
        .catch(this.onError);
    }

    render(){
        const {char, spinner, error} = this.state;
        const loading = spinner ? <Spinner /> : null;
        const errorMessage = error ? <Error /> : null;
        const content = !spinner && !error ? <View char={char} /> : null;

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    {loading}
                    {errorMessage}
                    {content}
                </div>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar}className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    } 
}

function View({char}){
    let {thumbnail, name, descr, homepage, wiki} = char;

    const description = descr ? `${descr.length > 210 ? `${descr.slice(0,210)}...` : descr}` : 'Description not found...'
    const imgStyle = /image_not_available/ig.test(thumbnail) ? {objectFit: 'contain'} : null;

    return (
        <>
            <img src={thumbnail} style={imgStyle} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;