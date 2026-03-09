import { useState, useEffect } from 'react';
import cardsData from '../data';
import Card from './Card';


export default function Base() {

    cardsData.sort((a, b) => b.priority - a.priority);

    const [openCard, setOpenCard] = useState(() => {
        const hash = window.location.hash.slice(1);
        return hash || null;
    });

    useEffect(() => {
        const onHashChange = () => {
            const hash = window.location.hash.slice(1);
            setOpenCard(hash || null);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    const handleOpen = (id) => {
        window.location.hash = id;
        setOpenCard(id);
    };

    const handleClose = () => {
        history.pushState(null, '', window.location.pathname);
        setOpenCard(null);
    };

    return (
        <div className="band">
            { cardsData.map((card) => (
                <Card
                    key={card.id}
                    {...card}
                    isOpen={openCard === card.id}
                    onOpen={handleOpen}
                    onClose={handleClose}
                />
            )) };
        </div>
    );
}
