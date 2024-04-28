import useSWR from 'swr';
import { getFetcher } from '../getFetcher';
import { useMemo } from 'react';
import { timeSince } from '../util';


export default function useGitLab() {

    const { data: yentsun } = useSWR('https://gitlab.com/api/v4/users?username=mkorinets', getFetcher());
    const { data: events } = useSWR('https://gitlab.com/api/v4/users/mkorinets/events', getFetcher());

    const content = useMemo(() => {

        if (! events) return;

        const {target_type, action_name, target_iid, target_title, push_data, note, created_at} = events[0];
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

        return `[${actionType}] ${actionString} (${timeSince(new Date(created_at))} ago)`;

    }, [ events ]);

    return { content,
        major: yentsun ? `username: ${yentsun[0].username}` : '...',
        minor: yentsun ? `state: ${yentsun[0].state}` : '...' };
}
