import { timeSince } from '../util';
import createApi from './createApi';

const LASTFM_BASE = 'https://ws.audioscrobbler.com/2.0';

export const lastfmUser = createApi(LASTFM_BASE, (res) => {
    const { playcount } = res.data.user;
    return { major: `Tracks: ${playcount}` };
});

export const lastfmUserArtists = createApi(LASTFM_BASE, (res) => {
    const {'@attr': attr} = res.data.topartists;
    return { minor: `Artists: ${attr.total}` };
});

export const lastfmRecent = createApi(LASTFM_BASE, (res) => {
    const {artist, name, date, '@attr': attr} = res.data.recenttracks.track[0];
    let when;
    if (date) {
        const playedAt = new Date(parseInt(date.uts, 10) * 1000);
        when = `${timeSince(new Date(playedAt))} ago`;
    } else if (attr && attr.nowplaying) {
        when = 'now';
    }
    return { content: `Playing: ${artist['#text']} - ${name} (${when})` };
});
