import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../shared/context/auth-context';
import { useParams } from 'react-router-dom';
import { Pagination } from 'flowbite-react';


const MyBookMark = () => {

    const { token } = useAuth();
    const { id } = useParams();
    const [bookMark, setBookMark] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const lastItem = currentPage * itemsPerPage;
    const firstItem = lastItem - itemsPerPage;
    const currentItem = bookMark.slice(firstItem, lastItem);

    useEffect(() => {
        if (!token) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${id}/bookMark`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookMark(response.data.bookMark);

            } catch (e) {
                console.log(e);
            }

        };
        fetchData();

    }, [token, id]);

    return (
        <div>
            <h3 className='text-2xl font-black mb-6'>찜 목록</h3>
            <table className='container mx-auto w8/2 bg-white shadow-sm rounded'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='p-3 text-left'>번호</th>
                        <th className='p-3 text-left'>이미지</th>
                        <th className='p-3 text-left'>여행지</th>
                        <th className='p-3 text-left'>지역</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem.map((bookMark, idx) => (
                        <tr key={bookMark._id} className='hover:bg-gray-50 border-b-2'>
                            <td className='p-3'>{idx + 1}</td>
                            <td className='p-3'><img className='w-16 h-16 rounded-md' src={bookMark.images[0]} alt='여행지 이미지' /></td>
                            <td className='p-3'>{bookMark.title}</td>
                            <td className='p-3'>{bookMark.region}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center mt-10'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(bookMark.length / itemsPerPage)}
                    onPageChange={(page) => setCurrentPage(page)}
                    showIcons
                />
            </div>
        </div>
    )

}
export default MyBookMark;