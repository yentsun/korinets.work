import { timeSince } from '../util';


const LASTFM_API = 'https://ws.audioscrobbler.com/2.0';

export async function fetchLastfmUser(path) {
    const res = await fetch(`${LASTFM_API}${path}`);
    const data = await res.json();
    const { playcount } = data.user;
    return {
        major: `Tracks: ${playcount}`,
    };
}

export async function fetchLastfmUserArtists(path) {
    const res = await fetch(`${LASTFM_API}${path}`);
    const data = await res.json();
    const { '@attr': attr } = data.topartists;
    return {
        minor: `Artists: ${attr.total}`,
    };
}

export async function fetchLastfmRecent(path) {
    const res = await fetch(`${LASTFM_API}${path}`);
    const data = await res.json();
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
