import {so} from './api';


export default [

    {
        id: "static",
        data: {
            "major": "Max Korinets",
            "minor": "software engineer",
            "content": "Don't let simplicity fool you: there is hard work behind most of the times."
        },
        href: null,
        thumb: "userpic.gif"
    },

    {
        id: "SO",
        data: null,
        api: {fetcher: so.get, args: ['/users/216042']},
        href: "https://stackoverflow.com/users/216042/yentsun",
        thumb: "so.png"
    }

]
