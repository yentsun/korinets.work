import axios from 'axios';
import {timeSince} from '../util';


export const githubUsers = axios.create({
    baseURL: 'https://api.github.com/users'
});

githubUsers.interceptors.response.use((res) => {
    const {
        public_repos,
        followers,
    } = res.data;
    return {
        major: `repos: ${public_repos}`,
        minor: `followers: ${followers}`,
    };
});

export const githubEvents = axios.create({
    baseURL: 'https://api.github.com/users'
});

githubEvents.interceptors.response.use((res) => {
    const {type, repo: {name}, created_at, payload, actor} = res.data[1];
    let actionType;
    let actionString;
    switch (type) {
        case 'PushEvent':
            actionType = 'push';
            const {message, sha} = payload.commits[0];
            actionString = `#${sha.slice(0, 7)} ${message} by ${actor.login}`;
            break;
        case 'IssuesEvent':
            const {number, title} = payload.issue;
            actionType = `issue ${payload.action}`;
            actionString = `#${number} ${title} by ${actor.login}`;
            break;
        case 'WatchEvent':
            const {action} = payload;
            actionType = `watch`;
            actionString = `${action} by ${actor.login}`;
            break;
        case 'CreateEvent':
            const {ref, ref_type} = payload;
            actionType = `create`;
            actionString = `${ref_type} "${ref}" by ${actor.login}`;
            break;
        default:
            actionType = type;
            actionString = `???`;
            break;
    }

    return {
        content: `${name}:
                  [${actionType}] ${actionString}
                  (${timeSince(new Date(created_at))} ago)`
    };
});
