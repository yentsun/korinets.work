import React, {Component} from 'react';
import data from '../../data';
import Card from '../Card/Card';
import './App.css';


export default class App extends Component {

    render() {
        return (
            <div className="band">
                {data.map((card) => {
                    return <Card key={card.id} {...card}/>
                })};
            </div>
        );
    }
}
