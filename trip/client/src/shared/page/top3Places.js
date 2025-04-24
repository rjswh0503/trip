import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';

import axios from 'axios';

const Top3Places = () => {

    const { token } = useAuth();
    const [top3, setTop3] = useState([]);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places/top3');
                setTop3(response.data.top3Places);
                console.log(response.data.top3Places);

            } catch (e) {
                console.error(e);
            
            }
        };
        fetchData();

    }, [token]);

    return (
        <div>
            {top3.map(top => (
                <div key={top._id} className=''>
                    <div>
                        {top.title}
                    </div>

                </div>
            ))}

        </div>
    )

}

export default Top3Places;