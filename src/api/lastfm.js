import axios from 'axios';
import { timeSince } from '../util';


export const lastfmUser = axios.create({ baseURL: 'https://ws.audioscrobbler.com/2.0' });

lastfmUser.interceptors.response.use((res) => {
    const {
        playcount
    } = res.data.user;
    return {
        major: `Tracks: ${playcount}`,
    };
});

export const lastfmUserArtists = axios.create({ baseURL: 'https://ws.audioscrobbler.com/2.0' });

lastfmUserArtists.interceptors.response.use((res) => {
    const {'@attr': attr} = res.data.topartists;
    return {
        minor: `Artists: ${attr.total}`,
    };
});

export const lastfmRecent = axios.create({ baseURL: 'https://ws.audioscrobbler.com/2.0' });

lastfmRecent.interceptors.response.use((res) => {
    const {artist, name, date, '@attr': attr} = res.data.recenttracks.track[0];
    let when;
    if (date) {
        const playedAt = new Date(parseInt(date.uts, 10) * 1000);
        when = `${timeSince(new Date(playedAt))} ago`
    } else if (attr && attr.nowplaying) {
        when = 'now'
    }
    return {
        content: `Playing: ${artist['#text']} - ${name} (${when})`
    };
});
