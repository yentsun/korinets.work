import React from 'react';
import '../index.css';
import GitHub from './Cards/GitHub';
import Bio from './Cards/Bio';


export default function Root() {

    return <div className="band">
        <Bio />
        <GitHub />
    </div>
}
