import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

function CreateCrewmate() {
    const [name, setName] = useState('');
    const [speed, setSpeed] = useState('');
    const [color, setColor] = useState('');

    const handleCreate = async () => {
        await supabase.from('crewmates').insert([{ name, speed, color }]);
        setName('');
        setSpeed('');
        setColor('');
    };

    return (
        <div className="container">
        <div className="form-card">
            <h2>Create a New Crewmate</h2>
            <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input
            placeholder="Speed (mph)"
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            />
            <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            >
            <option value="">Choose Color</option>
            <option value="Red">Red</option>
            <option value="Green">Green</option>
            <option value="Blue">Blue</option>
            <option value="Purple">Purple</option>
            <option value="Yellow">Yellow</option>
            <option value="Orange">Orange</option>
            <option value="Pink">Pink</option>
            <option value="Rainbow">Rainbow</option>
            </select>
            <button onClick={handleCreate}>Create Crewmate</button>
        </div>
        </div>
    );
}

export default CreateCrewmate;
