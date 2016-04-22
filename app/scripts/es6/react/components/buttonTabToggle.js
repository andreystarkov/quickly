/*
* @Author: Andrey Starkov
* @Date:   2016-04-07 14:04:04
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 22:24:57
*/

var ButtonTabToggle = React.createClass({
    render: function(){
        var classNames = "tab-toggle btn button light";
        var disabled = false;

        if( this.props.disabled ){
            disabled = true;
        }
        if( this.props.active ){
         //   console.log('ButtonTabToggle: "'+this.props.name+'" is active');
            classNames += " active";
        }
        return(
            <button className={classNames+' button-'+this.props.tab} id={this.props.id} data-tab={this.props.tab} disabled={disabled}>
                <span>{this.props.name}</span>
            </button>
        )
    }
});

module.exports = ButtonTabToggle;
