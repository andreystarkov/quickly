/*
* @Author: Andrey Starkov
* @Date:   2016-03-29 19:17:52
* @Last Modified by:   Andrey Starkov
* @Last Modified time: 2016-04-21 13:02:16
*/
import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/lib/raised-button';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Checkbox from 'material-ui/lib/checkbox';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};


const style = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};

const Checkboxes = () => (
  <div style={style.block}>
    <Checkbox
      label="Simple"
      style={style.checkbox}
    />
    <Checkbox
      label="Checked by default"
      defaultChecked={true}
      style={style.checkbox}
    />
    <Checkbox
      label="Disabled"
      disabled={true}
      style={style.checkbox}
    />
    <Checkbox
      checkedIcon={<ActionFavorite />}
      unCheckedIcon={<ActionFavoriteBorder />}
      label="Custom icon"
      style={style.checkbox}
    />
    <Checkbox
      label="Label on the left"
      labelPosition="left"
      style={style.checkbox}
    />
  </div>
);

var CompanyListSidebar = React.createClass({
    filterCardCourier: function(e){
        console.log(e.target.value);
        if ( e.target.value == 'on' ){
            CompanyListActions.filterData(3);
        }
    },
    handleChange: function(e){

    },
    render: function(){
        $.material.init();

        console.log('CompanyListSidebar: init');
        return(
        <div className="sidebar-wrap company-list-sidebar">
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Бесплатная доставка</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Есть акции</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" onChange={this.filterCardCourier} name="somename" /> <span className="filter-name">Оплата картой курьеру</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Онлайн оплата</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Работает сейчас</span></label>
            </div>
            <div className="checkbox control-item">
              <label><input type="checkbox" name="somename" /> <span className="filter-name">Рядом со мной</span></label>
            </div>
        </div>
        )
    }
});

module.exports = CompanyListSidebar;
