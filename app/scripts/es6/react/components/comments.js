/*
* @Author: Andrey Starkov
* @Date:   2016-04-15 11:38:24
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 12:25:32
*/
import {TextField} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

var CommentsStore = require('../stores/commentsStore.js');
var CommentsActions = require('../actions/commentsActions.js');

var Comment = React.createClass({
    render: function(){
        var item = this.props.comment;
        console.log('Comment = ',item);
        var stars;
/*        for(var i = 0; i < item.comment_rating; i++){
            stars = stars+'<i className="star yes fa fa-star"></i>';
        }
        for (var i = 0; i < (5-item.comment_rating); i++){
            stars = stars+'<i className="star yes fa fa-star-o"></i>';
        }*/
        return(
            <div className="comment row">
                <div className="col-lg-2 col-xs-2 align-center">
                    <div className="avatar">
                        <img src={imageBaseUrl+item.user_avatar} alt={item.user_name} />
                    </div>
                    <div className="likes">
                        <a href="#" className="like">
                            <i className="fa-thumbs-o-up fa"></i>
                            <span className="count">{item.comment_likes}</span>
                        </a>
                    </div>
                </div>
                <div className="text col-lg-10 col-xs-10">
                    <b>
                        {item.user_name}
                        <span className="stars">{item.comment_rating}.0</span>
                    </b>
                    <p>{item.comment_text}</p>
                </div>
            </div>
        )
    }
});

var Comments = React.createClass({
    mixins: [Reflux.connect(CommentsStore, 'comments')],
    getInitalState: function(){
        return {
            comments: []
        }
    },
    componentDidMount: function(){
        CommentsActions.updateData(this.props.company);
        $('#choose').barrating({theme: 'fontawesome-stars' });
    },
    render: function(){
        var comments, commentsList;

        if( this.state.comments ){
            comments = this.state.comments;
            console.log('Comments: ',comments);
            var commentsList = comments.map(function(the, i) {
                return <Comment comment={the} key={i} />
            });
        }
        return (
            <div className="container">
                <div className="tab-header">
                    <h2>текущие отзывы</h2>
                </div>
                <div className="the-comments">
                    <div className="row">

                        <div className="col-lg-9" id="comments-list">
                            {commentsList}
                        </div>

                        <div className="col-lg-3">
                            <div className="the-form">
                                <TextField
                                  hintText="Ваш комментарий"
                                />
                                <div className="form-group label-floating is-empty">
                                    <label htmlhtmlFor="comment-text" className="control-label">Текст комментария</label>
                                    <input type="text" className="form-control" id="comment-text" />
                                    <span className="help-block"></span>
                                    <span className="material-input"></span>
                                </div>
                                <div className="stars">
                                    <span>Ваша оценка</span>
                                    <select id="choose" className="choose-stars">
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                    </select>
                                </div>
                                <a href="#" className="button main"><i className="icon icn-comment"></i> <span>Отправить комментарий</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Comments;

