import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomContext } from '../context/roomContext';
import './AddRoom.css';

export default function AddRoom() {
  const navigate = useNavigate();
  const { rooms, addRoom } = useContext(RoomContext);

  function createRoom() {
    try {
      const input = document.getElementById('room-name').value;
      const type = document.getElementById('room-type').value;
      const color = document.getElementById('room-color').value;
      console.log(`${input} ${type} ${color}`)

      if(type == "default"){
        alert('Please choose a room type')
        return
      }
      
      if (input.length >= 1) {
        let newId = 0;
        while (rooms.some(room => room.id === newId)) {
          newId++;
        }
        if(rooms.some(room => room.name === input)){
          alert('A room with that name already exist. Please choose a different name.')
          return
        }

        const newRoom = {
          id: newId,
          name: input,
          type: type,
          color: color
        };

        addRoom(newRoom);
        alert("Room added successfully!");
        navigate('/');
      } else {
        alert("Room name must be at least 1 character long");
      }
    } catch (error) {
      alert(`An error occurred while trying to create a room: ${error}`);
      navigate('/');
    }
  }
  
  function cancel(){
    navigate('/')
  }

  return (
    <div>
      <h1>The Smartest House</h1>
      <div className='container'>
        <h1>Add a Room</h1>
        <div className='input-field'>
          <input type="text" id="room-name" name="room-name" placeholder="Room name" maxLength="9" />
          <select name="room-type" id="room-type">
              <option value="default" id="default-option" selected="selected" disabled={true}>Choose a room type:</option>
              <option value="rest-room">Rest room</option>
              <option value="bathroom">Bathroom</option>
              <option value="kitchen">Kitchen</option>
              <option value="living-room">Living Room</option>
            </select>
          <div>
            <label htmlFor="room-color">Room color: </label>
            <input type="color" id="room-color" name="room-color" />
          </div>
        </div>
      <div id="buttons">
        <button id="btn" onClick={createRoom}>Create</button>
        <button id="btn" onClick={cancel}>Cancel</button>
      </div>
      </div>
    </div>
  );
}
