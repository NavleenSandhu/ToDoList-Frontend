import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from './Alert';

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://srv485884.hstgr.cloud:5000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        if (json.success === "User found") {
            // Save the auth token and redirect
            localStorage.setItem('token', json.token);
            navigate("/");
            window.location.reload();
        }
        else if (!(json.failure === undefined || json.failure === null)) {
            document.querySelector('#error-msg').innerHTML = json.failure
            document.querySelector('#alert').style.display = 'block';
            setTimeout(() => {
                document.querySelector('#error-msg').innerHTML = "";
                document.querySelector('#alert').style.display = 'none';
            }, 3000)
        }
        else {
            alert("An error occurred")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <Alert />
            <div className='container-sm'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address<span style={{ color: 'red' }}>*</span></label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password<span style={{ color: 'red' }}>*</span></label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                </form>
            </div>
        </div>
    )
}
