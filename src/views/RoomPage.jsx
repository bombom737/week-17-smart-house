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
    //Load products from local storage, passing roomName to the dependency array
    const storedProducts = localStorage.getItem(`products-${roomName}`);
    if (storedProducts) {
      console.log(`Loaded products for ${roomName}:`, JSON.parse(storedProducts));
      setProducts(JSON.parse(storedProducts));
    }
  }, [roomName]);

  useEffect(() => {
    //Update rooms's products
    if (initialRender.current) {
      //Prevent the page from rendering more than once at mount, without this the product array will be set multiple times and get cleared
      initialRender.current = false;
      return;
    }
    console.log(`Saving products for ${roomName}:`, products);
    localStorage.setItem(`products-${roomName}`, JSON.stringify(products));
  }, [products, roomName]);
  
  function goBack() {
    navigate('/');
  }

  if (!room) {
    //In case room doesn't exist
    return <div id='not-found'>
      <p>Room not found</p>
      <button onClick={goBack}>Go back</button>
      </div>;
  }

  function addProduct(product) {
    //Adds a product to room. This updates the products state, which causes useEffect to fire and save the changes to local storage
    const updatedProducts = [...products, { ...product, isOn: false }];
    console.log(`Adding product to ${roomName}:`, updatedProducts);
    setProducts(updatedProducts);
  }

  function closeForm() {
     //Simply set  th showAddProduct state to false to stop displaying the addProduct component, an simple yet effective technique I learned through chat
    setShowAddProduct(false);
  }

  function toggleProductStatus(index) {
    //Toggle between activating and deactivating a product and saving that status in local storage
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, isOn: !product.isOn } : product
    );
    console.log(`Toggling product status in ${roomName}:`, updatedProducts);
    setProducts(updatedProducts);
  }

  function removeProduct(index) {
    //Removes a product from room. setProducts is used here so useEffect fires and save to local storage here as well
    const updatedProducts = products.filter((_, i) => i !== index);
    console.log(`Removing product from ${roomName}:`, updatedProducts);
    setProducts(updatedProducts);
  }

  function deleteRoom() {
    //using window.confirm to make sure user wants to remove room, remove the room from both the rooms array and local storage, and navigate user to home page
    //would definitely style my own confirm prompt instead of using window.confirm on a real app.
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
