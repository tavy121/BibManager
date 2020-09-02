import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component{
    render(){
        return(
            <div>
                <nav className="blue darken-3">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo center">Bibs</a>
                        <a data-activates="main-menu" className="button-collapse show-on-large">
                        <i className="fa fa-bars"></i>
                        </a>
                        <ul className="right hide-on-small-only">
                        <li><Link to="/"><i className="fa fa-users"></i>Bibs</Link></li>         
                        </ul>
                        <ul className="side-nav" id="main-menu">
                            <li><Link to="/"><i className="fa fa-users"></i> Bibliography</Link></li>  
                            <li><Link to="/bibs/add"><i className="fa fa-plus"></i> Add bib</Link></li>  
                            <li><Link to="/about"><i className="fa fa-question-circle"></i> About</Link></li> 
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

};

export default Navbar;