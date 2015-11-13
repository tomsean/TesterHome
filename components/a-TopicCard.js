'use strict';

var React = require('react-native');
var styles = require('./a-TopicStyle');

var {
  Text,
  View,
  Image,
  TouchableOpacity
} = React;


var TopicCard = React.createClass({
  getInitialState() {
    return {
      cardId: this.props.cardId,
      topicItem: this.props.topicItem
    };
  },

  componentDidMount() {
    
  },
  
  _avatarFilter(topic) {
    let avatar = topic.user && 
                 topic.user.avatar_url && 
                 topic.user.avatar_url;
                 
    if(avatar) {
      return /testerhome/i.test(avatar) ?
           avatar :
           'https://testerhome.com' + avatar;
    } else {
      // TODO
      // 替换成匿名用户头像地址
      return 'https://testerhome.com/user/big_avatar/118.jpg';
    }
  },
  
  _checkUser(topic) {
    let login = topic.user && 
                 topic.user.login && 
                 topic.user.login;
                 
    if(login) {
      return login;
    } else {
      return '匿名用户';
    }
  },

  _stringFilter(title, len) {
    return title.length >= len ?
           title.slice(0, len) + '...' :
           title;
  },

  _countRate(count) {
    let num = Number(count);
    if(num > 100) {
      return '热评';
    } else {
      return num.toString();
    }
  },
  
  _onPressTopicItem() {
    console.log(this.state.cardId);
  },

  render() {
    return (
      <TouchableOpacity onPress={this._onPressTopicItem} activeOpacity={0.8}>
      <View style={styles.topicCard}>
        <View style={styles.avatar}>
          <Image
            style={styles.avatarImg}
            source={{uri:this._avatarFilter(this.state.topicItem)}}
            resizeMode='cover'
          />
        </View>

        <View style={styles.titleMeta}>
          <Text style={styles.topicTitle}>{this.state.topicItem.title}</Text>
            <View style={styles.metaarea}>
              <Text style={styles.metainfo}>{this._checkUser(this.state.topicItem)}</Text>
              <Text style={styles.metainfo}>刚刚更新</Text>
            </View>

            <View style={styles.metaareatag}>
              <Text style={styles.nodename}>{this.state.topicItem.node_name}</Text>
              <View style={styles.replieCountBg}>
                <Text style={styles.replieCount}>{this._countRate(this.state.topicItem.replies_count)}</Text>
              </View>
            </View>
        </View>
      </View>
      </TouchableOpacity>
    );
  }
});

module.exports = TopicCard;