import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const CrewmateGallery = () => {
    const [crewmates, setCrewmates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCrewmates = async () => {
        const { data, error } = await supabase
            .from('crewmates')
            .select('*');

        if (error) {
            setError(error.message);
            console.error(error);
        } else {
            setCrewmates(data);
        }
        };

        fetchCrewmates();
    }, []);

    if (error) {
        return <div>Error fetching data: {error}</div>;
    }

    return (
        <div>
        {crewmates && crewmates.length > 0 ? (
            crewmates.map((crewmate) => (
            <div key={crewmate.id}>
                {/* Render your crewmate details here */}
                <p>{crewmate.name}</p>
            </div>
            ))
        ) : (
            <p>No crewmates found.</p>
        )}
        </div>
    );
};

export default CrewmateGallery;
