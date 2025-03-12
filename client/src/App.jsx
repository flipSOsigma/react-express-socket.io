import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] }); // replace with your server URL

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState();
  const [temp, setTemp] = useState();

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to socket server');
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const Clicked = () => {
    setCount((count) => count + 1);
    socket.emit('sending', { message: count+1 });
  }

  socket.on('rece', (temp, hum) => {
    console.log(temp, hum)
    setText(hum);
    setTemp(temp);

  });

  return (
    <>
      <div>
        <h1>Socket.IO with React</h1>
        <div className="card">
          <button onClick={Clicked}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <h1>humidity</h1>
          <p>
            {text}
          </p>

          <h1>temperature</h1>
          <p>
            {temp}
          </p>
        </div>
        <p className="read-the-docs">
          This is a simple page with Socket.IO client connection.
        </p>
      </div>
    </>
    )
}

export default App
