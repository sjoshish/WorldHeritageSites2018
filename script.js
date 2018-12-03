// check https://leaflet-extras.github.io/leaflet-providers/preview/ for free basemap layers

var map = L.map("map", { center: [0,0],  zoom: 1.5});

///////////////
// BASEMAPS //
///////////////
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  maxZoom: 18
});
    
var Stamen_TonerLite = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});

var OpenMapSurfer_Roads = L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
	maxZoom: 20,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//MarkerClusterGroup that collects all GeoJSON objects
var group_natural = new L.markerClusterGroup();
var group_cultural = new L.markerClusterGroup();
var group_mixed = new L.markerClusterGroup();


///////////
//styles//
//////////
/*
// For Natural
var geojsonMarkerOptions = {
  radius: 5,
  fillColor: "#006400",
  color: "#ffffff",
  weight: 1,
  opacity: 1,
  fillOpacity: 1
};

//for cultural
var geojsonMarkerOptions1 = {
  radius: 5,
  fillColor: "#6c4100",
  color: "#ffffff",
  weight: 1,
  opacity: 1,
  fillOpacity: 1
};

//for mixed
var geojsonMarkerOptions2 = {
  radius: 5,
  fillColor: "#FF69B4",
  color: "#ffffff",
  weight: 1,
  opacity: 1,
  fillOpacity: 1
};
*/


var query = "https://sjoshish.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM whc_sites_2018 WHERE category = 'Natural'  ";
console.log("Query: " + query);

$.getJSON(query, function(cartodbdata) {
  
  var natural= L.geoJson(cartodbdata, {
    // add popup with info to each geosjon feature
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.name_en + "</h3>"  +"ID: " + feature.properties.id_no + "<br>" +"Country: " + feature.properties.states_name_en +"<br>" +"Year Entered: " + feature.properties.date_inscribed +"<br>" + feature.properties.short_description_en);
    },
    //style the point marker
    pointToLayer: function(feature, latlng) 
     {
      var marker;
      if (feature.properties.category == "Natural") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/ph142j0rc1r4fkl/green.png"
          })
        });
      }
      return marker;
    }
     // return L.circleMarker(latlng, geojsonMarkerOptions);
  }).addTo(group_natural);

});

var query = "https://sjoshish.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM whc_sites_2018 WHERE category = 'Cultural'  ";
console.log("Query: " + query);

$.getJSON(query, function(cartodbdata) {
  
  var cultural = L.geoJson(cartodbdata, {
    // add popup with info to each geosjon feature
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>" + feature.properties.name_en + "</h3>"  +"ID: " + feature.properties.id_no + "<br>" +"Country: " + feature.properties.states_name_en +"<br>" +"Year Entered: " + feature.properties.date_inscribed +"<br>" + feature.properties.short_description_en);
    },
    //style the point marker
    pointToLayer: function(feature, latlng){
      var marker;
      if (feature.properties.category == "Cultural") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
               "https://dl.dropboxusercontent.com/s/dciub6u40trc7ov/redd.png"
          })
        });
      }
      return marker;
    }
  }).addTo(group_cultural);

  //map.fitBounds(group.getBounds()); // zooms to fit data
});

var query = "https://sjoshish.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM whc_sites_2018 WHERE category = 'Mixed'  ";
console.log("Query: " + query);

$.getJSON(query, function(cartodbdata) {
  
  var mixed = L.geoJson(cartodbdata, {
    // add popup with info to each geosjon feature
    onEachFeature: function(feature, layer) {
     layer.bindPopup("<h3>" + feature.properties.name_en + "</h3>"  +"ID: " + feature.properties.id_no + "<br>" +"Country: " + feature.properties.states_name_en +"<br>" +"Year Entered: " + feature.properties.date_inscribed +"<br>" + feature.properties.short_description_en);
    },
    //style the point marker
    pointToLayer: function(feature, latlng) {
      var marker;
      if (feature.properties.category == "Mixed") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
               "https://dl.dropboxusercontent.com/s/onwmvtybg2rfp6r/black.png"
          })
        });
      }
      return marker;
    }
  }).addTo(group_mixed);

  //map.fitBounds(group.getBounds()); // zooms to fit data
});


