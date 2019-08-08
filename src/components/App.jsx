import React, {Component} from 'react';
import cardsData from '../data';
import Card from './Card';


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
