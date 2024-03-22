import useGithub from '../../hooks/useGithub';
import Card from '../Card';


export default function GitHub() {

    const { yentsun, lastEvent } = useGithub();

    return <Card isLoading={ ! yentsun } thumb="github.gif"
                 major={`repos: ${yentsun?.public_repos}` }
                 minor={ `followers: ${yentsun.followers}` }
                 content={ lastEvent
                     ? `${lastEvent.name}: [${lastEvent.type}] ${lastEvent.text} (${lastEvent.createdAgo} ago)`
                     : null } />
}
