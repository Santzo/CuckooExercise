import React from 'react';
import './css/Styles.css';
import Header from './components/Header';
import IndexView from './views/IndexView';
import { Provider } from 'react-redux';
import Store from './store';


class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <div className="mainContainer">
          <Header />
          <IndexView />
        </div>
      </Provider>
    )
  };
}

export default App;