//MarkerClusterGroup that collects all GeoJSON objects
//-----------------------------------------------
// FETCHING GEOJSON DATA FROM CARTODB
// CALL THE CARTODB SQL API HERE IN URL FORMAT
//-----------------------------------------------
var group = new L.markerClusterGroup();
//styles
var geojsonMarkerOptions_search = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5
};

// add a marker in the given location
var MyIcon = L.Icon.extend({
  options: {
    iconSize: [30,30],
  }
});



var querystem =
  "https://sjoshish.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM whc_sites_2018 WHERE states_name_en ='";
var search = " "; // can be gun, knife, blun_instrument, other
var query = querystem + search + "'";
//		    var query = "http://pfoser.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM nyc_homicides";
console.log("Initial query: " + query);

//running the query
$.getJSON(query, function(data) {
  geojsonlayer = L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      // add popup with info
      layer.bindPopup("<h3>" + feature.properties.name_en + "</h3>"  +"ID: " + feature.properties.id_no + "<br>" +"Country: " + feature.properties.states_name_en +"<br>" +"Year Entered: " + feature.properties.date_inscribed +"<br>" + feature.properties.short_description_en);
    },
    pointToLayer: function(feature, latlng) {
    var marker;
      if (feature.properties.category == "Natural") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/ph142j0rc1r4fkl/green.png"
          })
        });
      } else if (feature.properties.category == "Cultural") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/dciub6u40trc7ov/redd.png"
          })
        });
      } else if (feature.properties.category == "Mixed") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/onwmvtybg2rfp6r/black.png"
          })
        });
      } else marker = L.circleMarker(latlng, geojsonMarkerOptions);
      return marker;
    }
  }).addTo(group);
 // map.fitBounds(group.getBounds()); // zooms to fit data
});

//-----------------------------------------------
// CONTROL FOR TEXT FIELD TO ENTER SEARCH TERM
//-----------------------------------------------
var myControl = L.Control.extend({
  options: {
    position: "bottomleft"
  },
  onAdd: function() {
    this._div = L.DomUtil.create("div", "myControlLabel");
    this._div.innerHTML =
      '<h1 id="title">Search term</h1>' +
      '<input type="text" id="myTextField" value="type any name." />' +
      '<input type="submit" id="searchBtn" value="Search" onclick="change()"/>';
    L.DomEvent.disableClickPropagation(this._div);
    return this._div;
  }
});

map.addControl(new myControl());

// make return work as button click
var textfield = document.getElementById("myTextField");
textfield.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("searchBtn").click();
  }
});

//-----------------------------------------------
// FUNCTIONS FOR HANDLING SEARCH FIELD
//-----------------------------------------------

// button functionality - get value from textfield and change layer
function change() {
  search = document.getElementById("myTextField").value;
  if (search.length == 0) {
    alert("Nothing to search for...");
    return;
  }
  // updating the layer means deleting the old one and
  // adding a new one
  group.removeLayer(geojsonlayer);

  query = querystem + search + "'";
  console.log("Changed query: " + query);

  $.getJSON(query, function(data) {
    geojsonlayer = L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        // ADD A POPUP WITH SOME INFO
        layer.bindPopup("<h3>" + feature.properties.name_en + "</h3>"  +"ID: " + feature.properties.id_no + "<br>" +"Country: " + feature.properties.states_name_en +"<br>" +"Year Entered: " + feature.properties.date_inscribed +"<br>" + feature.properties.short_description_en);
    },
      pointToLayer: function(feature, latlng) {
    var marker;
      if (feature.properties.category == "Natural") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/ph142j0rc1r4fkl/green.png"
          })
        });
      } else if (feature.properties.category == "Cultural") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/dciub6u40trc7ov/redd.png"
          })
        });
      } else if (feature.properties.category == "Mixed") {
        marker = L.marker(latlng, {
          icon: new MyIcon({
            iconUrl:
              "https://dl.dropboxusercontent.com/s/onwmvtybg2rfp6r/black.png"
          })
        });
      } else marker = L.circleMarker(latlng, geojsonMarkerOptions);
      return marker;
    }
    }).addTo(group);
  });

  var title = document.getElementById("title");
  title.innerHTML = search;
}


