'use strict';

var React = require('react-native');
var TopicCardList = require('./a-TopicCardList');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TopicTabBar = require('./a-TopicTabBar');

var {
  View
} = React;

var TopicPage = React.createClass({

  _renderSlidesContent(slides) {
      return slides.map((obj) => {
        return (
         <View key={obj.apiName} tabLabel={obj.tabLable} style={{ flex: 1 }}>
          <TopicCardList
            resourceApi={obj.api}
            currentReqName={obj.apiName}
          />
        </View>
       );
      });
    },

  getInitialState: function() {
    return {

    };
  },

  render: function() {
    return (
      <ScrollableTabView
        renderTabBar={() => <TopicTabBar />}
        sceneContainerStyle={{ paddingBottom: 113 }}
        edgeHitWidth={9999}
       >

       {this._renderSlidesContent(this.props.needSlideContents)}
      </ScrollableTabView>
    );
  }

});

module.exports = TopicPage;
