import so from './api/so';
import {githubUsers, githubEvents} from './api/github';
import {lastfmUser, lastfmRecent, lastfmUserArtists} from './api/lastfm';


export default [

    {
        id: "static",
        data: {
            "major": "Max Korinets",
            "minor": "software engineer",
            "content": "Don't let simplicity fool you: there is hard work " +
            "behind it most of the times."
        },
        href: null,
        thumb: "userpic.gif",
        priority: 100
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
        id: 'lastfm',
        data: null,
        apis: [
            [lastfmUser.get, []],
            [lastfmUserArtists.get, []],
            [lastfmRecent.get, []],
        ],
        href: "https://www.last.fm/user/yentsun",
        thumb: "lastfm.gif",
        priority: 0
    },

    {
        id: 'upwork',
        data: {
            major: '976h worked',
            minor: 'Full-stack Engineer',
            content: '100% job success rate; $26.00/hour; $20k+ total earned'
        },
        href: "https://www.upwork.com/o/profiles/users/_~0140fc4962d00eda15/",
        thumb: "upwork.gif",
        priority: 60
    }

]
