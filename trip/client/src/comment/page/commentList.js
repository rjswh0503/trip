import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { useAuth } from '../../shared/context/auth-context';

const CommentList = ({ comments, onDelete }) => {

    const { user } = useAuth();


    return (
        <div className="mt-6">
            <h2 className="text-lg font-bold mb-4">💬 댓글</h2>

            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div
                        key={comment._id}
                        className="bg-gray-50 p-4 rounded-md shadow-sm mb-3"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <Link
                                    to={`/${comment.author._id}/mypage`}
                                    className="text-sm font-semibold text-blue-600 hover:underline"
                                >
                                    {comment.author?.name}
                                </Link>
                                <span className="ml-2 text-sm text-gray-800">{comment.content}</span>
                            </div>

                            {user?.userId === comment.author._id && (
                                <button
                                    onClick={() => onDelete(comment._id)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <MdDelete size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-400 italic">덧글이 없습니다.</p>
            )}
        </div>

    );
};

export default CommentList;
