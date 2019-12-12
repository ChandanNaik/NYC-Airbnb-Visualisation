const deckgl = new deck.DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pudzRtaWloMDAzcTN2bzN1aXdxZHB5bSJ9.2bkj3IiRC8wj3jLThvDGdA',
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  longitude: -74.15,
  latitude: 40.71,
  zoom: 10,
  minZoom: 7,
  maxZoom: 15,
  pitch: 0,
  bearing: 0
});


const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

function renderLayer(data) {
  const screenGridLayer = new deck.ScreenGridLayer({
    id: 'grid',
    colorRange: COLOR_RANGE,
    data: data,
    elevationRange: [0, 100000],
    elevationScale: 250,
    extruded: false,
    getPosition: d => [Number(d.longitude), Number(d.latitude)],
    opacity: 0.5,
    cellSizePixels: 4
  });

  deckgl.setProps({
    layers: [screenGridLayer]
  });
}



var allData = d3.csv('../data/AB_NYC_2019.csv');

var selectedRegion = "all"
filterData(selectedRegion, 500);
renderLayer(allData);

// Handling both price and region
const areaDropDown = document.querySelector('#dropdown')
const priceSlider = document.querySelector('#price')

document.body.addEventListener('change', event => {
  if (event.target !== areaDropDown && event.target !== priceSlider) {
    return
  } else {
    if (event.target == areaDropDown) {
      var maxPrice = document.getElementById("price").value;
      var region = `${event.target.value}`;

      console.log("change region : ", maxPrice, region);
      switch (region) {
        case "Bronx":
          filterData(region, maxPrice);
          break;
        case "Brooklyn":
          filterData(region, maxPrice);
          break;
        case "Manhattan":
          filterData(region, maxPrice);
          break;
        case "Queens":
          filterData(region, maxPrice);
          break;
        case "Staten Island":
          filterData(region, maxPrice);
          break;
        default:
          filterData(region, maxPrice);
      }
    } else {
      var region = document.getElementById("dropdown").value;
      var maxPrice = `${event.target.value}`;

      //TODO call filerData function
      console.log("change price : ", maxPrice, region)

      switch (region) {
        case "Bronx":
          filterData(region, maxPrice);
          break;
        case "Brooklyn":
          filterData(region, maxPrice);
          break;
        case "Manhattan":
          filterData(region, maxPrice);
          break;
        case "Queens":
          filterData(region, maxPrice);
          break;
        case "Staten Island":
          filterData(region, maxPrice);
          break;
        default:
          filterData(region, maxPrice);
      }
    }
  }
});


function filterData(area, maxPrice) {

  try {
    d3.csv("data/AB_NYC_2019.csv", function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d["price"] = +d["price"];
      });

      var original = data;

      if (area == "all")
      {
        data = original;

        data = data.filter(function(d){
          return d.price <= maxPrice;
        });
        renderLayer(data);
      }
      else
      {
        data = original.filter(function(d) {
          return d.neighbourhood_group == area;
        });

        data = data.filter(function(d){
          return d.price <= maxPrice;
        });
        renderLayer(data);
      }
    });
  } catch (e) {
    console.log(e);
  }

}
