import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

// easybib key: de3fbe32dda87b871f4beb1f582649d3

class AddBib extends Component{
    addBib(newBib){
        axios.request({
            method: 'post',
            url: 'http://localhost:3000/bibs',
            data: newBib
        })
        .then(response =>{
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }

    // sendBibToSite(newBib){
    //     axios.request({
    //         method:'put',
    //         url: 'https://api.citation-api.com/2.1/rest/cite',
    //         mode: 'no-cors',
    //         headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Headers': 'GET,PUT,POST,DELETE, PATCH',
    //         'Access-Control-Allow-Headers': 'Content-Type'
    //         },
    //         data: newBib
    //     })
    //     .then(response =>{
    //         console.log(response)
    //     })
    //     .catch(err => console.log(err));
    // }


    sendBibToSite(newBib) {
    return fetch('https://api.citation-api.com/2.1/rest/cite', 
    {
        method: 'PUT',
        mode: 'CORS',
        body: newBib,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log(result);
        return result;
    }).catch(err => console.log(err));
}

    onSubmit(e){
        const newBib = {
            key: this.refs.key.value,
            source: this.refs.source.value,
            style: this.refs.style.value,
            book: this.refs.book.value,
            pubtype: {
                main: this.refs.main.value},
            pubnonperiodical:{
                title: this.refs.title.value,
                publisher: this.refs.publisher.value,
                city: this.refs.city.value,
                year: this.refs.year.value,
                start: this.refs.year.start
            },
            contributors:[
                {
                    functions: this.refs.functions.value,
                    first: this.refs.first.value,
                    middle: this.refs.middle.value,
                    last: this.refs.last.value,
                }
            ]
        }
        this.addBib(newBib);
        this.sendBibToSite(newBib);
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <br />
                <Link className="btn grey" to="/">Back</Link>
               <h1>Add bib</h1>
               <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="key" ref="key" />
                        <label htmlFor="key">Key</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="source" ref="source" />
                        <label htmlFor="source">Source</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="style" ref="style" />
                        <label htmlFor="style">Style</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="book" ref="book" />
                        <label htmlFor="book">Book</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="main" ref="main" />
                        <label htmlFor="main">Pubtype</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="title" ref="title" />
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="publisher" ref="publisher" />
                        <label htmlFor="publisher">Publisher</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="city" ref="city" />
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="year" ref="year" />
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="start" ref="start" />
                        <label htmlFor="start">Start</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="functions" ref="functions" />
                        <label htmlFor="functions">Functions</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="first" ref="first" />
                        <label htmlFor="first">First Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="middle" ref="middle" />
                        <label htmlFor="middle">Middle Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="last" ref="last" />
                        <label htmlFor="last">Last Name</label>
                    </div>
                    <input type="submit" value="Save" className="btn" />
               </form>
            </div>
        )
    }
}

export default AddBib;