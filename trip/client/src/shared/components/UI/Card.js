import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import './card.css';
import { Link } from 'react-router-dom';


const Card = ({ id,title, author, date, content, image }) => {
    const relativeDate = formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ko,
    })


    return (
        <div className='card'>
            <img src={image} alt={title} className='image' />
            <div className='content'>
                <Link to={`/posts/${id}`}><h3>{title}</h3></Link>
                <p className='meta'>by {author} · {relativeDate}</p>
                <p className='desc'>{content}</p>
            </div>
        </div>
    )
}

export default Card;
