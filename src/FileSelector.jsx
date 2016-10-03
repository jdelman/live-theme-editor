import React, { Component } from 'react';

export class FileSelector extends Component {
  constructor(props) {
    super(props);
    this.callReadFile = this.callReadFile.bind(this);
  }

  callReadFile(event) {
    event.stopPropagation();
    this.props.readFile(this.refs.fileInput);
  }

  render() {
    return (
      <div>
        <form onsubmit={ this.props.readFile }>
          <input type="file" name="file" id="file" />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}