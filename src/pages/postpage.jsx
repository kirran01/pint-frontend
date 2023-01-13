import React from 'react';
import { useState, useContext,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Postpage = () => {
    const { id } = useParams();
    return (
        <div className='post-page'>
            <h1>postpage</h1> 
        </div>
    );
}

export default Postpage;
