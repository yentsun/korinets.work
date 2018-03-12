import so from './api/so';
import {githubUsers, githubEvents} from './api/github';


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
        thumb: "userpic.gif"
    },

    {
        id: "SO",
        data: null,
        apis: [
            [so.get, ['/users/216042']]
        ],
        href: "https://stackoverflow.com/users/216042/yentsun",
        thumb: "so.gif"
    },

    {
        id: 'github',
        data: null,
        apis: [
            [githubUsers.get, ['/yentsun']],
            [githubEvents.get, ['/yentsun/events']]
        ],
        href: "https://github.com/yentsun",
        thumb: "github.gif"
    }

]
