import { useEffect, useState } from 'react';


export default function useFetchData({ apis, staticData=null }) {

    const [ data, setData ] = useState(staticData);

    useEffect(() => {

        async function performRequest() {

            try {
                const reqList = apis.map(([ func, args ]) => {
                    return func(...args);
                });
                const results = await Promise.allSettled(reqList);
                const fulfilled = results
                    .filter(r => r.status === 'fulfilled')
                    .map(r => r.value);
                results
                    .filter(r => r.status === 'rejected')
                    .forEach(r => console.warn('API call failed:', r.reason?.message));
                if (fulfilled.length === 0) {
                    setData(false);
                } else {
                    setData(Object.assign({}, ...fulfilled));
                }

            } catch (error) {

                setData(false);
                console.error('Fetch error:', error.message);
            }
        }

        if (apis && data === null)
            performRequest();

    }, [ data, apis ]);

    return data;

}
