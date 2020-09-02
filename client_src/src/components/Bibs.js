import React, { Component } from 'react';
import axios from 'axios';
import BibItem from './BibItem';

class Bibs extends Component{
    constructor(){
        super();
        this.state = {
            bibs: []
        }
    }

    componentWillMount(){
        this.getBibs();
    }

    getBibs(){
        axios.get('http://localhost:3000/bibs')
        .then(response =>{
            this.setState({bibs: response.data}, () =>{
                //console.log(this.state);
            });
        })
        .catch(err => console.log(err));
    }

    render(){
        const bibsItems = this.state.bibs.map((bib, i) =>{
            return (
                //console.log(bib),
                <BibItem key={ bib._id } item={ bib }/>
            )
        })
        return(
            <div>
                <h1>Bibs</h1>
                <ul className="collection">
                    {bibsItems}
                </ul>
            </div>
        )
    }

};

export default Bibs;