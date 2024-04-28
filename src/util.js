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

    if (!  values) return;

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
