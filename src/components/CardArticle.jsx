import React from 'react';


export default function CardArticle({ major, minor, content }) {
    return (
        <article>
            <h1>{major}</h1>
            {minor && <span>{minor}</span>}
            {content && <p>{content}</p>}
        </article>
    );
}
