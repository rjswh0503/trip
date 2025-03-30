import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';

const PostList = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState()


    const postHandler = async (e) => {
        e.preventDefault();


        const responseData = await axios.post('http')

    };

    
    


    return (
        <>

        </>
    )

}

export default PostList;