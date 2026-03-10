import { fetchStackOverflow } from './api/so';
import { fetchGithubUser, fetchGithubEvents } from './api/github';
import { fetchLastfmUser, fetchLastfmRecent, fetchLastfmUserArtists } from './api/lastfm';
import { fetchNpmRegistry } from './api/npm';
import { timeSince } from './util';


export default [

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
            [fetchStackOverflow, ['/users/216042']]
        ],
        href: "https://stackoverflow.com/users/216042/yentsun",
        thumb: "so.gif",
        priority: 10
    },
{
        id: 'github',
        data: null,
        apis: [
            [fetchGithubUser, ['/yentsun']],
            [fetchGithubEvents, ['/yentsun/events']]
        ],
        href: "https://github.com/yentsun",
        thumb: "github.gif",
        priority: 70
    },
    {
        id: 'npm',
        data: null,
        apis: [
            [fetchNpmRegistry, ['/search?text=maintainer:yentsun']]
        ],
        href: "https://www.npmjs.com/~yentsun",
        thumb: "npm.gif",
        priority: 65
    },

    {
        id: 'lastfm',
        data: null,
        apis: [
            [ fetchLastfmUser, [ '?method=user.getinfo&user=yentsun&api_key=eb51b2a9770101f794382992bb62457b&format=json' ]],
            [ fetchLastfmUserArtists, [ '?method=user.getTopArtists&user=yentsun&api_key=eb51b2a9770101f794382992bb62457b&format=json' ]],
            [ fetchLastfmRecent, [ '?method=user.getRecentTracks&user=yentsun&api_key=eb51b2a9770101f794382992bb62457b&nowplaying=true&format=json' ]],
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
        id: 'maksim',
        data: {
            major: 'Maksim Korinets',
            minor: 'Software Engineer / korinets.work',
            content: '5d Nguyễn Thiện Thuật, Lộc Thọ, Nha Trang, Khanh Hoa 650000, VN | mkorinets@gmail.com | +84 706 154 130'
        },
        href: "mailto:mkorinets@gmail.com",
        thumb: "userpic.gif",
        priority: 90
    },

    {
        id: 'irina',
        data: {
            major: 'Irina Korinets',
            minor: 'Assistant / korinets.work',
            content: 'LKS-1 Đường 2C, An Viên, Vĩnh Trường, Nha Trang, Khanh Hoa 652510, VN | geraskinai@gmail.com | +84 76 212 3427'
        },
        href: "mailto:geraskinai@gmail.com",
        thumb: "irina.gif",
        priority: 89
    },

    {
        id: 'kojo',
        data: {
            major: 'kojo',
            minor: 'JavaScript | npm | 5 stars | 1 fork',
            content: 'Event-driven microservice framework for Node.js. Has subscribers (event handlers, routes) and functions (reusable business logic). Start as a monolith, split into microservices when ready. Since 2017.'
        },
        href: 'https://github.com/yentsun/kojo',
        thumb: "github.gif",
        priority: 50
    },

    {
        id: 'trid',
        data: {
            major: 'trid',
            minor: 'JavaScript | npm | 1 star',
            content: 'Trivial request ID generator for Node.js. Lightweight, zero-dependency, generates short unique IDs for tracing requests across microservices. Since 2018.'
        },
        href: 'https://github.com/yentsun/trid',
        thumb: "github.gif",
        priority: 45
    },

    {
        id: 'gate',
        data: {
            major: 'gate',
            minor: 'JavaScript | Venture API',
            content: 'Gateway service for the Venture API infrastructure. Handles HTTP and WebSocket routing, auth, and request forwarding to internal microservices. Since 2020.'
        },
        href: 'https://github.com/yentsun/gate',
        thumb: "github.gif",
        priority: 44
    },

    {
        id: 'price_report',
        data: {
            major: 'price_report',
            minor: 'CoffeeScript | Seneca',
            content: 'A Seneca-based microservice for generating price reports. Part of a price monitoring platform — collects, aggregates, and reports pricing data. Since 2016.'
        },
        href: 'https://github.com/yentsun/price_report',
        thumb: "github.gif",
        priority: 43
    },

    {
        id: 'hydra',
        data: {
            major: 'hydra',
            minor: 'Python | Pyramid',
            content: 'Media rendering engine for real estate websites. Generates PDF booklets, HTML snippets, and structured JSON from property listings. Since 2015.'
        },
        href: 'https://github.com/yentsun/hydra',
        thumb: "github.gif",
        priority: 42
    },

    {
        id: 'price_watch',
        data: {
            major: 'price_watch',
            minor: 'Python | 1 star | 1 fork',
            content: 'Price monitoring engine built with Pyramid and ZODB. Collects price reports and calculates medians across product categories and regions. Includes product/package recognition. Since 2015.'
        },
        href: 'https://github.com/yentsun/price_watch',
        thumb: "github.gif",
        priority: 41
    },

    {
        id: 'whyte',
        data: {
            major: 'Whyte',
            minor: 'PHP | Zend Framework',
            content: 'A model layer for Zend Framework using Domain Objects and Entities. Clean separation of persistence and business logic. One of the earliest projects. Since 2011.'
        },
        href: 'https://github.com/yentsun/Whyte',
        thumb: "github.gif",
        priority: 40
    },

    {
        id: 'construction',
        data: {
            major: import.meta.env.VITE_APP_VERSION,
            minor: 'Under construction',
            content: 'This website is being constantly developed. I add new cards, ' +
                     'backend APIs, etc. Click to see the progress.'
        },
        href: 'https://gitlab.com/groups/korinets-name/-/boards?=',
        thumb: "construction.gif",
        priority: 0
    }

]
