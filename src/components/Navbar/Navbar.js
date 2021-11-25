import React from 'react';//import react
import { Button } from '../Button';
import {MenuItems} from "./MenuItems";
import './Navbar.css';

class Navbar extends React.Component {
    state = {clicked: false}

    handleClick = () => {
        this.setState({clicked: !this.state.clicked}) //switch the fa-bars to fa-times and vice versa
    }

    render(){
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">ResearchSpace <i className="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}> 
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>       
                </div>
                <ul className={this.state.clicked ? 'nav-menu active':'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        //return all the menu items from MenuItems.js to the screen;index is stored internally in js list 
                        
                        return(
                            <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>

                        )
                        

                    })}


                    
                </ul>
                    <Button>Sign Up</Button>

            </nav>
        )
    }

}

export default Navbar