import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import "./css/app.css";
import MainBody from './components/MainBody';

function App() {
const [wait, setWait] = useState(true);


  setTimeout(() => {

    setWait(false);

  }, 1500);


  return (
    <>
      {wait && <LoadingScreen />}
      {!wait && <MainBody />}
    </>
  );
}

export default App;
