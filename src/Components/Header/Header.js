
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/icons/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className='header'>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light pt-4">
                    <img src={logo} alt="" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ml-auto">
                            <Link to="/home" className="nav-link">Home</Link>
                            <Link to='/book' className="nav-link">Book</Link>
                            <Link to="/room" className="nav-link">Room</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                            {loggedInUser &&<Link className='nav-link font-weight-bold text-uppercase'>
                                {loggedInUser.name}
                            </Link>}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;