import React, { Component } from "react";

class LifecycleB extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "Mohamed" };
    this.onChangeState = this.onChangeState.bind(this);
  }

  onChangeState() {
    this.setState({ name: "RBIHI Mohamed" });
  }

  componentWillReceiveProps(state, props) {
    console.log("componentWillReceiveProps 1");
    // --- avoid this lifecycle method ---
    //called during an update lifecycle
    //you can diff next props with previous props
    //you can set state based on next props
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate 2");
    //called component updated due to stateor props changes
    //use it in mature react app for performance
    //the component and all its childrenwill render or not render an update
    //use it to prevent an update
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate 3");
    // --- avoid this life cycle method ---
    //immediatly invoked before the render method.
  }

  render() {
    console.log("render 4");

    return (
      <div>
        <button onClick={this.onChangeState}>Change state</button>
        Lifecycle Update methods
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate 5");
    // immediatly invoked after the render lifecycle method
    // use it as opportunity to perform DOM pperation or asynchronous request
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");

    //Called immediately before a component is destroyed.
    //use it to peform any clean up tasks
  }
}

export default LifecycleB;
