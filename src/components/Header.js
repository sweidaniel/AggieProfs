import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function Header() {
  return (
    <header style={{ backgroundColor: '#500000', color: 'white', padding: '20px', fontSize: '24px' }}>
      {/* Wrap the content in a Link component */}
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        AggieProfs - Find the best Professors & Classes
      </Link>
    </header>
  );
}

export default Header;
