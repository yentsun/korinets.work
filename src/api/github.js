import { timeSince } from '../util';


const GITHUB_API = 'https://api.github.com/users';

export async function fetchGithubUser(path) {
    const res = await fetch(`${GITHUB_API}${path}`);
    const { public_repos, followers } = await res.json();
    return {
        major: `repos: ${public_repos}`,
        minor: `followers: ${followers}`,
    };
}

export async function fetchGithubEvents(path) {
    const res = await fetch(`${GITHUB_API}${path}`);
    const events = await res.json();
    const { type, repo: { name }, created_at, payload, actor } = events[0];
    let actionType;
    let actionString;
    switch (type) {
        case 'PushEvent':
            actionType = 'push';
            const { message, sha } = payload.commits[0];
            actionString = `#${sha.slice(0, 7)} ${message} by ${actor.login}`;
            break;
        case 'IssuesEvent':
            const { number, title } = payload.issue;
            actionType = `issue ${payload.action}`;
            actionString = `#${number} ${title} by ${actor.login}`;
            break;
        case 'WatchEvent':
            const { action } = payload;
            actionType = `watch`;
            actionString = `${action} by ${actor.login}`;
            break;
        case 'CreateEvent':
            const { ref, ref_type } = payload;
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
}
