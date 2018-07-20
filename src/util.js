import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


export const timeSince = (date) => {

    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }

    return Math.floor(seconds) + " seconds";
};


export const average = (values) => {

    const sum = values.reduce((a, b) => b += a);
    return sum / values.length;
};


export const median = (values) => {

    values.sort((a,b) => a - b);
    const half = Math.floor(values.length/2);
    return (values.length % 2) ?
        values[half] :
        (values[half-1] + values[half]) / 2.0;
};

export const requestPassword = (e) => {

    const client = new ApolloClient({
        uri: process.env.NODE_ENV === 'production'
            ? 'https://back.korinets.name/graphql'
            : "http://localhost:8000/graphql"
    });

    let p = e.target.parentElement.getElementsByTagName('p')[0];
    if (p) {
        console.log('requesting password...');
        client
        .query({query: gql`{password}`})
        .then(result => {
            p.innerText = '';
            const textArea = p.getElementsByTagName('textarea');
            const passwordHolder = textArea.length
                ? textArea[0]
                : document.createElement("textarea");
            p.appendChild(passwordHolder);
            passwordHolder.innerText = `${result.data.password}`;
            passwordHolder.addEventListener('focus', () => {
                passwordHolder.select();
                document.execCommand('copy');
                console.log('copied');
            }, false );
            console.log('done', result.data.password);
        });
    }
};
