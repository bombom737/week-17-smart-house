import { createContext, useState, useEffect } from "react";

export const RoomContext = createContext();

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState(() => {
    try {
      const savedRooms = window.localStorage.getItem("rooms");
      return savedRooms ? JSON.parse(savedRooms) : [];
    } catch (error) {
      console.error("Failed to load rooms from local storage", error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  const addRoom = (room) => {
    setRooms((prevRooms) => [...prevRooms, room]);
  };

  const removeRoom = (id) => {
    setRooms((prevRooms) => {
      const updatedRooms = prevRooms.filter((room) => room.id !== id);
      window.localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      return updatedRooms;
    });
  };

  return (
    <RoomContext.Provider value={{ rooms, addRoom, removeRoom }}>
      {children}
    </RoomContext.Provider>
  );
}
