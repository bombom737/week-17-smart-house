import './App.css';
import HomePage from './views/HomePage';
import AddRoom from './views/AddRoom';
import RoomPage from './views/RoomPage';
import { Route, Routes } from 'react-router-dom';
import { RoomProvider } from './context/roomContext';

function App() {
  return (
    <RoomProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add-room' element={<AddRoom />} />
        <Route path='/room/:roomName' element={<RoomPage />} />
      </Routes>
    </RoomProvider>
  );
}

export default App;
