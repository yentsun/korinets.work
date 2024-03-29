import so from './api/so';
import {githubUsers, githubEvents} from './api/github';
import {gitlabUsers, gitlabEvents} from './api/gitlab';
import {lastfmUser, lastfmRecent, lastfmUserArtists} from './api/lastfm';
import {npmRegistry} from './api/npm';
import {requestPassword, timeSince} from './util';


export default [

    {
        id: "bio",
        data: {
            "major": "Maksim Korinets",
            "minor": "freelance software engineer",
            "content": "Embrace simplicity: there is hard work " +
                       "behind it (most of the time)."
        },
        href: null,
        thumb: "userpic.gif",
        priority: 100
    },

    {
        id: "email",
        data: {
            "major": "mkorinets@gmail.com",
            "minor": "hangouts on",
            "content": "Its a good way to start communication with an introductory email " +
                       "or message. Respect the working vibe."

        },
        href: "mailto:mkorinets@gmail.com",
        thumb: "gmail.gif",
        priority: 0
    },

    {
        id: "SO",
        data: null,
        apis: [
            [so.get, ['/users/216042?site=stackoverflow']]
        ],
        href: "https://stackoverflow.com/users/216042/yentsun",
        thumb: "so.gif",
        priority: 10
    },
    {
        id: 'gitlab',
        data: null,
        apis: [
            [gitlabUsers.get, ['?username=mkorinets']],
            [gitlabEvents.get, ['/mkorinets/events']]
        ],
        href: 'https://gitlab.com/mkorinets',
        thumb: 'gitlab.gif',
        priority: 71
    },
    {
        id: 'github',
        data: null,
        apis: [
            [githubUsers.get, ['/yentsun']],
            [githubEvents.get, ['/yentsun/events']]
        ],
        href: "https://github.com/yentsun",
        thumb: "github.gif",
        priority: 70
    },
    {
        id: 'npm',
        data: null,
        apis: [
            [npmRegistry.get, ['/search?text=maintainer:yentsun']]
        ],
        href: "https://www.npmjs.com/~yentsun",
        thumb: "npm.gif",
        priority: 65
    },

    {
        id: 'lastfm',
        data: null,
        apis: [
            [ lastfmUser.get, [ '?method=user.getinfo&user=yentsun&api_key=eb51b2a9770101f794382992bb62457b&format=json' ]],
            [ lastfmUserArtists.get, [ '?method=user.getTopArtists&user=yentsun&api_key=eb51b2a9770101f794382992bb62457b&format=json' ]],
            [ lastfmRecent.get, [ '?method=user.getRecentTracks&user=yentsun&api_key=eb51b2a9770101f794382992bb62457b&nowplaying=true&format=json' ]],
        ],
        href: "https://www.last.fm/user/yentsun",
        thumb: "lastfm.gif",
        priority: 10
    },

    {
        id: 'upwork',
        data: {
            major: 'Hire me!',
            minor: 'JS Engineer, CTO',
            content: '100% rate (top rated); $35.00/hour; 13 jobs; 2684h worked; $70k+ total earned; '
        },
        href: "https://www.upwork.com/o/profiles/users/_~0140fc4962d00eda15/",
        thumb: "upwork.gif",
        priority: 60
    },

    {
        id: 'password',
        data: {
            major: 'Generate password',
            minor: '20 chars long (very strong)',
            content: 'Lowercase, uppercase, numbers, special chars, some hieroglyphs.' +
                     " Well tested in real life and reasonably secure."
        },
        href: requestPassword,
        thumb: "password.gif",
        priority: 60
    },

    {
        id: 'venture',
        data: {
            major: 'Venture API',
            minor: 'current project',
            content: 'A game for API developers of all levels. You mine and ' +
                     'produce resources, transport, trade, etc. with API calls. '+
                     `Started at Dec 3, 2017 (${timeSince(new Date('2017-12-03'))} ago)`
        },
        href: 'https://gitlab.com/groups/venture-api/-/boards?=',
        thumb: "venture.gif",
        priority: 60
    },

    {
        id: 'construction',
        data: {
            major: process.env.REACT_APP_VERSION,
            minor: 'Under construction',
            content: 'This website is being constantly developed. I add new cards, ' +
                     'backend APIs, etc. Click to see the progress.'
        },
        href: 'https://gitlab.com/groups/korinets-name/-/boards?=',
        thumb: "construction.gif",
        priority: 0
    }

]
