import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust the import based on your file structure
import './CrewmateGallery.css'; // Optional: Import CSS for styling

const CrewmateGallery = () => {
    const [crewmates, setCrewmates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editCrewmate, setEditCrewmate] = useState(null);
    const [newCrewmate, setNewCrewmate] = useState({
        name: '',
        speed: '',
        color: ''
    });

    useEffect(() => {
        const fetchCrewmates = async () => {
        try {
            const { data, error } = await supabase
            .from('crewmates')
            .select('*');

            if (error) throw error;

            setCrewmates(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchCrewmates();
    }, []);

    const handleEditCrewmate = (crewmate) => {
        setEditCrewmate(crewmate);
        setNewCrewmate(crewmate);
        setIsEditing(true);
    };

    const handleUpdateCrewmate = async (e) => {
        e.preventDefault();
        const { id, name, speed, color } = newCrewmate;
        const { error } = await supabase
        .from('crewmates')
        .update({ name, speed, color })
        .eq('id', id);

        if (error) {
        setError(error.message);
        } else {
        setIsEditing(false);
        setEditCrewmate(null);
        fetchCrewmates(); // Refresh the list
        }
    };

    const handleDeleteCrewmate = async () => {
        const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', editCrewmate.id);

        if (error) {
        setError(error.message);
        } else {
        setIsEditing(false);
        setEditCrewmate(null);
        fetchCrewmates(); // Refresh the list
        }
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setEditCrewmate(null);
        setNewCrewmate({ name: '', speed: '', color: '' });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
        <h1>Crewmate Gallery</h1>

        <div className="crewmate-gallery">
            {crewmates.map((crewmate) => (
            <div key={crewmate.id} className="crewmate-card">
                <h2>{crewmate.name}</h2>
                <p>Speed: {crewmate.speed} mph</p>
                <p>Color: {crewmate.color}</p>
                <button onClick={() => handleEditCrewmate(crewmate)}>Edit Crewmate</button>
            </div>
            ))}
        </div>

        {isEditing && (
            <div className="modal">
            <h2>Edit Crewmate</h2>
            <form onSubmit={handleUpdateCrewmate}>
                <input
                type="text"
                placeholder="Name"
                value={newCrewmate.name}
                onChange={(e) => setNewCrewmate({ ...newCrewmate, name: e.target.value })}
                required
                />
                <input
                type="number"
                placeholder="Speed (mph)"
                value={newCrewmate.speed}
                onChange={(e) => setNewCrewmate({ ...newCrewmate, speed: e.target.value })}
                required
                />
                <input
                type="text"
                placeholder="Color"
                value={newCrewmate.color}
                onChange={(e) => setNewCrewmate({ ...newCrewmate, color: e.target.value })}
                required
                />
                <button type="submit">Update Crewmate</button>
                <button type="button" onClick={handleDeleteCrewmate}>Delete Crewmate</button>
                <button type="button" onClick={handleCloseModal}>Cancel</button>
            </form>
            </div>
        )}
        </div>
    );
};

export default CrewmateGallery;
