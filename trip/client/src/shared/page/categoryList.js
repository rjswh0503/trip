import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CategoryList = () => {
    const [category, setCategory] = useState('');
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        if (!category) return;
        const fetchData = async () => {
            try {
                //카테고리 상태값이 들어감                                                                       
                // 초기값이 ''이기 때문에 '' 이지만 카테고리  맛집 버튼을 클릭하면 category=맛집이 됨
                const response = await axios.get(`http://localhost:5000/api/places?category=${category}`);
                setPlaces(response.data.places);
                console.log(response.data.places);
            } catch (e) {
                console.error('애러 발생', e);
            }
        };
        fetchData();
    }, [category]);
    //카테고리가 바뀔 때 마다 마운트 됨.




    return (
        <div>
            <div>
                <button onClick={() => setCategory('맛집')}>맛집</button>
                <button onClick={() => setCategory('관광지')}>관광지</button>
            </div>

            <ul>
                {places.map(place => (
                    <li key={place._id}>{place.title}</li>
                ))}
            </ul>
        </div>
    )

}

export default CategoryList;