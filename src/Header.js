import React from 'react'

const Header = (props) => {
  return (
    <header>
        <h1>{props.title}</h1>
    </header>
  )
}
Header.defaultProps = {
  title:"TO DO LIST APP"
}

export default Header