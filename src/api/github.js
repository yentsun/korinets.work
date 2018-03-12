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
    const {type, repo: {name}, created_at, payload} = res.data[0];
    let actionType;
    let action;
    switch (type) {
        case 'PushEvent':
            actionType = 'push';
            const {message, ref} = payload.commits;
            action = `#${ref} ${message}`;
            break;
        case 'IssuesEvent':
            actionType = 'new issue';
            const {number, title} = payload.issue;
            action = `#${number} ${title}`;
            break;
        default:
            actionType = 'unknown';
            action = `???`;
            break;
    }

    return {
        content: `${name}:
                  [${actionType}] ${action}
                  ${timeSince(new Date(created_at))} ago`
    };
});
