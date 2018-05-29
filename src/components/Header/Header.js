import React from 'react';
import './Header.css';

// navItems will be mapped over to create 3 divs that will act as links in our header
// This is taking advantage of React to keep our code DRY (Don't Repeat Yourself)
const navItems = ['Home', 'Coins', 'Tracker'];

// Here we're destructuring the props coming from the parent.
// Could also write this as:  const Header = (props) => (
// and use viewChange as props.viewChange
const Header = ({ viewChange }) => (
  <header className="flex">
    <div className="logo-container">
      <img
        src="https://heydesign.com/wp-content/uploads/2017/08/Cool-Logos-and-Graphic-Trends-about-Music-DJs-750x500.jpg"
        alt="logo"
      />
    </div>
    <div className="nav-list flex">
      {navItems.map(item => (
        <div key={item} className="nav-list-item" onClick={viewChange}>
          {item}
        </div>
      ))}
      {/* The above will render and could be written long hand like this ->
      <div className="nav-list-item" onClick={viewChange}>
        Home
      </div>
      <div className="nav-list-item" onClick={viewChange}>
        Coins
      </div>
      <div className="nav-list-item" onClick={viewChange}>
        Tracker
    </div> */}
    </div>
  </header>
);

export default Header;
