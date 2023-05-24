import CardsApi from "../services/cardsApi";
import CardList from "./CardList";

class CardForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal");
    this._cardList = new CardList();
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    if (
      !this._form.elements.text.value ||
      !this._form.elements.tag.value ||
      !this._form.elements.username.value
    ) {
      alert("Please enter all fields");
      return;
    }

    // save user to local storage
    localStorage.setItem("username", this._form.elements.username.value);

    const card = {
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
      username: this._form.elements.username.value,
    };

    // add card to database
    const newCard = await CardsApi.createCard(card);

    //add card to list
    this._cardList.addCardToList(newCard.data.data);

    // Clear fields
    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    this.render();

    document.dispatchEvent(new Event("closemodal"));
  }

  render() {
    this._formModal.innerHTML = `
    <form id="card-form">
    <div class="form-control">
      <label for="card-text">Enter a Username</label>
      <input type="text" name="username" id="username" value="${
        localStorage.getItem("username") ? localStorage.getItem("username") : ""
      }" />
    </div>
    <div class="form-control">
      <label for="card-text">Enter Notes</label>
      <textarea name="text" id="card-text"></textarea>
    </div>
    <div class="form-control">
      <label for="tag">Tag</label>
      <input type="text" name="tag" id="tag" />
    </div>
    <button class="btn" type="submit" id="submit">Submit</button>
  </form>
    `;
    this._form = document.querySelector("#card-form");
    this.addEventListeners();
  }
}

export default CardForm;
