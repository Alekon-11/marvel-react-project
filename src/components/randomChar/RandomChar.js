import {Component} from 'react';

import './randomChar.scss';
import MarvelService from '../../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component{
    state = {
        char: {}
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    onCharLoaded = (char) => {
        this.setState({char}) // объект, приходящий из res сам подстраиваеттся под свойства State объекта
    }

    updateChar = () => {
        const id = Math.round(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService.getCharacter(id)
        .then(this.onCharLoaded)               // таким образом, res будет сам вызывать функцию и подставляться в качестве аргумента
        .catch(() => console.log('blaBlaBla'));
    }

    render(){
        const {char:{thumbnail, name, descr, homepage, wiki}} = this.state;

        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">{descr ? `${descr.slice(0,370)}...` : 'Description not found...'}</p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
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

export default RandomChar;