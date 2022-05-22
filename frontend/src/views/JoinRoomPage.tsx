import AvailableRooms from '../components/Rooms/AvailableRooms';
import { useEffect, useState } from 'react';

import CreateRoom from '../components/Rooms/CreateRoom';
import { PasswordModal } from '../components/Modal/PasswordModal';
import { socket } from '../constants/socket';
import { useNavigate } from 'react-router-dom';
import { PATH_TO_CREATE_PLAYERS } from '../constants/paths';

interface Room {
  name: string;
  password: boolean;
}

const JoinRoomPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  useEffect(() => {
    socket.emit('getRooms');
  }, []);
  useEffect(() => {
    socket.on('availableRooms', (data) => {
      if (data) {
        setRooms(data);
      }
    });
    socket.on('joinedRoom', () => {
      navigate(PATH_TO_CREATE_PLAYERS);
    });
    socket.on('createRoomError', (errorMsg) => {
      setErrorMessage(errorMsg);
      return;
    });
    socket.on('joinRoomError', (errorMsg) => {
      setErrorMessage(errorMsg);
      return;
    });
  });
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-ALMENDRA font-bold text-4xl text-DARKTHEME_LIGHT_GREEN_COLOR p-3 mb-10 self-center">
        {errorMessage}
      </p>
      <div className="flex items-center justify-center">
        <CreateRoom />
        <AvailableRooms rooms={rooms} />;
      </div>
      <PasswordModal />
    </div>
  );
};

export default JoinRoomPage;
