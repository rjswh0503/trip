import React, { useEffect, useState } from 'react';


import axios from 'axios';

const Top3Places = () => {

    
    const [top5, setTop5] = useState([]);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/places/top5');
                setTop5(response.data.top5Places);
                
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();

    }, []);




    return (
        <div>
            <h2 className='text-2xl font-black py-3 px-6'>추천 여행지</h2>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4 justify-items-center '>

                {top5.map(top => (
                    <div className='w-90 sm:w-90 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg cursor-pointer' key={top._id}>
                        <img className='rounded-t-lg w-full h-48 object-cover' src={top.images} alt='여행지 이미지' />
                        <div className='p-5'>
                            <h5 className='my-3 text-xl font-bold tracking-tight text-gray-900'>{top.title}</h5>
                            <p className='mb-3 font-normal text-gray-700 line-clamp-4'>{top.description}</p>
                            <div>
                                <p>{top.reviews.length}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )

}

export default Top3Places;