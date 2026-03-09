import { average } from '../util';


const NPM_API = 'https://registry.npmjs.org/-/v1';

export async function fetchNpmRegistry(path) {
    const res = await fetch(`${NPM_API}${path}`);
    const data = await res.json();
    const { total, objects } = data;
    const packagelist = objects.map(o => o.package.name).join(', ');
    const packageScores = objects.map(o => o.score.final);
    return {
        major: `packages: ${total}`,
        minor: `avg score: ${average(packageScores).toFixed(3)}`,
        content: packagelist
    };
}
