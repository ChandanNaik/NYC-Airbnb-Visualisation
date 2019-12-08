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

  //Old
  // longitude: -1.4157,
  // latitude: 52.2324,
  // zoom: 6,
  // minZoom: 5,
  // maxZoom: 15,
});


//
// var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');
//
// function switchLayer(layer) {
// var layerId = layer.target.id;
// deckgl.setStyle('mapbox://styles/mapbox/' + layerId);
// }
//
// for (var i = 0; i < inputs.length; i++) {
// inputs[i].onclick = switchLayer;
// }

const data = d3.csv('../data/AB_NYC_2019.csv');

const regions = ['radius', 'coverage', 'upperPercentile'];

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

// OPTIONS.forEach(key => {
//   document.getElementById(key).oninput = renderLayer;
// });
//
// var layerList = document.getElementById('menu');
// var inputs = layerList.getElementsByTagName('input');
//
// function switchLayer(layer) {
// var layerId = layer.target.id;
// map.setStyle('mapbox://styles/mapbox/' + layerId);
// }
//
// for (var i = 0; i < inputs.length; i++) {
// inputs[i].onclick = switchLayer;
// }

renderLayer();

function renderLayer() {
  // const options = {};
  // OPTIONS.forEach(key => {
  //   const value = +document.getElementById(key).value;
  //   document.getElementById(key + '-value').innerHTML = value;
  //   options[key] = value;
  //  });

  const hexagonLayer = new deck.ScreenGridLayer({
    id: 'grid',
    colorRange: COLOR_RANGE,
    data,
    elevationRange: [0, 100000],
    elevationScale: 250,
    extruded: false,
    getPosition: d => [Number(d.longitude), Number(d.latitude)],
    opacity: 0.5,
    cellSizePixels: 4
  });

  // const hexagonLayer = new deck.HexagonLayer({
  //   id: 'heatmap',
  //   colorRange: COLOR_RANGE,
  //   data,
  //   elevationRange: [0, 1000],
  //   elevationScale: 250,
  //   extruded: true,
  //   getPosition: d => [Number(d.longitude), Number(d.latitude)],
  //   opacity: 1,
  //   pickable: true,
  //   autoHighlight: true,
  //   // onHover:
  //     ...options
  // });

  deckgl.setProps({
    layers: [hexagonLayer]
  });
}
