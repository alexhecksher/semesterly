/*
Copyright (C) 2017 Semester.ly Technologies, LLC

Semester.ly is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Semester.ly is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.
*/

import PropTypes from 'prop-types';
import React from 'react';
import COLOUR_DATA from '../constants/colours';
import * as SemesterlyPropTypes from '../constants/semesterlyPropTypes';
// import ClickOutHandler from 'react-onclickout';
// import uniq from 'lodash/uniq';
// import Clipboard from 'clipboard';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      content: '',
    };
    this.setContent = this.setContent.bind(this);
  }
  componentWillMount() {
    $(document.body).on('keydown', (e) => {
      if (e.key === 'Enter' && this.state.input.length > 0) {
        this.setContent();
      }
    });
  }
  setContent() {
    this.setState({ content: this.state.input });
  }
  render() {
    const commentContent = (this.state.content === '') ? (
      <div className="comment-content">
          <input
            ref={(c) => { this.input = c; }}
            placeholder={'Add Comment'}
            value={this.state.input}
            onInput={e => this.setState({ input: e.target.value })}
          />
      </div>
    ) : (
      <div className="comment-content">
        <h3>{ this.state.content }</h3>
      </div>
    )
    const profilePic = (
      <div
        className="social-pro-pic"
        style={{backgroundImage: 'url(https://lh6.googleusercontent.com/-iqNXPUCvgTk/AAAAAAAAAAI/AAAAAAAAAIU/IMUYG8om_Y4/photo.jpg?sz=50)', margin: '5px', zIndex: '2' }}
      />
    )
    const commentData = (this.state.content === '') ? null : (
      <div className="comment-user-data">
        <h4>{ profilePic } { this.props.writer } { this.props.date }</h4>
      </div>
    )
    return (<div
      className="comment-slot"
      // style={{ backgroundColor: COLOUR_DATA[this.props.colourIndex].background }}
    >
      { commentContent }
      { commentData }
    </div>);
  }
}

Comment.defaultProps = {
  writer: null,
  slots: null,
  date: null,
};

Comment.propTypes = {
  colourIndex: PropTypes.number.isRequired,
  writer: PropTypes.string,
  date: PropTypes.string,
};

export default Comment;