import Card from '../Card';
import useStackOverflow from '../../hooks/useStackOverflow';


export default function StackOverflow() {

    const { reputation, gold, bronze, acceptRate, silver, reputationChangeMonth, seenAgo, isLoading } = useStackOverflow();

    return <Card isLoading={ isLoading } thumb="so.gif" href="https://stackoverflow.com/users/216042/yentsun"
                 major={ reputation }
                 minor={ `🔶️ ${gold}   🔵️ ${silver}   🔴️ ${bronze}` }
                 content={ `accept rate: ${acceptRate}%; 
                            reputation change (month): ${reputationChangeMonth}; 
                            last seen: ${seenAgo} ago` } />
}
