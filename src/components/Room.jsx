import { useNavigate } from 'react-router-dom';

import './Room.css'

export default function Room({ id, name, color }) {
  const navigate = useNavigate();

  const enterRoom = () => {
    navigate(`/room/${name}`);
  };

  return (
    <div id='room-container'>
      <div className='room-button' onClick={enterRoom} id={id} style={{ backgroundColor: color }}>
        <p>{name}</p> 
      </div>
    </div>
  );
}
