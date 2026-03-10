import { timeSince } from '../util';


const SO_API = 'https://api.stackexchange.com/2.2';
const SO_KEY = import.meta.env.VITE_SO_KEY;

export async function fetchStackOverflow(path) {
    const url = new URL(`${SO_API}${path}`);
    url.searchParams.set('key', SO_KEY);
    url.searchParams.set('site', 'stackoverflow');
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items || !data.items.length) return { major: 'N/A', minor: '', content: 'No data available' };
    const {
        reputation,
        accept_rate,
        last_access_date,
        reputation_change_month,
        badge_counts: { bronze, silver, gold }
    } = data.items[0];
    const lastSeen = new Date(parseInt(last_access_date, 10) * 1000);
    return {
        major: reputation,
        minor: `🔶️ ${gold}   🔵️ ${silver}   🔴️ ${bronze}`,
        content: `accept rate: ${accept_rate}%; reputation change (month): ${reputation_change_month}; last seen: ${timeSince(lastSeen)} ago`
    };
}
