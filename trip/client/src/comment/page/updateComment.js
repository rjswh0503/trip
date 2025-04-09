import React, { useState, useEffect } from 'react';
import { useAuth } from '../../shared/context/auth-context';
import { useParams } from 'react-router-dom';



const UpdateComment = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [comment, setComment ] = useState('');



    return (
        <div>

        </div>
    )

}

export default UpdateComment;