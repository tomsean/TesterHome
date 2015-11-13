var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
    Animated
} = React;

var deviceWidth = require('Dimensions').get('window').width;
var TAB_UNDERLINE_REF = 'TAB_UNDERLINE';

var styles = StyleSheet.create({
  tabs: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  }
});

var TopicTabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;
    var tabItemStyle = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff'
    };

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={{ flex: 1 }}>
        <View style={tabItemStyle}>
          <Text style={{color: isTabActive ? '#c0392b' : '#c0392b', fontWeight: isTabActive ? 'bold' : 'normal', fontSize: 16}}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    var numberOfTabs = this.props.tabs.length;
    var tabUnderlineStyle = {
      position: 'absolute',
      width: deviceWidth / numberOfTabs,
      height: 4,
      backgroundColor: '#c0392b',
      bottom: 1
    };
    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, deviceWidth / numberOfTabs]
    });
    return (
      <View>
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  }
});

module.exports = TopicTabBar;
