import React from 'react'
import axios from 'axios';
const Test = () => {
    const grep = async () => {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const body = JSON.stringify({
            name: "man",
            email: "w@b64.com",
            password: "12345678"
        });
        console.log(body)
        axios.post('http://127.0.0.1:5000/api/v1/auth/signup', body, config)
        .then(response => 
            { 
                    console.log(response)
            })
        .catch(error => {
                console.error('There was an error!', error.message);
        })
    }


  return (
    <div>
        <button style={{ marginTop: '10%' }} onClick={grep}>Send Request</button>
    </div>
  )
}

export default Test