// eslint-disable-next-line
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css';

function Header() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Autor Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({ title, onClick }) {
  return (<div className="answer" onClick={() => { onClick(title) }}>
    <h4>{title}</h4>
  </div>);
}

function Turn({ author, books, highlight, onAnswerSeleted }) {

  function highlightbgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    }
    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{ backgroundColor: highlightbgColor(highlight) }}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="author-image" alt="autor" />
      </div>
      <div className="col-6">
        {books.map((title) => <Book title={title} key={title} onClick={onAnswerSeleted} />)}
      </div>
    </div>
  );
}

Turn.PropTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string)
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSeleted: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue() {
  return (<div />)
}

function Footer() {
  return (
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text-muted credit">
          All image from <a href="http://commons.wikimedia.org/wiki/Main">Wiki media</a> commonds and are the public domain
        </p>
      </div>
    </div>
  )
}

function AutorQuiz({ turnData, highlight, onAnswerSeleted }) {
  return (
    <div className="container-fluid">
      <Header />
      <Turn {...turnData} highlight={highlight} onAnswerSeleted={onAnswerSeleted} />
      <Continue />
      <Footer />
    </div>
  );
}

export default AutorQuiz;
