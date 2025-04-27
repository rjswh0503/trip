import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';

import axios from 'axios';

const Top3Places = () => {

    const { token } = useAuth();
    const [top5, setTop5] = useState([]);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places/top5');
                setTop5(response.data.top5Places);
                console.log(response.data.top5Places);

            } catch (e) {
                console.error(e);

            }
        };
        fetchData();

    }, [token]);

    return (
        <div>
            <h2 className='text-2xl font-black py-3 px-6'>추천 여행지</h2>
            <div className='flex gap-4 justify-center'>
            
                {top5.map(top => (
                    <div key={top._id}>
                        <div>
                            {top.title}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )

}

export default Top3Places;