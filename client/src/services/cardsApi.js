import axios from "axios";

class CardsApi {
  constructor() {
    this._apiUrl = "/api/cards";
  }

  getCards() {
    return axios.get(this._apiUrl);
  }

  createCard(data) {
    return axios.post(this._apiUrl, data);
  }

  updateCard(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteCard(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : "";
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        username,
      },
    });
  }
}

export default new CardsApi();
