import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
    const Nav = useNavigate()
    return (
        <div>
            <button className='btn btn-secondary' onClick={() => Nav("/")}>Go back home</button>
        </div>
    );
}

export default GoBack;
