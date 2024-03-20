import useSWR from 'swr';
import { getFetcher } from '../getFetcher';
import { useMemo } from 'react';
import { timeSince } from '../util';


export default function useGithub() {

    const { data: yentsun } = useSWR('https://api.github.com/users/yentsun', getFetcher());
    const { data: events } = useSWR('https://api.github.com/users/yentsun/events', getFetcher());

    const lastEvent = useMemo(() => {

        if (! events) return;

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

        return { name, type: actionType, text: actionString, createdAgo: timeSince(new Date(created_at)) };

    }, [ events ]);

    return { yentsun, lastEvent }
}
