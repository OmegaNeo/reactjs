import React from "react";
import { render } from "react-dom";
import { createStore, bindActionCreators, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { Provider, connect } from "react-redux";
import Table from './components/Table';
import { helloSaga } from './sagas'

/*const counter = (state, action) => {
  switch (action.type) {
    case "+":
      return state + 1;
    case "-":
      return state - 1;
    default:
      return state;
  }
};*/

const sagaMiddleware = createSagaMiddleware();

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return {...data, ...{isloading:true}};
    case "SET_DATA":
      return action.data;
    default:
      return state;
  }
};
 
const data = {
  isloading: false,
  countries: []
};
//const store = createStore(counter, 0);
const store = createStore(reducer, data, applyMiddleware(sagaMiddleware));
class App extends React.Component {
  state = {
    counter: null
  };

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        counter: store.getState()
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Ahoji</h1>
        <h2>{this.state.counter}</h2>
        <button onClick={() => store.dispatch({ type: "+" })}>Add +1</button>
        <button onClick={() => store.dispatch({ type: "-" })}>Add -1</button>
      </div>
    );
  }
}

class App2 extends React.Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div>
        <h1>Ahoj</h1>
        <h2>{this.props.counter}</h2>
        <button onClick={() => dispatch({ type: "+" })}>Add +1</button>
        <button onClick={() => dispatch({ type: "-" })}>Add -1</button>
      </div>
    );
  }
}

class App3 extends React.Component {
  render() {
    const { addOne, addMinusOne } = this.props;

    return (
      <div>
        <h1>Ahoj 3</h1>
        <h2>{this.props.counter}</h2>
        <button onClick={() => addOne()}>Add +1</button>
        <button onClick={() => addMinusOne()}>Add -1</button>
      </div>
    );
  }
}

class App4 extends React.Component {
  render() {
    const data = [{id: 1,
    name : "Afghanistan",
    alpha2Code: "AF",
    alpha3Code: "AFG",
    altSpellings: ["AF", "AFG"],
    area: 652230,
    borders: ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"],
    callingCode: ["93"],
    capital: "Kabul",
    population: 125426,
    cioc: "AFG"}];

    return(
        <div>
          <Table data={data}/>
        </div>
    ); 
  }
}


/*function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addOne: () => ({ type: "+" }),
      addMinusOne: () => ({ type: "-" })
    },
    dispatch
  );
}*/

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
     getData: () => ({ type: GET_DATA})
    },
    dispatch
  );
}

function mapStateToProps(state) {
  return {
    counter: state
  };
}

const EnhancedApp = connect(mapStateToProps, mapDispatchToProps)(App4);

render(
  <Provider store={store}>
    <EnhancedApp />
  </Provider>,
  document.getElementById("root")
);
