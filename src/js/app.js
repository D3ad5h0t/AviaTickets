import api from "./services/apiServece";

api.countries().then((res) => console.log(res));
api.cities().then((res) => console.log(res));
