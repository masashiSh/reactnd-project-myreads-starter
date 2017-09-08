import React from 'react'
import './App.css'

const Error = props => (
  !!(props.error)? <div className="error-message">
    <h2>{`Your search "${props.query}" did not match any books.`}</h2>
  </div>: false
)

export default Error
