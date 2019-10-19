import React from 'react';
import useFetchData from '../hooks/useFetchData';


export default function Card({ href, thumb, apis, data: staticData }) {

    const link = (typeof href === "string") ? href : null;
    const clickHandler = (typeof href === "function") ? href : null;
    const data = useFetchData({ apis, staticData });

    return data === null ? (<div className="card"><h1>Loading...</h1></div>) : (
        <div>
            <a href={ link } onClick={ clickHandler } className="card">
                <div className="thumb" style={{backgroundImage: `url(${thumb})`}}/>
                { data !== false ?
                    <article>
                        <h1>{data.major}</h1>
                        <span>{data.minor}</span>
                        <p>{data.content}</p>
                    </article>
                    :
                    <article><h1>No data!</h1></article>
                }
            </a>
        </div>
    );
}
