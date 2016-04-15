require('velocity-animate');
require('velocity-animate/velocity.ui');

var {VelocityComponent} = require('velocity-react');

var cx = require('classnames');
var React = require('react');
var InputSlider = require('react-input-slider');

moment.locale('ru');
moment.lang('ru');

module.exports = React.createClass({
  displayName: 'Time',

  render() {
    var m = this.props.moment;
    var animation = "callout.flipBounceX";
    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <VelocityComponent ref="velocity" animation={animation}>
            <span className="time">{m.format('HH')}</span>
          </VelocityComponent>
          <span className="separater">:</span>
          <span className="time">{m.format('mm')}</span>
        </div>

        <div className="sliders">
          <div className="time-text">Часы:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={23}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className="time-text">Минуты:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={59}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  },

  changeHours(pos) {
    var m = this.props.moment;
    m.hours(parseInt(pos.x, 10));
    this.refs.velocity.runAnimation(opts);
    this.props.onChange(m);

  },

  changeMinutes(pos) {
    var m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});
