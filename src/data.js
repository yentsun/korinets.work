import so from './api/so';
import {githubUsers, githubEvents} from './api/github';
import {lastfmUser, lastfmRecent, lastfmUserArtists} from './api/lastfm';
import {npmRegistry} from './api/npm';


export default [

    {
        id: "bio",
        data: {
            "major": "Maksim Korinets",
            "minor": "software engineer",
            "content": "Don't let simplicity fool you: there is hard work " +
                       "behind it most of the time."
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
            [so.get, ['/users/216042']]
        ],
        href: "https://stackoverflow.com/users/216042/yentsun",
        thumb: "so.gif",
        priority: 10
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
            [lastfmUser.get, []],
            [lastfmUserArtists.get, []],
            [lastfmRecent.get, []],
        ],
        href: "https://www.last.fm/user/yentsun",
        thumb: "lastfm.gif",
        priority: 10
    },

    {
        id: 'upwork',
        data: {
            major: '976h worked',
            minor: 'Full-stack JS Developer',
            content: '100% job success rate; $24.00/hour; $20k+ total earned'
        },
        href: "https://www.upwork.com/o/profiles/users/_~0140fc4962d00eda15/",
        thumb: "upwork.gif",
        priority: 60
    }

]
