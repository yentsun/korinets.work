import Card from '../Card';
import useGitLab from '../../hooks/useGitLab';


export default function GitLab() {

    const { major, minor, content, isLoading } = useGitLab();

    return <Card isLoading={ isLoading } thumb="gitlab.gif" href="https://gitlab.com/mkorinets"
                 major={ major } minor={ minor } content={ content || '...' } />
}
