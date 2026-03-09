import { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import Modal from './Modal';


export default function Card({ href, thumb, apis, data: staticData }) {

    const [showModal, setShowModal] = useState(false);
    const clickHandler = (typeof href === "function") ? href : null;
    const data = useFetchData({ apis, staticData });

    const handleClick = (e) => {
        if (clickHandler) {
            clickHandler(e);
            return;
        }
        e.preventDefault();
        setShowModal(true);
    };

    return data === null ? (<div className="card"><h1>Loading...</h1></div>) : (
        <div>
            <a href="#" onClick={handleClick} className="card">
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
            {showModal && data && (
                <Modal
                    data={data}
                    thumb={thumb}
                    href={href}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
