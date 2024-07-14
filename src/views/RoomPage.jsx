import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoomContext } from '../context/roomContext';
import AddProduct from '../components/AddProduct';
import './RoomPage.css';

export default function RoomPage() {
  const { roomName } = useParams();
  const { rooms, removeRoom } = useContext(RoomContext);
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const initialRender = useRef(true);

  const room = rooms.find(r => r.name === roomName);

  useEffect(() => {
    const storedProducts = localStorage.getItem(`products-${roomName}`);
    if (storedProducts) {
      console.log(`Loaded products for ${roomName}:`, JSON.parse(storedProducts));
      setProducts(JSON.parse(storedProducts));
    }
  }, [roomName]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    console.log(`Saving products for ${roomName}:`, products);
    localStorage.setItem(`products-${roomName}`, JSON.stringify(products));
  }, [products, roomName]);

  if (!room) {
    return <div>Room not found</div>;
  }

  function goBack() {
    navigate('/');
  }

  function addProduct(product) {
    const updatedProducts = [...products, { ...product, isOn: false }];
    console.log(`Adding product to ${roomName}:`, updatedProducts);
    setProducts(updatedProducts);
  }

  function closeForm() {
    setShowAddProduct(false);
  }

  function toggleProductStatus(index) {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, isOn: !product.isOn } : product
    );
    console.log(`Toggling product status in ${roomName}:`, updatedProducts);
    setProducts(updatedProducts);
  }

  function removeProduct(index) {
    const updatedProducts = products.filter((_, i) => i !== index);
    console.log(`Removing product from ${roomName}:`, updatedProducts);
    setProducts(updatedProducts);
  }

  function deleteRoom() {
    const confirmed = window.confirm("Are you sure you want to delete this room?");
    if (confirmed) {
      removeRoom(room.id);
      localStorage.removeItem(`products-${roomName}`);
      navigate('/');
    }
  }

  return (
    <div id='container'>
      <h1>The Smartest House</h1>
      <div id="room-info">
        <h3>Name of room: {room.name}</h3>
        Room Type: {room.type === 'rest-room' ? 'Restroom' : room.type === 'bathroom' ? 'Bathroom' : room.type === 'kitchen' ? 'Kitchen' : room.type === 'living-room' ? 'Living Room' : 'No room type'}
      </div>
      {showAddProduct ? (
        <AddProduct addProduct={addProduct} closeForm={closeForm} />
      ) : (
        <>
          <div>
            <h2>Products in this room:</h2>
            {products.length === 0 ? (
              <p id='no-products'>No products added yet.</p>
            ) : (
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    <div
                      style={{
                        backgroundColor: product.isOn ? 'green' : 'red'
                      }}
                      onClick={() => toggleProductStatus(index)}
                    ></div>
                    {product.name} - {product.type}
                    <button onClick={() => removeProduct(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
            <div id='buttons'>
              <button onClick={() => setShowAddProduct(true)}>Add a product</button>
              <button onClick={goBack}>Go back</button>
              <button onClick={deleteRoom}>Delete Room</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
