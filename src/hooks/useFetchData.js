import { useEffect, useState } from 'react';


export default function useFetchData({ apis, staticData=null }) {

    const [ data, setData ] = useState(staticData);

    useEffect(() => {

        async function performRequest() {

            try {
                const reqList = apis.map(([ func, args ]) => {
                    return func(...args);
                });
                const dataSets = await Promise.all(reqList);
                setData(Object.assign(...dataSets));

            } catch (error) {

                setData(false);

                if (error.response) {
                    console.error('Error response:', error.response.data);
                } else {
                    console.error('Unexpected:', error.message);
                }
            }
        }

        if (apis && data === null)
            performRequest();

    }, [ data, apis ]);

    return data;

}
