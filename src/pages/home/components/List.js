import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { actionCreators } from '../store'
import { ListItem, ListInfo, LoadMore } from "../style";
// import bannerPic from "./../../../statics/banner.png";//多行文本里面嵌变量的方式
import { Link } from "react-router-dom";

class List extends PureComponent {
  render() {
    const { list, page, getMoreList } = this.props;
    return (
      <div>
        {
          list.map((item) => {
            return (
              <Link key={item.get('id')} to={'/detail/' + item.get('id')}>
                <ListItem >
                  <img className="pic" src={item.get('imgUrl')} alt="图片"/>
                  <ListInfo>
                    <h3 className="title">{item.get('title')}</h3>
                    <p className="desc">{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            );
          })
        }
        <LoadMore onClick={() => getMoreList(page)}>加载更多</LoadMore>
      </div>
    )
  }
};

const mapState = (state) => ({
  list: state.getIn(['home', 'articleList']),
  page: state.getIn(['home', 'articlePage'])
});

const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    dispatch(actionCreators.getHomeList(page))
  }
});

export default connect(mapState,mapDispatch)(List);