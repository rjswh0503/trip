import React from 'react';
import axios from 'axios';
import { useAuth } from '../../../shared/context/auth-context';

// 부모 컴포넌트로 부터 props  받아옴
const DeleteButton = ({ reviewId, placeId, onDelete }) => {
    const { token } = useAuth();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/review/place/${placeId}/review/${reviewId}/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('삭제 완료!');
            if (onDelete) {
                onDelete();
            }
        } catch (e) {
            console.error(e);
            alert('삭제 실패');
        }
    };

    

    return (
        <div>
            <p className='text-sm text-red-500 hover:underline' onClick={handleDelete}>
                삭제
            </p>
        </div>
    );
};


export default DeleteButton;