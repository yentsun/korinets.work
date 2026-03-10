import { timeSince } from '../util';


const LASTFM_API = 'https://ws.audioscrobbler.com/2.0';
const LASTFM_KEY = import.meta.env.VITE_LASTFM_KEY;

export async function fetchLastfmUser(path) {
    const res = await fetch(`${LASTFM_API}${path}&api_key=${LASTFM_KEY}`);
    const data = await res.json();
    if (!data.user) return { major: 'N/A' };
    const { playcount } = data.user;
    return {
        major: `Tracks: ${playcount}`,
    };
}

export async function fetchLastfmUserArtists(path) {
    const res = await fetch(`${LASTFM_API}${path}&api_key=${LASTFM_KEY}`);
    const data = await res.json();
    if (!data.topartists) return { minor: '' };
    const { '@attr': attr } = data.topartists;
    return {
        minor: `Artists: ${attr.total}`,
    };
}

export async function fetchLastfmRecent(path) {
    const res = await fetch(`${LASTFM_API}${path}&api_key=${LASTFM_KEY}`);
    const data = await res.json();
    if (!data.recenttracks || !data.recenttracks.track || !data.recenttracks.track.length) {
        return { content: 'No recent tracks' };
    }
    const { artist, name, date, '@attr': attr } = data.recenttracks.track[0];
    let when;
    if (date) {
        const playedAt = new Date(parseInt(date.uts, 10) * 1000);
        when = `${timeSince(new Date(playedAt))} ago`;
    } else if (attr && attr.nowplaying) {
        when = 'now';
    }
    return {
        content: `Playing: ${artist['#text']} - ${name} (${when})`
    };
}
