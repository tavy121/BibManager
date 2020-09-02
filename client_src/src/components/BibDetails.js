import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class BibDetails extends Component{
    constructor(props){
        super(props);
        this.state ={
            details:'',
            pubnon:'',
            pubtype:'',
            contributors:[]
        }
        
    }

    componentWillMount(){
        this.getBib();
    }

    getBib(){
        let bibId = this.props.match.params.id;
        axios.get(`http://localhost:3000/bibs/${bibId}`)
        .then(response =>{
            this.setState({details: response.data.bibliography,
                 pubnon:response.data.bibliography.pubnonperiodical,
                 pubtype:response.data.bibliography.pubtype,
                 contributors:response.data.bibliography.contributors[0] }, () =>{
                console.log(this.state);
            });
        })
        .catch(err => console.log(err));
    }

    onDelete(){
        let bibId = this.state.details._id;
        axios.delete(`http://localhost:3000/bibs/${bibId}`)
        .then(response =>{
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <br />
                <Link className="btn grey" to="/">Back</Link>
                <h1>{this.state.pubnon.title}</h1>
                <ul className="collection">
                    <li className = "collection-item">Key: {this.state.details.key}</li>
                    <li className = "collection-item">Source: {this.state.details.source}</li>
                    <li className = "collection-item">Style: {this.state.details.style}</li>
                    <li className = "collection-item">Pubtype: {this.state.pubtype.main}</li>
                    <li className = "collection-item">Publisher: {this.state.pubnon.publisher}</li>
                    <li className = "collection-item">City: {this.state.pubnon.city}</li>
                    <li className = "collection-item">Year: {this.state.pubnon.year}</li>
                    <li className = "collection-item">Start: {this.state.pubnon.start}</li>
                    <li className = "collection-item">Function: {this.state.contributors.functions}</li>
                    <li className = "collection-item">First Name: {this.state.contributors.first}</li>
                    <li className = "collection-item">Middle Name: {this.state.contributors.middle}</li>
                    <li className = "collection-item">Last Name: {this.state.contributors.last}</li>
                </ul>

                <Link className="btn" to={`/bibs/edit/${this.state.details._id}`}>Edit</Link>

                <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
            </div>
        )
    }
}

export default BibDetails