import CardsApi from "../services/cardsApi";

class CardList {
  constructor() {
    this._cardListEl = document.querySelector("#card-list");
    this._cards = [];

    this.getCards();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("work");
  }

  addEventListeners() {
    this._cardListEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const cardId = e.target.parentElement.parentElement.dataset.id;
        this.deleteCard(cardId);
      }
    });
  }

  async getCards() {
    try {
      const res = await CardsApi.getCards();
      this._cards = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCard(cardId) {
    try {
      // Delete from server
      const res = await CardsApi.deleteCard(cardId);
      this._cards.filter((card) => card._id !== cardId);
      this.getCards();
    } catch (error) {
      alert("You can not delete this resource");
    }
  }

  addCardToList(card) {
    this._cards.push(card);
    this.render();
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    let tagClass = "";
    if (this._validTags.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = "";
    }
    return tagClass;
  }

  render() {
    this._cardListEl.innerHTML = this._cards
      .map((card) => {
        const tagClass = this.getTagClass(card.tag);
        const deleteBtn =
          card.username === localStorage.getItem("username")
            ? `<button class="delete"><i class="fas fa-times"></i></button>`
            : "";
        return `
      <div class="card" data-id="${card._id}">
      ${deleteBtn}
      <h3>
        ${card.text}
      </h3>
      <p class="tag ${tagClass}">${card.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${card.date}</span> by
        <span class="author">${card.username}</span>
      </p>
    </div>
      `;
      })
      .join("");
    this.addEventListeners();
  }
}

export default CardList;
