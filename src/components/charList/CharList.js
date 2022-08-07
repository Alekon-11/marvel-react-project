import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        charData: []
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.setCharList();
    }

    setCharList = () => {
        this.marvelService.getAllCharacters()
        .then(charData => this.setState({charData}))
    }

    render() {
        const list = this.state.charData.map(item => {
            let {id, name, thumbnail} = item;

            const imgStyle = /image_not_available/ig.test(thumbnail) ? {objectFit: 'contain'} : null;

            return (
                <li key={id} onClick={() => this.props.onGetCharId(id)} className="char__item">
                    <img src={thumbnail} style={imgStyle} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {list}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;