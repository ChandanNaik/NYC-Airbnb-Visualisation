const deckgl = new deck.DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pudzRtaWloMDAzcTN2bzN1aXdxZHB5bSJ9.2bkj3IiRC8wj3jLThvDGdA',
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  longitude: -73.98,
  latitude: 40.765,
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



var allData = d3.csv('../data/AB_NYC_2019.csv');
var bronx = d3.csv('../data/Bronx.csv');
var brooklyn = d3.csv('../data/Brooklyn.csv');
var manhattan = d3.csv('../data/Manhattan.csv');
var queens = d3.csv('../data/Queens.csv');
var statenIsland = d3.csv('../data/StatenIsland.csv');

var selectedRegion = "all"
filterData(allData, selectedRegion, 500)
renderLayer(allData);

//Handling both price and region
const areaDropDown = document.querySelector('.regions')
const priceSlider = document.querySelector('.price')

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
          console.log("Bronx")
          filterData(bronx, maxPrice);
          break;
        case "Brooklyn":
          filterData(brooklyn, maxPrice);
          break;
        case "Manhattan":
          filterData(manhattan, maxPrice);
          break;
        case "Queens":
          filterData(queens, maxPrice);
          break;
        case "Staten Island":
          filterData(statenIsland, maxPrice);
          break;
        default:
          filterData(allData, maxPrice);
      }
    }
     else {
      var region = document.getElementById("dropdown").value;
      var maxPrice = `${event.target.value}`;

      //TODO call filerData function
      console.log("change price : ", maxPrice, region)
    }
  }
});


function filterData(data, price) {

  renderLayer(data);

}

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
