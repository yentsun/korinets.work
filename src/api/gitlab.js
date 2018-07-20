import axios from 'axios';
import {timeSince} from '../util';


export const gitlabUsers = axios.create({
    baseURL: 'https://gitlab.com/api/v4/users'
});

gitlabUsers.interceptors.response.use((res) => {
    const {
        username,
        state,
    } = res.data[0];
    return {
        major: `username: ${username}`,
        minor: `state: ${state}`,
    };
});

export const gitlabEvents = axios.create({
    baseURL: 'https://gitlab.com/api/v4/users'
});

gitlabEvents.interceptors.response.use((res) => {
    const {target_type, action_name, target_iid, target_title, push_data, note, created_at} = res.data[0];
    let actionType;
    let actionString;
    switch (target_type) {
        case null:
            actionType = 'push';
            const {commit_to, commit_title} = push_data;
            actionString = `#${commit_to.slice(0, 7)} ${commit_title}`;
            break;
        case 'Issue':
            actionType = `issue ${action_name}`;
            actionString = `#${target_iid} ${target_title}`;
            break;
        case 'Note':
            const {body, noteable_iid} = note;
            actionType = `note`;
            actionString = `#${noteable_iid}: ${body}`;
            break;
        default:
            actionType = target_type;
            actionString = `???`;
            break;
    }

    return {
        content: `[${actionType}] ${actionString}
                  (${timeSince(new Date(created_at))} ago)`
    };
});