/*
//Co
//MarkerClusterGroup that collects all GeoJSON objects
var group_dropdown = new L.markerClusterGroup();
//styles
var geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.5
};

//-----------------------------------------------
// FETCHING GEOJSON DATA FROM CARTODB
// CALL THE CARTODB SQL API HERE IN URL FORMAT
//-----------------------------------------------

// constructing the query
var querystem =
  "https://sjoshish.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM whc_sites_2018";
var query = querystem;

console.log("Initial query: " + query);
//running the query
$.getJSON(query, function(data) {
  geojsonlayer = L.geoJson(data, {
    onEachFeature: function(feature, layer) {
      // add popup with info
      layer.bindPopup("<h2>" + feature.properties.states_name_en + "</p>");
    }
  }).addTo(group_dropdown);
 // map.fitBounds(group.getBounds()); // zooms to fit data
});

//-----------------------------------------------
// CONTROL FOR DROPDOWN
//-----------------------------------------------
var myControl = L.Control.extend({
  options: {
    position: "topright"
  },
  onAdd: function(map) {
    this._div = L.DomUtil.create("div", "myControl");
    this._div.innerHTML =
      '<h1 id="title">Continent</h1>' +
      '<select id="selector">' +
      '<option value="init"></option>' +
      '<option value="layer1">Asia</option>' +
      '<option value = "layer2">Arab States</option>' +
      '<option value = "layer3">Europe and North America</option>' +
      '<option value = "layer4">Africa</option>' +
      '<option value = "layer5">Latin America and the Caribbean</option>' +
      "</select>";
    L.DomEvent.disableClickPropagation(this._div);
    return this._div;
  }
});
map.addControl(new myControl());

var layer_select = L.DomUtil.get("selector");
//prevent clicks on the selector from propagating through to the map
//(otherwise popups will close immediately after opening)
L.DomEvent.addListener(layer_select, "click", function(e) {
  L.DomEvent.stopPropagation(e);
});
L.DomEvent.addListener(layer_select, "change", change);

//-----------------------------------------------
// FUNCTIONS FOR HANDLING DROPDOWN UPDATES
//-----------------------------------------------

// button functionality - get value from textfield and change layer
function change(e) {
  // updating the layer means deleting the old one and
  // adding a new one
  //debugger;
  group_dropdown.removeLayer(geojsonlayer);

  if (e.target.value == "layer1") {
    query = querystem + " WHERE region_en = 'Asia and the Pacific'";
  } else if (e.target.value == "layer2") {
    query = querystem + " WHERE region_en = 'Arab States'";
  }else if (e.target.value == "layer3") {
    query = querystem + " WHERE region_en = 'Europe and North America'";
  }else if (e.target.value == "layer4") {
    query = querystem + " WHERE region_en = 'Africa'";
  }else if (e.target.value == "layer5") {
    query = querystem + " WHERE region_en = 'Latin America and the Caribbean'";
  }
 
  console.log("Changed query: " + query);

  $.getJSON(query, function(data) {
    geojsonlayer = L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        // ADD A POPUP WITH SOME INFO
        layer.bindPopup("<h2>" + feature.properties.states_name_en + "</p>");
      }
    }).addTo(group_dropdown);
  });
  //map.fitBounds(group.getBounds()); // zooms to fit data
}

// Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
function controlEnter(e) {
  map.dragging.disable();
}

function controlLeave() {
  map.dragging.enable();
}
//Quick application to all input tags
var inputTags = document.getElementsByTagName("input");
for (var i = 0; i < inputTags.length; i++) {
  inputTags[i].onmouseover = controlEnter;
  inputTags[i].onmouseout = controlLeave;
}
*/




var basemaps = {

  WorldImagery: Esri_WorldImagery,
  Stamen:  Stamen_TonerLite,
  CartoDB_Positron : CartoDB_Positron,
  OpenMapSurfer: OpenMapSurfer_Roads 
};

var overlay = {
  Natural: group_natural,
  Cutural: group_cultural,
  Mixed: group_mixed, 
 // Continent: group_dropdown,
  Search: group
};
L.control.layers(basemaps,overlay).addTo(map);


var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        categories = ["Natural", "Cultural", "Mixed"],
        labels = ["https://dl.dropboxusercontent.com/s/ph142j0rc1r4fkl/green.png",          
		  "https://dl.dropboxusercontent.com/s/dciub6u40trc7ov/redd.png",
  "https://dl.dropboxusercontent.com/s/onwmvtybg2rfp6r/black.png"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            categories[i] + (" <img src="+ labels[i] +"height='25' width='25'>") +'<br>';
    }return div;
};
legend.addTo(map);


