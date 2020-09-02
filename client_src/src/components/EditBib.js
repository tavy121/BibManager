import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


class EditBib extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            source:'',
            style:'',
            book:'',
            main:'',
            title:'',
            publisher:'',
            city:'',
            year:'',
            start:'',
            functions:'',
            first:'',
            middle:'',
            last:''

        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount(){
        this.getBibDetails();
    }

    
    getBibDetails(){
        let bibId = this.props.match.params.id;
        axios.get(`http://localhost:3000/bibs/${bibId}`)
        .then(response =>{
            this.setState({
                id: response.data.bibliography._id,
                source: response.data.bibliography.source,
                style:response.data.bibliography.style,
                book:response.data.bibliography.book,
                main: response.data.bibliography.pubtype.main,
                title: response.data.bibliography.pubnonperiodical.title,
                publisher: response.data.bibliography.pubnonperiodical.publisher,
                city: response.data.bibliography.pubnonperiodical.city,
                year: response.data.bibliography.pubnonperiodical.year,
                start: response.data.bibliography.pubnonperiodical.start,
                functions :response.data.bibliography.contributors[0].functions,
                first :response.data.bibliography.contributors[0].first,
                middle :response.data.bibliography.contributors[0].middle,
                last :response.data.bibliography.contributors[0].last,
                }, () =>{
                console.log(this.state);
            });
        })
        .catch(err => console.log(err));
    }

    editBib(newBib){
        console.log(newBib);
        axios.request({
            method: 'patch',
            url: `http://localhost:3000/bibs/${this.state.id}`,
            data: newBib
        })
        .then(response =>{
            this.props.history.push('/');
        })
        .catch(err => console.log(err));
    }
    
    onSubmit(e){
        const newBib = {
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
        this.editBib(newBib);
        e.preventDefault();
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    render(){
        return(
            <div>
                <br />
                <Link className="btn grey" to="/">Back</Link>
               <h1>Edit bib</h1>
               <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input type="text" name="source" ref="source" value={this.state.source} onChange={this.handleInputChange}/>
                        <label htmlFor="source">Source</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="details.style" ref="style" value={this.state.style} onChange={this.handleInputChange}/>
                        <label htmlFor="style">Style</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="book" ref="book" value={this.state.book} onChange={this.handleInputChange}/>
                        <label htmlFor="book">Book</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="main" ref="main" value={this.state.main} onChange={this.handleInputChange}/>
                        <label htmlFor="main">Pubtype</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="title" ref="title" value={this.state.title} onChange={this.handleInputChange}/>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="publisher" ref="publisher" value={this.state.publisher} onChange={this.handleInputChange}/>
                        <label htmlFor="publisher">Publisher</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="city" ref="city" value={this.state.city} onChange={this.handleInputChange}/>
                        <label htmlFor="city">City</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="year" ref="year" value={this.state.year} onChange={this.handleInputChange}/>
                        <label htmlFor="year">Year</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="start" ref="start" value={this.state.start} onChange={this.handleInputChange}/>
                        <label htmlFor="start">Start</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="functions" ref="functions" value={this.state.functions} onChange={this.handleInputChange}/>
                        <label htmlFor="functions">Functions</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="first" ref="first" value={this.state.first} onChange={this.handleInputChange}/>
                        <label htmlFor="first">First Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="middle" ref="middle" value={this.state.middle} onChange={this.handleInputChange}/>
                        <label htmlFor="middle">Middle Name</label>
                    </div>
                    <div className="input-field">
                        <input type="text" name="last" ref="last" value={this.state.last} onChange={this.handleInputChange}/>
                        <label htmlFor="last">Last Name</label>
                    </div>
                    <input type="submit" value="Save" className="btn" />

               </form>
            </div>
        )
    }
}

export default EditBib;