/*
* @Author: Andrey Starkov
* @Date:   2016-03-24 15:45:19
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-02 13:26:10
*/

var ButtonMore = React.createClass({
    render: function (){
        return (
            <button onClick={this.props.onClick} className="button button-more"><i className="icon-reload"></i> Загрузить ещё</button>
        )
    }
});

module.exports = ButtonMore;
