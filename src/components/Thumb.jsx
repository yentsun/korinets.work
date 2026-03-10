import React from 'react';


export default function Thumb({ src }) {
    return <div className="thumb" style={{ backgroundImage: `url(${src})` }} />;
}
