import React from 'react'

export default function Alert() {
    return (
        <div id='alert' style={{ display: 'none' }} className="alert alert-danger alert-dismissible fade show" role="alert">
            <span id='error-msg'></span>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
