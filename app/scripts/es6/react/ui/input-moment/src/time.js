var cx = require('classnames');
var InputSlider = require('./react-input-slider/dist/input-slider.js');

moment.locale('ru');
moment.lang('ru');

module.exports = React.createClass({
  displayName: 'Time',

  render() {
    var m = this.props.moment;
  //  var animation = "callout.flipBounceX";
    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
            <span className="time">{m.format('HH')}</span>
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
  //  this.refs.velocity.runAnimation(opts);
    this.props.onChange(m);

  },

  changeMinutes(pos) {
    var m = this.props.moment;
    m.minutes(parseInt(pos.x, 10));
    this.props.onChange(m);
  }
});
