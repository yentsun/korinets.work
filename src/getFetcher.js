export function getFetcher(options={}) {

    const { body, restOfTheOptions, headers, responseHeaders=false } = options;

    return (request, opt={}) => fetch(`${request.path || request}`, {

        headers: new Headers({...headers, ...(request.headers || {})}),

        ...body && {
        body: JSON.stringify(body) },

        ...opt.arg && {
        body: JSON.stringify(opt.arg) },

        ...restOfTheOptions  // method etc
    }).then(res => responseHeaders
        ? Promise.all([ res.json(), res.headers ])
        : res.json()
    ).catch(error => console.error(error.message))

}
