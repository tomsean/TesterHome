'use strict';

var React = require('react-native');
var superagent = require('superagent');
var RefreshableListView = require('react-native-refreshable-listview');
var apilist = require('../apilist');
var styles = require('./a-TopicStyle');
var TopicCard = require('./a-TopicCard');

var {
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicatorIOS
} = React;


var TopicCardList = React.createClass({
  getInitialState() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      currentOffset: 0
    };
  },

  componentDidMount() {
    this.fetchTopicsData();
  },

  _loadMore() {
    this.fetchTopicsData(
      apilist.fetchResourceWithPage(
        apilist[this.props.currentReqName],
        this.state.currentOffset + 20
      ),
      20
    );
  },

  _reload() {
    this.fetchTopicsData(
      apilist.fetchResourceWithPage(
        apilist[this.props.currentReqName]
      )
    );
  },

  fetchTopicsData(api=this.props.resourceApi, more=0) {
    superagent.get(api)
              .set('Accept', 'application/json')
              .end((err, res) => {
                // console.log(res);
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(res.body.topics),
                  loaded: true,
                  currentOffset: this.state.currentOffset + more
                });
              });
  },

  render() {
    return (
      !this.state.loaded ?
      <View style={ styles.loading }>
        <ActivityIndicatorIOS
            size="small"
            color="#333333"
        />
        <Text style={styles.loadingTip}>加载中...</Text>
      </View> :
      <RefreshableListView
        initialListSize={20}
        pageSize={20}
        onEndReached={this._loadMore}
        dataSource={this.state.dataSource}
        renderRow={this.renderTopicItem}
        style={styles.topicListView}
        removeClippedSubviews={true}
        onEndReachedThreshold={0}
        loadData={this._reload}
        refreshDescription='正在刷新...'
        refreshingIndictatorComponent={
          <RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />
        }
        minDisplayTime={500}
        minPulldownDistance={80}
        minBetweenTime={2000}
      />
    );
  },

  renderTopicItem(topic) {
    return (
      <TopicCard
        topicItem={topic}
        cardId={topic.id}
      />
    );
  }
});

var indicatorStylesheet = StyleSheet.create({
  wrapper: {
    height: 80,
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    marginTop: 10,
    marginBottom: 10,
    height: 60
  }
});

module.exports = TopicCardList;
