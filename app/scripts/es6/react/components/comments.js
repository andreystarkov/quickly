/*
* @Author: Andrey Starkov
* @Date:   2016-04-15 11:38:24
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-15 19:21:00
*/
import {TextField, RaisedButton} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

var CommentsStore = require('../stores/commentsStore.js');
var CommentsActions = require('../actions/commentsActions.js');

var lang = {
    comments: {
        commentForm: {
            formHeader: 'Оставьте отзыв!',
            messageName: 'Ваше имя',
            messageLabel: 'Текст вашего сообщения',
            messageHint: 'Здесь вы можете аргументировать вашу оценку',
            ratingLabel: 'Ваша оценка',
            buttonSend: 'Отправить комментарий',
            buttonSendIcon: 'icon icn-comment',
            chooseStars: 'Выберите оценку'
        },
        errors: {
            sendFail: 'Видимо что-то случилось'
        }
    }
}

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


function postComment(restaurantId, text, rating, callback){
    var params = {
        token: userToken,
        restaurantId: parseInt(restaurantId),
        rating: parseInt(rating),
        message: text
    };
    console.log('postComment: params = ', params);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        url: serverUrl + '/api/v2/comments/create',
        data: JSON.stringify(params),
        success: function(data) {
            if(!data.err){
                console.log('postComment: success: ', data);
                CommentsActions.updateData(restaurantId);
                if (callback) callback(data);
            } else {
                console.log('postComment: ERROR: ', data.err);
                toastr.error(lang.comments.errors.sendFail);
            }
        }
    });
}


var TheTextArea = React.createClass({
    componentDidMount: function(){
        $.material.init();
    },
    render: function(){
        var token = Math.random().toString(34).substr(2);
        return (
            <div className="form-group">
              <label htmlFor={this.props.id || token} className="control-label">{this.props.label}</label>
              <div>
                <textarea
                    className="form-control"
                    rows="3" id={this.props.id || token} value={this.props.value}
                    onChange={this.props.change} id="textArea"></textarea>
                    <span className="help-block">{this.props.hint}</span>
              </div>
            </div>
        )
    }
});

var CommentForm = React.createClass({
    getInitialState: function(){
        return {
            message: '',
            rating: 0,
            enabled: false
        }
    },
    componentWillMount: function(){
        if(userToken){
            var _this = this;
            var url = serverUrl+'/api/v2/comments/get-possibility/'+userToken+'/'+this.props.company;
            $.getJSON(url, function(data){
                console.log('commentForm: Can i comment there?', data.result);
                _this.setState({
                    enabled: data.result
                });
            });
        } else console.log('commentForm: not authorized');
    },
    componentDidMount: function(){
        $('#choose').barrating({ theme: 'fontawesome-stars' });
    },
    sendMessage: function(){
        postComment(this.props.company, this.state.message, this.state.rating,
        function(data){
            console.log('sendMessage: callback',data);
            toastr.success('Спасибо за ваш комментарий!', 'Вы оставили отзыв!');
        });
        // postComment(restaurantId, message, rating, callback)
    },
    msgChange: function(e){
        this.setState({
            message: e.target.value
        });
    },
    setRating: function(e){
        this.setState({
            rating: e.target.value
        });
    },
    render: function(){
        var btnStyle = { marginTop: 10, fontSize: 13, fontWeight: 400 }
        var inputGroup = { marginBottom:35, marginTop:10 }
        var starsStyles = { marginBottom:5, marginTop:15 }
        var disabled = true;
        var profile = getStorage('profile');
        var texts = lang.comments.commentForm;

        if( profile ){
            var userName = profile.userName+' '+profile.userSurname;

            if( this.state.enabled ) disabled = false;
        }

        return(
        <div className="comment-form">
          <div className="tab-header">
            <h2>{texts.formHeader}</h2>
          </div>

            <div className="form-group label-floating" style={inputGroup}>
              <label className="control-label" htmlFor="focusedInput2">{texts.messageLabel}</label>
              <input disabled={disabled} onChange={this.msgChange} className="form-control" id="focusedInput2" type="text" />
              <p className="help-block">{texts.messageHint}</p>
            </div>

            <div className="stars" style={starsStyles}>
                <label htmlFor="choose" className="control-label">
                    {texts.chooseStars}
                </label>
                <select disabled={disabled} id="choose" onChange={this.setRating} className="choose-stars">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
            </div>
            <RaisedButton disabled={disabled} onClick={this.sendMessage} backgroundColor="#fff036" label={texts.buttonSend} style={btnStyle}>
            </RaisedButton>
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

                <div className="the-comments">
                    <div className="row">
                        <div className="col-lg-9" id="comments-list">
                          <div className="tab-header">
                            <h2>текущие отзывы</h2>
                          </div>
                            {commentsList}
                        </div>

                        <div className="col-lg-3">
                            <CommentForm company={this.props.company} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Comments;

