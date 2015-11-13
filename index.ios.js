/* @flow */
'use strict';

var React = require('react-native');
var AppMain = require('./components/a-AppMain');

var {
  AppRegistry,
  View,
  StatusBarIOS
} = React;

var Demo = React.createClass({
    
  componentDidMount() {
    StatusBarIOS.setStyle('light-content');
  },
    
  render() {
    return (            
      <View style={{ flex: 1 }}>
        <AppMain />
      </View>
    );
  }
});

AppRegistry.registerComponent('TesterHome', () => Demo);
