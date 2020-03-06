import React, { Component } from "react";

class LifecycleA extends Component {
  constructor(props) {
    super(props);
    console.log("LifecycleA constructor 1");
  }
  componentWillMount() {
    console.log("LifecycleA componentWillMount 2");
    //could be used to set internal component state. But generaly its recomande to use constructor to set local state
  }
  componentDidMount() {
    console.log("LifecycleA componentDidMount 4");
    // called once when the component mount
    // that's the perfect time to do asynchrone request to fetch data from API.
    // the fetch will be stored in internal component state to display it in the render method
  }
  render() {
    console.log("LifecycleA render 3");
    return <div>LifeCycleA</div>;
    // this lifecycle method is mondatory, return the element as an output of the component
    // the method should be purenot modify the locel state, input is props
  }
}

export default LifecycleA;
