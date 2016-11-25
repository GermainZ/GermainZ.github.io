window.onload = function() {
    ajax_get("data.json", display_data);
    document.getElementById("weather_location").onkeypress = function(event) {
        if (event.which == 13) {
            get_weather();
        }
    };
    get_weather();
}

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
                console.log(xmlhttp.responseText);
                var data = JSON.parse(xmlhttp.responseText);
            } catch (err) {
                console.log(err.message);
                return;
            }
            callback(data);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function display_data(data) {
    document.getElementById("quotes").innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var quote = document.createElement("blockquote");
        var author = document.createElement("cite");
        quote.appendChild(document.createTextNode(data[i].content));
        author.appendChild(document.createTextNode(data[i].author));
        quote.appendChild(author);
        document.getElementById("quotes").appendChild(quote);
    }
}

function display_weather(data) {
    if (data.query.count === 0) {
        alert("Couldn't find city!");
        document.getElementById("weather_condition").innerHTML = "☺";
        document.getElementById("weather_temperature").innerHTML = "☺";
        return;
    }
    var condition = data.query.results.channel.item.condition;
    document.getElementById("weather_condition").innerHTML = condition.text;
    document.getElementById("weather_temperature").innerHTML = condition.temp;
}

function get_weather() {
    var text = document.getElementById("weather_location").value;
    if (text) {
        var weather_query = "select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + text + "') and u='c'"
        var weather_url = "https://query.yahooapis.com/v1/public/yql?q=" + escape(weather_query) + "&format=json&env=store"
        document.getElementById("weather_condition").innerHTML = "…";
        document.getElementById("weather_temperature").innerHTML = "…";
        ajax_get(weather_url, display_weather);
    } else {
        document.getElementById("weather_condition").innerHTML = "☺";
        document.getElementById("weather_temperature").innerHTML = "☺";
    }
}
