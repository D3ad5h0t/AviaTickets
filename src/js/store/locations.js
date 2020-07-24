import api from "../services/apiServece";

class Locations {
    constructor(api) {
        this.api = api;
        this.countries = null;
        this.cities = null;
    }
    async init() {
        const response = await Promise.all([
            this.api.countries(),
            this.api.cities(),
        ]);

        const [countries, cities] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);

        return response;
    }

    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const countryName = this.getCountryNameByCode(city.counytryCode);
            const key = `${city.name},${countryName}`;
            acc[key] = city;

            return acc;
        }, {});
    }

    getCountryNameByCode(code) {
        return this.countries[code].name;
    }

    getCitiesByCountryCode(code) {
        return this.cities.filter((city) => city.country_code === code);
    }
}

const locations = new Locations(api);

export default locations;
