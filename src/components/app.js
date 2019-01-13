import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
    render() {
        return 'Welcome';
    }
}

export default connect(null, {})(App)