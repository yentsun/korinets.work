import so from '../../api/so';
import {githubUsers, githubEvents} from '../../api/github';
import {lastfmUser, lastfmRecent, lastfmUserArtists} from '../../api/lastfm';
import {npmRegistry} from '../../api/npm';
import {generatePassword, timeSince} from '../../util';


export default [

    {
        id: "bio",
        data: {
            "major": "Maksim Korinets",
            "minor": "freelance software engineer",
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
            content: '100% job success rate; $40.00/hour; $20k+ total earned'
        },
        href: "https://www.upwork.com/o/profiles/users/_~0140fc4962d00eda15/",
        thumb: "upwork.gif",
        priority: 60
    },

    {
        id: 'password',
        data: {
            major: 'Generate password',
            minor: 'experimental, strong',
            content: 'Lowercase, uppercase, numbers, special chars, hieroglyphs ' +
                     '- basically most of unicode chars.' +
                     " Experimental and unreasonably secure."
        },
        href: generatePassword,
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
        href: 'https://github.com/orgs/venture-api/projects/1',
        thumb: "venture.gif",
        priority: 60
    },

    {
        id: 'construction',
        data: {
            major: 'v3.5.0',
            minor: 'Under construction',
            content: 'This website is being constantly developed. I add new cards, ' +
                     'backend APIs, etc. Click to see the repos.'
        },
        href: 'https://github.com/orgs/korinets-name/projects',
        thumb: "construction.gif",
        priority: 0
    }

]
