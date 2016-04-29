import cookie from 'react-cookie';
var CityListActions = require('../actions/cityListActions.js');
var CityList = require('../cityList.react.jsx');
var resultCity;

function citySelectList(cities){
    var total;
    cities.forEach(function(the, i){
      total += `<option value=${the.city_id}>${the.city_name}</option>`;
    });
    return `<div className="form-group modal-select" id="modal-city-select">
              <select id="modal-city-list" class="form-control">
                ${total}
              </select>
            </div>`
}

function initGeolocation(cities){
    console.log('initGeolocation: ', cities);
    navigator.geolocation.getCurrentPosition(getCity);
/*    if('geolocation' in window){
      console.log('Geolocation enabled')
      navigator.geolocation.getCurrentPosition(getCity);
    } else {
      console.log('Geolocation disabled');
      toastr.error('Не удалось определить ваш город, выберите из списка');
    }*/
}

function selectCityByName(cityName){
    var cities = _cities || getStorage('cities');
    var single = _.where(cities,{city_name:cityName.trim()});
    var selected;
    var _thisCity = cookie.load('city');

    console.log('selectCityByName: cityName = '+cityName, 'Cities = ', cities, single);

    single.forEach(function (val, index) {
        console.log('selectCityByName: selected: ', val);
        selected = val;
    });

    if(selected){
        var isLocked = getStorage('cityLocked', 1);
        console.log('selectCityByName: '+_thisCity+' != '+selected.city_id);

        if( _thisCity !== selected.city_id ){

   // var _this = this;
            swal({
            title: 'Ваш город '+cityName+'?',
            text: '',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Да',
            cancelButtonText: 'Нет',
            closeOnConfirm: true
            }).then(function(isConfirm) {
              if (isConfirm) {
                setStorage('city', selected);
                cookie.save('city', selected.city_id);
                var currentCityId = selected.city_id;
                console.log('City not Locked. ');

                $('#cityListSelect').val(selected.city_id);

/*                $('#cityListSelect option').each(function(el){
                    if( currentCityId == $(this).val() ){
                      console.log('selectCityByName: Selecting city: ', $(this).html());
                      $(this).attr('selected', 'selected');
                    }
                });*/

                currentCity = selected;

                $('#cityListSelect').popover({
                  placement: 'bottom', trigger: 'manual',
                  content: 'Ваш город определен как '+cityName+'. Если город определен не верно, выберите его из списка'
                });

                $('#cityListSelect').popover('show');
                setTimeout(function(){
                  $('#cityListSelect').popover('hide');
                }, 4000);
              }
            });
        } else {
          console.log('selectCityByName: equal');
        }
    } else {
         console.log('Wrong city or whatever');
         console.log('Setting Default City');
          $('#cityListSelect option').each(function(el){
              if( $(this).val() == 3 ){
                console.log('selectCityByName: selected');
                $(this).attr('selected', 'selected');
              }
          });

    }
}

export function getCity(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  console.log('getCity: '+lat+' / '+long);
  console.log('getCity: ', position);
  var geocoder;
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(lat, long);
  geocoder.geocode(
      {'latLng': latlng},
      function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
                  console.log('getCity: results = ', results);
                  if (results[0]) {
                      var add= results[0].formatted_address ;
                      var value=add.split(",");
                      console.log('getCity: ')
                      var count=value.length;
                      var country=value[count-1];
                      var state=value[count-2];
                      var city=value[count-4];
                      console.log('getCity: City detected: ', city.trim());

                          selectCityByName(city.trim());

                  } else  {
                      alert("address not found");
                  }
          }
           else {
              alert("Geocoder failed due to: " + status);
          }
      }
  );
}

var CityListStore = Reflux.createStore({
    listenables: [CityListActions],
    cityList: [],
    sourceUrl: serverUrl+'/api/v4/cities/get',
    init: function() {
        this.fetchList();
    },
    getCity: function(){
      getCurrentCity();
      console.log('getCIty: '+resultCity);
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        setStorage('cityList', data.result.cities);
        setStorage('cities', cities);

     //   initGeolocation(data.result.cities);
        _cities = data.result.cities;
        navigator.geolocation.getCurrentPosition(getCity);
        some.cityList = data.result.cities;
        some.trigger(some.cityList);
        // some.getCity();
        cities = some.cityList;
        console.log('CityListStore fetchList', some.cityList);
      });
    }
});

module.exports = CityListStore;
