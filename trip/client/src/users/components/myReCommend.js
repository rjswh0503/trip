import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-context';
import { Pagination } from 'flowbite-react';


const MyRecommend = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const [reCommends, setReCommends] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = reCommends.slice(firstItem, lastItem);


    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/reviews/recommend`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },

                });
                setReCommends(response.data.recommend);
                console.log(response.data.recommend);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, [token, id]);


    return (
        <div>
            {reCommends ? (
                <div>
                    <table className='container mx-auto w8/2 bg-white shadow-sm rounded'>
                        <thead className='bg-gray-300'>
                            <tr>
                                <th className='p-3 text-left'>번호</th>
                                <th className='p-3 text-left'>제목</th>
                                <th className='p-3 text-left'>작성자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItem.map((reCommend, idx) => (
                                <tr key={reCommend._id} className='hover:bg-gray-50 border-b-2'>
                                    <td className='p-3'>{idx + 1}</td>
                                    <td className='p-3'>{reCommend.title}</td>
                                    <td className='p-3'>{reCommend.author?.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                </div>
            ) : (
                <div>
                    <p>추천한 리뷰가 없습니다.</p>
                </div>
            )}
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(reCommends.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>

        </div>
    )
}

export default MyRecommend;