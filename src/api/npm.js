import axios from 'axios';
import {average} from '../util'


export const npmRegistry = axios.create({
    baseURL: 'https://registry.npmjs.org/-/v1'
});

npmRegistry.interceptors.response.use((res) => {
    const {
        total,
        objects
    } = res.data;
    const packagelist = objects.map((o) => o.package.name).join(', ');
    const packageScores = objects.map((o) => o.score.final);
    return {
        major: `packages: ${total}`,
        minor: `avg score: ${average(packageScores).toFixed(3)}`,
        content: packagelist
    };
});
