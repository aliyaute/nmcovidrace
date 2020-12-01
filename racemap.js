// racemap
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpeWF1dGUiLCJhIjoiY2p5ZXp1b3ZyMDBpMTNjcjdnZ3dnbzJpYyJ9.UiTAUN2b8ASlVnMr_nmn3Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/aliyaute/cki69hdir10c319ob6e5naegy',
    zoom: 5.25,
    center: [-75.32, 42.88],
    maxZoom:12,
    minZoom:6,
    maxBounds: [[-109.048428, 31.332406], [-103.000468, 37.000482]]

});

map.on('load', function () {
    // This is the function that prints the layers' IDs to the console
    var layers = map.getStyle().layers;
    for (var i = 0; i < layers.length; i++) {
        console.log(layers[i].id);
    }    
    map.addLayer({
        'id': 'raceNM',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': 'data/updNMrace.geojson'
        },

        'paint': {
            'fill-color': [
                'match', ['get', 'County'],
                'Bernalillo', '#cf635d',
                'Chaves', '#543005',
                'Cibola', '#80cdc1',
                'Colfax', '#bf812d',
                'Colfax/Union', '#bf812d',
                'Curry', '#b3de69',
                'Dona Ana', '#fdae61',
                'Eddy', '#053061',
                'Grant', '#80b1d3',
                'Hidalgo', '#abd9e9',
                'Hidalgo County/Grant County', '#abd9e9',
                'Hidalgo/Grant', '#abd9e9',
                'Lea', '#984ea3',
                'Lincoln', '#f46d43',
                'Los Alamos', '#377eb8',
                'Los Alamos County', '#377eb8',
                'Luna', '#fec44f',
                'Mckinley', '#cc4c02',
                'McKinley', '#cc4c02',
                'Military Bases', '#41ab5d',
                'Mora/Guadalupe/San Miguel East', '#de77ae',
                'Otero', '#016c59',
                'Quay/DeBaca/Harding', '#ce1256',
                'Rio Arriba', '#4d004b',
                'Roosevelt', '#2166ac',
                'Roosevelt County/Curry County', '#2166ac',
                'Roosevelt/Curry', '#2166ac',
                'San Juan', '#fa9fb5',
                'San Miguel', '#762a83',
                'Sandoval', '#67001f',
                'Santa Fe', '#807dba',
                'Santa Fe County', '#807dba',
                'Sierra', '#bf812d',
                'Sierra/Catron', '#bf812d',
                'Socorro', '#d53e4f',
                'Taos', '#006d2c',
                'Torrance', '#1b7837',
                'Valencia', '#66c2a5',




                '#ffffff',
            ],
            "fill-outline-color": "#ffffff"

        //     ],
        //     'fill-outline-color': '#ffffff'
   
            // 'fill-opacity': [
            //     'step', ['get', 'Percent'],
            //     0.02, 0.6,
            //     0.05, 0.8,
            //     0.09, 0.9,
            //     0.9
            // ]       
         }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer


    map.addLayer({
        'id': 'raceNM_outline',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': 'data/updNMrace.geojson'
        },
        'paint': {
            'line-color': '#ffffff',
            'line-width': 0.5
        }
    }, 'landuse'); // Here's where we tell Mapbox where to slot this new layer
});

// Create the popup
map.on('click', 'raceNM', function (e) {
    var County = e.features[0].properties.County;
    var Area = e.features[0].properties.Area;
    var Number_of_Cases = e.features[0].properties.Number_of_Cases;
    var Total_Population = e.features[0].properties.Total_Population;
    var White = e.features[0].properties.White;
    var Black_AfricanAmerican = e.features[0].properties.Black_AfricanAmerican;
    var AIAN = e.features[0].properties.AIAN;
    var Asian = e.features[0].properties.Asian;

    Number_of_Cases = Number_of_Cases.toLocaleString();
    County = County.toUpperCase().bold();

    new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<h4>' + County + ' (' + Number_of_Cases + ' cases) </h4>'
            + '<p>' + 'Population: ' + Total_Population  + '</p>'
            + '<p>' + 'White: ' + White + '</p>'
            + '<p>' + 'Black/African American: ' + Black_AfricanAmerican + '</p>'
            + '<p>' + 'Hispanic:' + '</p>'
            + '<p>' + 'Native American: ' + AIAN + '</p>'
            + '<p>' + 'Asian: ' + Asian + '</p>')
        .addTo(map);
});
// Change the cursor to a pointer when the mouse is over the countiesNY layer.
map.on('mouseenter', 'raceNM', function () {
    map.getCanvas().style.cursor = 'pointer';
});
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'raceNM', function () {
    map.getCanvas().style.cursor = '';
});
