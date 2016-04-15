/*
* @Author: Andrey Starkov
* @Date:   2016-04-10 23:07:44
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-14 23:39:02
*/

var React = require('react')

var ProfileEditor = require('../profileEditor.react.jsx');
var ReservationHistory = require('../reservationHistory.react.jsx');
var OrdersHistory = require('../ordersHistory.react.jsx');
import { RouteTransition } from 'react-router-transition';

var ScreenProfile = React.createClass({
    componentWillEnter: function(element){
        console.log('ScreenProfile: componentWillEnter ', element);
    },
    render: function(){
        return(
          <RouteTransition
            pathname={this.props.location.pathname}
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}>
                <div className="the-screen page-wrapper" id="pageProfile">
                <section className="user-profile gray" id="editUserProfile">
                    <div className="profile-editor" id="profileEditor">
                        <ProfileEditor />
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
            </RouteTransition>
        )
    }
});

module.exports = ScreenProfile;
