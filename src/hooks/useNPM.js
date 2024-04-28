import useSWR from 'swr';
import { getFetcher } from '../getFetcher';
import { average } from '../util';


export default function useNPM() {

    const { data } = useSWR('https://registry.npmjs.org/-/v1/search?text=maintainer:yentsun', getFetcher());

    const packagelist = data?.objects.map(o => o.package.name).join(', ');
    const packageScores = data?.objects.map(o => o.score.final);

    return {
        major: `packages: ${data?.total}`,
        minor: `avg score: ${average(packageScores)?.toFixed(3)}`,
        content: packagelist
    };
}
