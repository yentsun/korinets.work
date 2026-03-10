import React from 'react';
import useFetchData from '../hooks/useFetchData';
import Thumb from './Thumb';
import CardArticle from './CardArticle';


export default function Card({ href, thumb, apis, data: staticData }) {

    const link = (typeof href === "string") ? href : null;
    const clickHandler = (typeof href === "function") ? href : null;
    const data = useFetchData({ apis, staticData });

    if (data === null) {
        return <div className="card"><CardArticle major="Loading..." /></div>;
    }

    return (
        <div>
            <a href={ link } onClick={ clickHandler } className="card">
                <Thumb src={ thumb } />
                { data !== false
                    ? <CardArticle {...data} />
                    : <CardArticle major="No data!" />
                }
            </a>
        </div>
    );
}
