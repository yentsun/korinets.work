import React from 'react';
import '../index.css';
import GitHub from './Cards/GitHub';
import Bio from './Cards/Bio';
import Email from './Cards/Email';
import StackOverflow from './Cards/StackOverflow';
import GitLab from './Cards/GitLab';
import NPM from './Cards/NPM';


export default function Root() {

    return <div className="band">
        <Bio />
        <GitHub />
        <GitLab />
        <NPM />
        <StackOverflow />
        <Email />
    </div>
}
