export default function LinkButton({ href, children = 'Follow link →' }) {
    return (
        <a href={href} className="modal-link" target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
}
