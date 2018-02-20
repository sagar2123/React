"use strict"

var React = require('react');
var Router = require('react-router');
var AuhorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var manageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component){
            if(component.state.dirty && !comfirm("Leave without saving?")){
                transition.abort();
            }
        }
    },
    getInitialState: function(){
        return({
            author: {id: '', firstName: '', lstName: ''},
            errors: {},
            dirty: false
        }
        );
    },

    setAuthorState: function(event){
        this.setState({dirty:true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author})
    },

    authorFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {};

        if(this.state.author.firstName.length < 3){
            this.state.errors.firstName = 'must be three characters';
            formIsValid = false;
        }

        if(this.state.author.lastName.length < 3){
            this.state.errors.lastName = 'must be three characters';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    saveAuthor: function(event){
        event.preventDefault();

        if(!this.authorFormIsValid()){
            return;
        }
        AuthorApi.saveAuthor(this.state.author);
        toastr.success('Author saved.');
        this.transitionTo('authors');
        this.setState({dirty:false});
    },

    componentWillMount: function(){
        var authorId = this.props.params.id;

        if(authorId){
            this.setState({author: AuthorApi.getAuthorById(authorId)});
        }
    },

    render: function(){
        return(
            <AuhorForm author= {this.state.author} onChange={this.setAuthorState} onSave = {this.saveAuthor} errors={this.state.errors}/>
        );
    }
})

module.exports = manageAuthorPage;