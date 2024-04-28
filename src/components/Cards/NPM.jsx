import useNPM from '../../hooks/useNPM';
import Card from '../Card';


export default function NPM() {

    const { major, minor, content, isLoading } = useNPM();

    return <Card isLoading={ isLoading } thumb="npm.gif" href="https://www.npmjs.com/~yentsun"
                 major={ major } minor={ minor } content={ content || '...' } />
}
