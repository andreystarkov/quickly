/*
* @Author: Andrey Starkov
* @Date:   2016-04-21 11:36:16
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 11:36:38
*/

var Spinner = React.createClass({
 render: function(){
    return(
        <div className="spinner-wrap">
            <svg className="spinner" width="85px" height="85px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
               <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    )
 }
});

module.exports = Spinner;
