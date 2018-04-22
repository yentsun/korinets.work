import React, {Component} from 'react';
import cardsData from '../Card/data';
import Card from '../Card/Card';
import './App.css';


export default class App extends Component {

    render() {
        cardsData.sort((a, b) => b.priority - a.priority);
        return (
            <div className="band">
                {cardsData.map((card) => {
                    return <Card key={card.id} {...card}/>
                })};
            </div>
        );
    }
}
