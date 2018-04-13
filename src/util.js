export const timeSince = (date) => {

    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }

    return Math.floor(seconds) + " seconds";
};


export const average = (values) => {

    const sum = values.reduce((a, b) => b += a);
    return sum / values.length;
};


export const median = (values) => {

    values.sort((a,b) => a - b);
    const half = Math.floor(values.length/2);
    return (values.length % 2) ?
        values[half] :
        (values[half-1] + values[half]) / 2.0;
};

export const generatePassword = (e) => {

    let p = e.target.parentElement.getElementsByTagName('p')[0];
    if (p) {
        console.log('generating password...');
        const array1 = Array.from(crypto.getRandomValues(new Uint8Array(15)));
        const array2 = Array.from(crypto.getRandomValues(new Uint16Array(9)));
        const array3 = Array.from(crypto.getRandomValues(new Uint32Array(5)));
        const array = [...array1,...array2, ...array3]
            .sort(() => Math.random() - 0.5);
        const password = array.map((b) => {
            return String.fromCharCode(b);
        }).join('');
        p.innerText = '';
        const textArea = p.getElementsByTagName('textarea');
        const passwordHolder = textArea.length
            ? textArea[0]
            : document.createElement("textarea");
        p.appendChild(passwordHolder);
        passwordHolder.innerText = `${password}`;
        passwordHolder.select();
        document.execCommand('copy');
        document.getSelection().removeAllRanges();
        console.log('done, copied to clipboard');
    }

};