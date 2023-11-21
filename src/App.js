import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State to hold the list of frogs
  const [frogs, setFrogs] = useState([]);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    axios.get("http://localhost:8082/getItems")
      .then(results => {
        console.log(results.data);
        setFrogs(results.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Function to reset values on the server
  const resetValues = () => {
    axios.get("http://localhost:8082/resetValues")
      .then(results => {
        console.log(results.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Function to delete an item on the server
  const deleteItem = (id) => {
    axios.post("http://localhost:8082/deleteItem", { id })
      .then(results => {
        console.log(results.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Function to add a new item on the server
  const addItem = () => {
    const name = "New record";
    axios.post("http://localhost:8082/addItem", { name })
      .then(results => {
        console.log(results.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <header>
        <h1>Node MySQL Companion</h1>
      </header>
      {/* Button to add a new item */}
      <button onClick={addItem}>Add item</button>
      {/* Button to reset values */}
      <button onClick={resetValues}>Reset values</button>
      {/* List of frogs */}
      <ul>
        {frogs &&
          frogs.map(item => (
            <li key={item.id}>
              {item.name}
              {/* Button to delete an item */}
              <button onClick={() => deleteItem(item.id)}>Delete item</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
