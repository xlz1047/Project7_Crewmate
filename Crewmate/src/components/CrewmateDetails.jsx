import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function CrewmateDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [crewmate, setCrewmate] = useState(null);

    useEffect(() => {
        const fetchCrewmate = async () => {
        const { data } = await supabase.from('crewmates').select('*').eq('id', id).single();
        setCrewmate(data);
        };
        fetchCrewmate();
    }, [id]);

    const handleDelete = async () => {
        await supabase.from('crewmates').delete().eq('id', id);
        navigate('/gallery');
    };

    return (
        <div className="container">
        {crewmate && (
            <div className="crewmate-card">
            <h2>{crewmate.name}</h2>
            <p>Speed: {crewmate.speed} mph</p>
            <p>Color: {crewmate.color}</p>
            <div className="buttons">
                <button onClick={() => navigate(`/create/${id}`)}>Edit Crewmate</button>
                <button onClick={handleDelete}>Delete Crewmate</button>
            </div>
            </div>
        )}
        </div>
    );
}

export default CrewmateDetails;
