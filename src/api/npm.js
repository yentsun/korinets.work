import { average } from '../util';
import createApi from './createApi';


export const npmRegistry = createApi(
    'https://registry.npmjs.org/-/v1',
    (res) => {
        const {total, objects} = res.data;
        const packagelist = objects.map(o => o.package.name).join(', ');
        const packageScores = objects.map(o => o.score.final);
        return {
            major: `packages: ${total}`,
            minor: `avg score: ${average(packageScores).toFixed(3)}`,
            content: packagelist
        };
    }
);
