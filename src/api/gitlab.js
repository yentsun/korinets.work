import { timeSince } from '../util';
import createApi from './createApi';


export const gitlabUsers = createApi(
    'https://gitlab.com/api/v4/users',
    (res) => {
        const { username, state } = res.data[0];
        return {
            major: `username: ${username}`,
            minor: `state: ${state}`,
        };
    }
);

export const gitlabEvents = createApi(
    'https://gitlab.com/api/v4/users',
    (res) => {
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
    }
);
