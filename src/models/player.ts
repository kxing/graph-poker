import { HAND_SIZE_LIMIT } from "../constants";
import Card from "./card";

// JSON representation of the player.
export interface PlayerJsonObject {
  name: string;
  cards: number[];
}

class Player {
  public readonly name: string;
  private cards: Card[];

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public drawRandomCard() {
    this.cards.push(Card.random());
  }

  public addCard(id: number) {
    this.cards.push(new Card(id));
  }

  // Deletes one copy of the card from the hand, if it exists.
  public deleteCard(id: number) {
    const index = this.cards.findIndex((card) => card.id === id);
    if (index === -1) {
      return;
    }
    this.cards.splice(index, 1);
  }

  public clearCards() {
    this.cards = [];
  }

  public isAtHandSizeLimit() {
    return this.cards.length >= HAND_SIZE_LIMIT;
  }

  public toJsonObject(): PlayerJsonObject {
    return {
      name: this.name,
      cards: this.cards.map((card) => card.id)
    };
  }

  public toJson(): string {
    const value: PlayerJsonObject = this.toJsonObject();
    return JSON.stringify(value);
  }

  public static fromJsonObject(jsonObject: PlayerJsonObject): Player {
    const player = new Player(jsonObject.name);
    jsonObject.cards.forEach((id) => {
      player.addCard(id);
    });
    return player;
  }

  public static fromJson(json: string): Player {
    const value: PlayerJsonObject = JSON.parse(json);
    return Player.fromJsonObject(value);
  }
}

export default Player;
