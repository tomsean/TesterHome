var React = require('react-native');
var TopicPage = require('./a-TopicPage');
var apilist = require('../apilist');

var {
  StyleSheet,
  TabBarIOS,
  NavigatorIOS
} = React;


var AppNavBar = React.createClass({
	
  getInitialState() {
      return {
        selectedTab: 'indexTab',
        currentApi: ''
      };
    },
     
  _renderPage(nav) {
        return (
            <NavigatorIOS
              style={styles.container}
              ref='INDEX_NAV'
              initialRoute={{
                component: TopicPage,
                title: 'TesterHome',
                passProps: { 
                  needSlideContents: nav
                }
              }}
              shadowHidden={true}
              translucent={false}
              barTintColor='#e74c3c'
              titleTextColor='#ffffff'
              tintColor='#ffffff'
              />
		);
      }, 
	
  render() {
      return (
			<TabBarIOS
				tintColor="#e74c3c"
				barTintColor="#f9f9f9"
				translucent={false}
			>
			<TabBarIOS.Item
				title="帖子"
                icon={{uri: 'iconfont_zuijinfabu'}}
				selected={this.state.selectedTab === 'indexTab'}
				onPress={() => {
                    this.setState({
                      selectedTab: 'indexTab'
                    });
                  }}>
				{this._renderPage([
                      {api: apilist.RECENT_TOP_API, apiName: 'RECENT_TOP_API', tabLable: '最新'},
                      {api: apilist.POP_TOPIC_API, apiName: 'POP_TOPIC_API', tabLable: '最热'},
                      {api: apilist.NO_REPLY_API, apiName: 'NO_REPLY_API', tabLable: '沙发'},
                      {api: apilist.EXEC_TOPIC_API, apiName: 'EXEC_TOPIC_API', tabLable: '精华'}]
				)}
			</TabBarIOS.Item>
			<TabBarIOS.Item
				title="标签"
                icon={{uri: 'iconfont_jinghua'}}
				selected={this.state.selectedTab === 'niceTab'}
				onPress={() => {
                  this.setState({
                    selectedTab: 'niceTab'
                  });
                }}>
				{this._renderPage([
                      {api: apilist.RECENT_TOP_API, apiName: 'RECENT_TOP_API', tabLable: '北京'},
                      {api: apilist.POP_TOPIC_API, apiName: 'POP_TOPIC_API', tabLable: '上海'}]
				)}
			</TabBarIOS.Item>
			<TabBarIOS.Item
				title="动态"
                icon={{uri: 'iconfont_hot'}}
				selected={this.state.selectedTab === 'hotTab'}
				onPress={() => {
                  this.setState({
                    selectedTab: 'hotTab'
                  });
                }}>
				{this._renderPage([
                      {api: apilist.JOB_API, apiName: 'JOB_API', tabLable: '职业'},
                      {api: apilist.QA_API, apiName: 'QA_API', tabLable: '问答'},
                      {api: apilist.JD_API, apiName: 'JD_API', tabLable: '招聘'},
                      {api: apilist.AC_API, apiName: 'AC_API', tabLable: '活动'}]
				)}
			</TabBarIOS.Item>
			<TabBarIOS.Item
				title="我的"
                icon={{uri: 'iconfont_shafa'}}
				selected={this.state.selectedTab === 'needComment'}
				onPress={() => {
                    this.setState({
                      selectedTab: 'needComment'
                    });
                  }}>
				{this._renderPage([
                      {api: apilist.RECENT_TOP_API, apiName: 'RECENT_TOP_API', tabLable: '最新'},
                      {api: apilist.POP_TOPIC_API, apiName: 'POP_TOPIC_API', tabLable: '最热'},
                      {api: apilist.NO_REPLY_API, apiName: 'NO_REPLY_API', tabLable: '沙发'},
                      {api: apilist.EXEC_TOPIC_API, apiName: 'EXEC_TOPIC_API', tabLable: '精华'}]
				)}
			</TabBarIOS.Item>
			</TabBarIOS>
		);	
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = AppNavBar;