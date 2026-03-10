import { useEffect } from 'react';
import LinkButton from './LinkButton';


export default function Modal({ data, thumb, href, onClose }) {

    const link = (typeof href === "string") ? href : null;

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>x</button>
                {thumb && <div className="modal-thumb" style={{backgroundImage: `url(${thumb})`}}/>}
                <article>
                    <h1>{data.major}</h1>
                    <span>{data.minor}</span>
                    <p>{data.content}</p>
                </article>
                {link && <LinkButton href={link} />}
            </div>
        </div>
    );
}
