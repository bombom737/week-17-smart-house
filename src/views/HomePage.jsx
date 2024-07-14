import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Room from '../components/Room';
import { RoomContext } from '../context/roomContext';
import './HomePage.css'

export default function HomePage() {
  const navigate = useNavigate();
  const { rooms } = useContext(RoomContext);

  const addRoom = () => {
    navigate('/addroom');
  };

  return (
    <div>
      <div>
        <h1>The Smartest House</h1>
      </div>
      <div id='room'>
        {rooms.length === 0 ? <label>No rooms added.</label> : rooms.map((room) => (
          <Room key={room.id} {...room} />
        ))}
        <div id='button-container'>
          <button id='add-room-button' onClick={addRoom}>+</button>
        </div>
      </div>
    </div>
  );
}
