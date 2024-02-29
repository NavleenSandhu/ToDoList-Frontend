import React, { useEffect, useState } from 'react'
import AddTask from './AddTask'
import Tasks from './Tasks'
import Alert from './Alert';

export default function Home() {
    const [name, setName] = useState("");

    const getName = async () => {
        const response = await fetch('http://srv485884.hstgr.cloud:5000/name', {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            }
        })
        const json = await response.json();
        if (json.Forbidden === "Not Logged In") {
            setName("")
        } else {
            const name = 'Welcome, ' + json.fname + ' ' + (json.lname === undefined || json.lname === null ? "" : json.lname)
            setName(name);
        }
    }
    useEffect(() => { getName() }, [])
    return (
        <div>
            <Alert />
            <div className='container'>
                <h2 style={{ textAlign: 'center' }}>{name}</h2>
                <AddTask />
                <Tasks />
            </div>
        </div>
    )
}
