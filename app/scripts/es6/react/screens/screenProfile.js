/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:07:44
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-27 05:54:41
*/
import LoadingOrderAnimation from 'react-loading-order-with-animation';

var ProfileEditorActions = require('../actions/profileEditorActions.js');
var HistoryActions = require('../actions/historyActions.js');
var ProfileEditor = require('../profileEditor.react.jsx');
var ReservationHistory = require('../reservationHistory.react.jsx');
var OrdersHistory = require('../ordersHistory.react.jsx');

var ScreenProfile = React.createClass({
    componentDidMount: function(element){
        ProfileEditorActions.fetchList();
        HistoryActions.fetchList();
    },
    render: function(){
        return(
                <div className="the-screen page-wrapper" id="pageProfile">
                <section className="user-profile gray" id="editUserProfile">
                    <div className="profile-editor" id="profileEditor">
                        <LoadingOrderAnimation animation="fade-in" move="from-bottom-to-top"
                        distance={50} speed={700} wait={50}>
                            <ProfileEditor />
                        </LoadingOrderAnimation>
                    </div>
                    <section className="the-tab tab-comments the-history tabs-profile ttt" id="tab-comments-history">
                        <div className="container" id="commentsHistory">
                        </div>
                    </section>
                    <section className="the-tab tab-active order-history tabs-profile" id="tab-order-history">
                        <div className="container" id="ordersHistory">
                            <OrdersHistory />
                        </div>
                    </section>
                    <section className="the-tab the-history tabs-profile" id="tab-reservation-history">
                        <div className="container" id="reservationHistory">
                            <ReservationHistory />
                        </div>
                    </section>
                </section>
                </div>

        )
    }
});

module.exports = ScreenProfile;
