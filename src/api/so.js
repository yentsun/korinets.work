import { timeSince } from '../util';
import createApi from './createApi';


const so = createApi(
    'https://api.stackexchange.com/2.2',
    (res) => {
        const {
            reputation,
            accept_rate,
            last_access_date,
            reputation_change_month,
            badge_counts: { bronze, silver, gold }
        } = res.data.items[0];
        const lastSeen = new Date(parseInt(last_access_date, 10) * 1000);
        return {
            major: reputation,
            minor: `🔶️ ${gold}   🔵️ ${silver}   🔴️ ${bronze}`,
            content: `accept rate: ${accept_rate}%; reputation change (month): ${reputation_change_month}; last seen: ${timeSince(lastSeen)} ago`
        };
    },
    {
        key: 'U4DMV*8nvpm3EOpvf69Rxw((',
        site: 'stackoverflow'
    }
);

export default so;
