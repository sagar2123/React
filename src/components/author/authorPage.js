"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorList = require('./authorList');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorApi = require('../../api/authorApi');

var Authors = React.createClass(
    {
        getInitialState: function(){
            return {
                 authors: AuthorStore.getAllAuthors()
            };
        },

        render: function(){
            return (
                <div>
                     <h1>Authors</h1>
                     <button><Link to="addAuthor">Add author</Link></button>
                     <AuthorList authors={this.state.authors}/>
                </div>

            );
        }
    }
);

module.exports = Authors;