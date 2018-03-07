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
import Modal from 'boron/WaveModal';
import * as SemesterlyPropTypes from '../../constants/semesterlyPropTypes';

class AddAdvisorModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.searchForAdvisor = this.searchForAdvisor.bind(this);
    // this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.fetchSearchResults = this.fetchSearchResults.bind(this);
    // SearchBar.getAbbreviatedSemesterName = SearchBar.getAbbreviatedSemesterName.bind(this);
    // this.onClickOut = this.onClickOut.bind(this);
    // this.toggleDropdown = this.toggleDropdown.bind(this);
    // this.changeTimer = false;
  }

  componentDidMount() {
    if (this.props.isVisible) {
      this.modal.show();
    }
  }

  componentDidUpdate() {
    if (this.props.isVisible) {
      this.modal.show();
    }
  }
  searchForAdvisor() {
    this.props.loadAdvisor();
    this.props.fetchAdvisorLink(this.state.input);
  }

  render() {
    const modalHeader =
      (<div className="modal-content">
        <div className="modal-header">
          <div
            className="header-pic add-advisor-header-icon"
          >
            <i className="fa fa-user-plus" />
          </div>
          <h1>Add Advisor</h1>
          <div className="modal-close" onClick={() => this.modal.hide()}>
            <i className="fa fa-times" />
          </div>
        </div>
      </div>);
    const modalStyle = {
      width: '100%',
    };
    console.log(this.props.isLoading);
    console.log(this.props.data);
    return (
      <Modal
        ref={(c) => { this.modal = c; }}
        className="add-advisor-modal abnb-modal max-modal"
        modalStyle={modalStyle}
        onHide={() => {
          this.props.toggleAddAdvisorModal();
          history.replaceState({}, 'Semester.ly', '/');
        }}
      >
        {modalHeader}
        <div className="add-advisor-modal__container">
          <div className="search-bar__input-wrapper">
            <input
              ref={(c) => { this.input = c; }}
              placeholder={`Search for an Advisor`}
              value={this.state.input}
              className={this.props.isLoading ? 'results-loading-gif' : ''}
              onInput={e => this.setState({ input: e.target.value })}
              // onFocus={() => this.setState({ focused: true, showDropdown: false })}
              // onBlur={() => this.setState({ focused: false })}
            />
            <button
              className="btn btn-primary"
              style={{ marginLeft: 'auto', marginRight: '10%' }}
              onClick={() => this.searchForAdvisor()}
            >
              Search
            </button>
            <p>{ 'heelo' + this.props.data }</p>
          </div>
        </div>
      </Modal>
    );
  }
}

AddAdvisorModal.propTypes = {
  toggleAddAdvisorModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default AddAdvisorModal;