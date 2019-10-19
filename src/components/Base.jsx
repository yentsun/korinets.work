import React from 'react';
import cardsData from '../data';
import Card from './Card';


export default function Base() {

    cardsData.sort((a, b) => b.priority - a.priority);

    return (
        <div className="band">
            { cardsData.map((card) => <Card key={card.id} {...card}/>) };
        </div>
    );
}
