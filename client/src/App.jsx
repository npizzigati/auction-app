import React, { useEffect } from 'react';
import axios from 'axios';

function App () {
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/users')
      .then(res => console.log(res.data));
  }, []);
  const greeting = 'Hello Function Component!';

  return <h1>{greeting}</h1>;
}

export default App;
