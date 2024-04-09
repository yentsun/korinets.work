import useSWR from 'swr';
import { getFetcher } from '../getFetcher';
import { useMemo } from 'react';
import { timeSince } from '../util';


export default function useStackOverflow() {

    const { data, isLoading } = useSWR('https://api.stackexchange.com/2.2/users/216042?site=stackoverflow', getFetcher());

    return useMemo(() => {

        if (! data) return {};

        const {
            reputation,
            accept_rate,
            last_access_date,
            reputation_change_month,
            badge_counts: {
                bronze,
                silver,
                gold
            }
        } = data.items[0];

        const lastSeen = new Date(parseInt(last_access_date, 10) * 1000);

        return { reputation, gold, silver, bronze, isLoading,
                 acceptRate: accept_rate,
                 reputationChangeMonth: reputation_change_month,
                 seenAgo: timeSince(lastSeen) };

    }, [ data, isLoading ]);
}
