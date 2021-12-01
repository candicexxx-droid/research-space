import React, { Component } from "react";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data.js";
import MySelect from "./MySelect.js";
import Session from "react-session-api";
import "./Filter.css";
import { components } from "react-select";

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponents = makeAnimated();
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = selected => {
    this.setState({
      optionSelected: selected
    });
    
  };

  storeFiltervalue(){
      if(this.state.optionSelected !== null){
          let options =[];
          for (let i = 0; i < this.state.optionSelected.length; i++){
            options.push(this.state.optionSelected[i].value);
          }
        Session.set('filteroption', options.toString());
        //console.log(this.state.optionSelected);
      }else{
        Session.set('filteroption', '');
      }
  }

  render() {
      this.storeFiltervalue();
    return (
      <MySelect
        options={colourOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option, MultiValue, animatedComponents }}
        onChange={this.handleChange}
        allowSelectAll={true}
        value={this.state.optionSelected}
      />
    );
  }
}

export default Filter;