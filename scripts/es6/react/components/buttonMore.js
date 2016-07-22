/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 15:45:19
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 18:54:09
*/

var ButtonMore = React.createClass({
    render: function (){
        return (
        <div id={this.props.id} className="button-more-wrap full-width align-center">
            <button onClick={this.props.onClick} className="btn button-more"><i className="icon-reload"></i> Загрузить ещё</button>
        </div>
        )
    }
});

module.exports = ButtonMore;
