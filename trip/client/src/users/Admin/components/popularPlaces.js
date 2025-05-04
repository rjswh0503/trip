import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';
import { Link } from 'react-router-dom';


const PopularPlaces = () => {

    const { token } = useAuth();
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('');

            } catch(e){
                console.error(e);
            }
        }
    })


    return (
        <div>

        </div>
    )

}

export default PopularPlaces;