import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import './card.css';
import { Link } from 'react-router-dom';



const Card = ({ id, title, author, date, content, image }) => {
    const relativeDate = formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ko,
    })


    return (

        <div className='card'>
            <Link to={`/posts/${id}`}>
                <img src="/image1.jpg" alt={title} className='image' />
                <div className='content'>
                    <h3 style={{ textDecoration: 'none' }}>{title}</h3>
                    <p className='meta'>by {author} · {relativeDate}</p>
                    <p className='desc'>{content}</p>
                </div>
            </Link>
        </div>
    )
}

export default Card;
