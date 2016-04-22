var CityListActions = require('../actions/cityListActions.js');
var CityList = require('../cityList.react.jsx');

var resultCity;

function selectCityByName(cityName){
    var cities = getStorage('cities');
    var single = _.where(cities,{city_name:cityName.trim()});
    var selected;

 //   console.log('selectCityByName: cityName = '+cityName, 'Cities = ', cities, single);

    single.forEach(function (val, index) {
    //    console.log('selectCityByName: selected: ', val);
        selected = val;
    });
    if(selected){
        var isLocked = getStorage('cityLocked', 1);

        if( isLocked !== 1 ){
          setStorage('city', selected);

          var currentCityId = selected.city_id;
       //   console.log('City not Locked. ');
          $('#cityListSelect option').each(function(el){
              if( currentCityId == $(this).val() ){
        //        console.log('selectCityByName: Selecting city: ', $(this).html());
                $(this).attr('selected', 'selected');
              }
          });

          currentCity = selected;
        } else {
          var city = getStorage('city');
      //    console.log('City is locked! Current: ',city);
          currentCity = city.city_id;
        }
    } else {
    //    console.log('Wrong city or whatever');
      //  console.log('Setting Default City');
          $('#cityListSelect option').each(function(el){
              if( $(this).val() == 3 ){
         //       console.log('selectCityByName: selected');
                $(this).attr('selected', 'selected');
              }
          });

    }
}

function getCity(position) {
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
          //      console.log('getCity: results = ', results);
                  if (results[0]) {
                      var add= results[0].formatted_address ;
                      var value=add.split(",");
              //        console.log('getCity: ')
                      var count=value.length;
                      var country=value[count-1];
                      var state=value[count-2];
                      var city=value[count-4];
              //        console.log('getCity: City detected: ', city.trim());
                      selectCityByName(city.trim());

                  } else  {
                   //   alert("address not found");
                  }
          }
           else {
           //   alert("Geocoder failed due to: " + status);
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
  //    console.log('getCIty: '+resultCity);
    },
    fetchList: function() {
      var some = this;
      $.getJSON(this.sourceUrl, function (data) {
        setStorage('cityList', data.result.cities);
        some.cityList = data.result.cities;
        some.trigger(some.cityList);
   //     this.getCity();
        cities = some.cityList;
        setStorage('cities', cities);
        navigator.geolocation.getCurrentPosition(getCity);
   //     console.log('REFLUX: CityListStore fetchList', some.cityList);
      });
    }
});

module.exports = CityListStore;
