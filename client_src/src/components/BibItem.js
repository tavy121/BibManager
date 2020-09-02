import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class BibItem extends Component{
    constructor(props){
        super(props);
        this.state ={
            item: props.item
        }
    }

    render(){
        return(
            <li className="collection-item">
            <Link to={`/bibs/${this.state.item._id}`}>{this.state.item.pubnonperiodical.title}</Link>
            </li>
        )
    }
}

export default BibItem