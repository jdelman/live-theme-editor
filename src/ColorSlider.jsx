import React, { Component } from 'react';

import convert from 'color-convert';

export class ColorSlider extends Component {
  constructor(props) {
    super(props)
    this.sliderTypes = ["rgb", "hsl", "lab"];

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  componentWillMount() {
    // default to rgb for now
    const defaultType = this.sliderTypes[0];
    const initialValues = 

    this.setState({
      type: this.sliderTypes[0],
      hexValue: this.props.value,
      values: [null, null, null];
    });
  }

  handleSliderChange() {

  }

  hexToValues(hex) {

  }

  valuesToHex(values) {

  }

  render() {

  }
}