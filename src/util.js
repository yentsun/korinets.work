import ApolloClient from "apollo-boost";
import gql from "graphql-tag";


const graphqlUri = process.env.NODE_ENV === 'production'
    ? 'https://back.korinets.name/graphql'
    : "http://localhost:8000/graphql";


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


function requestGraphqlValue(fieldName) {
    return (e) => {
        const client = new ApolloClient({ uri: graphqlUri });

        let p = e.target.parentElement.getElementsByTagName('p')[0];
        if (p) {
            console.log(`requesting ${fieldName}...`);
            client
            .query({query: gql`{${fieldName}}`})
            .then(result => {
                p.innerText = '';
                const textArea = p.getElementsByTagName('textarea');
                const valueHolder = textArea.length
                    ? textArea[0]
                    : document.createElement("textarea");
                p.appendChild(valueHolder);
                valueHolder.innerText = `${result.data[fieldName]}`;
                valueHolder.addEventListener('focus', () => {
                    valueHolder.select();
                    document.execCommand('copy');
                    console.log('copied');
                }, false );
                console.log('done', result.data[fieldName]);
            });
        }
    };
}

export const requestPassword = requestGraphqlValue('password');
export const requestUUID = requestGraphqlValue('uuid');
