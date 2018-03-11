import React, {Component} from 'react';
import data from './data'
import Card from '../Card/Card';
import './App.css';


class App extends Component {



    render() {
        return (
            <div className="band">
                {data.map((card, index) => {
                    return <Card key={index} {...card}/>
                })};
            </div>
        );
    }
}

export default App;
