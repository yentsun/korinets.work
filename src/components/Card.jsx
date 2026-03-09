import useFetchData from '../hooks/useFetchData';
import Modal from './Modal';


export default function Card({ id, href, thumb, apis, data: staticData, isOpen, onOpen, onClose }) {

    const data = useFetchData({ apis, staticData });

    const handleClick = (e) => {
        e.preventDefault();
        onOpen(id);
    };

    return data === null ? (<div className="card"><h1>Loading...</h1></div>) : (
        <div>
            <a href={`#${id}`} onClick={handleClick} className="card">
                <div className="thumb" style={{backgroundImage: `url(${thumb})`}}/>
                { data !== false ?
                    <article>
                        <h1>{data.major}</h1>
                        <span>{data.minor}</span>
                        <p>{data.content}</p>
                    </article>
                    :
                    <article><h1>No data!</h1></article>
                }
            </a>
            {isOpen && data && (
                <Modal
                    data={data}
                    thumb={thumb}
                    href={href}
                    onClose={onClose}
                />
            )}
        </div>
    );
}
