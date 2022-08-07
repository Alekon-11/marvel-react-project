import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component{
    state = {
        charId: null
    }

    onGetCharId = (id) => {
        this.setState({charId: id})
    }

    render(){
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onGetCharId={this.onGetCharId}/>
                        <ErrorBoundary> 
                            <CharInfo charId={this.state.charId}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;