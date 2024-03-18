import useGithub from '../../hooks/useGithub';


export default function GitHub() {

    const { yentsun, lastEvent } = useGithub();

    return <div className="card" onClick={ () => window.location = 'https://github.com/yentsun' }>

        { ! yentsun &&
        <h1>Loading...</h1> }

        <div className="thumb" style={{ backgroundImage: 'url(github.gif)' }}/>

        <article>
            { yentsun && <>

            <h1>repos: { yentsun.public_repos }</h1>

            <span>followers: { yentsun.followers }</span>

            { lastEvent &&
            <p>
                { lastEvent.name }:
                [{ lastEvent.type }] { lastEvent.text }
                ({ lastEvent.createdAgo } ago)
            </p> }

            </> }

        </article>

    </div>
}
