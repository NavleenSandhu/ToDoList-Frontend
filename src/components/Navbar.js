import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

    let navigate = useNavigate();
    // async function getName() {
    //     const response = await fetch('http://localhost:5000/name', {
    //         method: "GET",
    //         mode: "cors",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "token": localStorage.getItem('token')
    //         }
    //     })
    //     const json = await response.json();
    //     if (json.Forbidden === "Not Logged In") {
    //         setName("")
    //     } else {
    //         const name = json.fname + ' ' + json.lname === undefined ? "" : json.lname
    //         setName(name)
    //     }
    // }
    function logout() {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <h1>ToDoList</h1>
                {!localStorage.getItem('token') ? <div>
                    <Link to="/login">
                        <button className="btn btn-primary mx-3">Login</button>
                    </Link>
                    <Link to="/signup">
                        <button className="btn btn-primary">SignUp</button>
                    </Link>
                </div> : < button onClick={logout} className="btn btn-primary">Logout</button>}
            </div>
        </nav>
    )
}
