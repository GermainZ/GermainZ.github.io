window.onload = function() {
    ajax_get("data.json", display_data);
    var weather_query = "select item.condition from weather.forecast where woeid=1962088 and u='c'"
    var weather_url = "https://query.yahooapis.com/v1/public/yql?q=" + escape(weather_query) + "&format=json&env=store"
    ajax_get(weather_url, display_weather);
}

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            try {
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
    var condition = data.query.results.channel.item.condition;
    document.getElementById("weather_condition").innerHTML = condition.text;
    document.getElementById("weather_temperature").innerHTML = condition.temp;
}
