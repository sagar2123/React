"use strict"

var React = require('react');
var Router = require('react-router');
var AuhorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');

var manageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    getInitialState: function(){
        return({
            author: {id: '', firstName: '', lstName: ''}
        }
        );
    },

    setAuthorState: function(event){
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author})
    },

    saveAuthor: function(event){
        event.preventDefault();
        AuthorApi.saveAuthor(this.state.author);
        this.transitionTo('authors');
    },

    render: function(){
        return(
            <div>
                <h1>Manage Author</h1>  
                <AuhorForm author= {this.state.author} onChange={this.setAuthorState} onSave = {this.saveAuthor}/>
            </div>  
        );
    }
})

module.exports = manageAuthorPage;