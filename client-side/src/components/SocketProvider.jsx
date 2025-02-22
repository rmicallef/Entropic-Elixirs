import React, { useState, useEffect } from 'react';
import SocketContext from './SocketContext';

const SocketProvider = (props) => {
  const [value, setValue] = useState({
    incoming: ''
  });

useEffect(() => {
  const ws = new WebSocket('wss://staging.projectamelia.ai/pusherman/companions/login/websocket?app=entropic');
    ws.addEventListener('open', function open() {
     console.log('Websocket connection established 🚀');
    })

    ws.addEventListener('message', async function incoming(msg) {
      const data = JSON.parse(msg.data);
      console.log('ws msg', data);
      setValue({incoming: data.token})
    });
 },[])

return (
    <SocketContext.Provider value={value}>
      { props.children }
    </SocketContext.Provider>
  )
};
export default SocketProvider;
