let config = {
    mode: "GPS",
    lat: 55.755825,
    lng: 37.617298,
    accuracy: 10
};

function applyMock(location) {
    if (!location) return;

    if (config.mode === "DISABLED") {
        location.setLatitude(0);
        location.setLongitude(0);
        location.setAccuracy(99999);
        return;
    }

    location.setLatitude(config.lat);
    location.setLongitude(config.lng);
    location.setAccuracy(config.accuracy);
    location.setProvider(config.mode === "GPS" ? "gps" : "network");

    if (config.mode === "GSM") {
        location.setAltitude(0);
        location.setSpeed(0);
        location.setBearing(0);
    }
}

Java.perform(function() {
    // Базовые перехватчики Location
    const Location = Java.use('android.location.Location');

    Location.getLatitude.implementation = function() {
        return config.lat;
    };

    Location.getLongitude.implementation = function() {
        return config.lng;
    };

    Location.getAccuracy.implementation = function() {
        return config.accuracy;
    };

    Location.getProvider.implementation = function() {
        return config.mode === "GPS" ? "gps" : "network";
    };

    // Перехват LocationManager с учетом перегрузок
    const LocationManager = Java.use('android.location.LocationManager');

    // Обрабатываем обе версии метода getLastKnownLocation
    LocationManager.getLastKnownLocation.overload('java.lang.String').implementation = function(provider) {
        const realLocation = this.getLastKnownLocation(provider);
        applyMock(realLocation);
        return realLocation;
    };

    LocationManager.getLastKnownLocation.overload('java.lang.String', 'android.location.LastLocationRequest').implementation = function(provider, request) {
        const realLocation = this.getLastKnownLocation(provider, request);
        applyMock(realLocation);
        return realLocation;
    };

    // Экспорт управления с правильным именем
    rpc.exports = {
        setcoordinates: function(lat, lng) {  // Изменено на setcoordinates
            config.lat = lat;
            config.lng = lng;
            send(`Координаты обновлены: ${lat}, ${lng}`);
            return "OK";
        },
        setmode: function(mode) {  // Новый метод для режима
            config.mode = mode;
            send(`Режим обновлен: ${mode}`);
            return "OK";
        },
        setaccuracy: function(accuracy) {  // Новый метод для точности
            config.accuracy = accuracy;
            send(`Точность обновлена: ${accuracy}`);
            return "OK";
        }
    };
});