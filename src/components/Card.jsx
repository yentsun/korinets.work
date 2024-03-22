import React from 'react';
import useFetchData from '../hooks/useFetchData';


export default function Card({ href, thumb, major, minor, content, isLoading }) {

    return <div className="card" onClick={ () => window.location = href }>

        { isLoading &&
        <h1>Loading...</h1> }

        <div className="thumb" style={ { backgroundImage: `url(${ thumb })` } }/>

        { ! isLoading && <>
        <article>
            <h1>{ major }</h1>
            <span>{ minor }</span>
            <p>{ content }</p>
        </article>

        </> }
    </div>

}
