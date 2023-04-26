import { CARDS_PER_SUIT, NUMBER_OF_SUITS } from "../constants";
import { Suit } from "./suit";

class Card {
  public readonly id: number;
  public readonly rank: number;
  public readonly suit: Suit;

  constructor(id: number) {
    this.id = id;
    this.rank = (id % CARDS_PER_SUIT) + 1;
    this.suit = Card.idToSuit(id);
  }

  private static idToSuit(id: number) {
    switch (Math.floor(id / CARDS_PER_SUIT)) {
      case 0:
        return Suit.Clubs;
      case 1:
        return Suit.Hearts;
      case 2:
        return Suit.Spades;
      case 3:
        return Suit.Diamonds;
      default:
        throw new Error(`Invalid id: ${id}`);
    }
  }

  public static random(): Card {
    const id = Math.floor(Math.random() * CARDS_PER_SUIT * NUMBER_OF_SUITS);
    return new Card(id);
  }
}

export const rankToString = (rank: number) => {
  switch (rank) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return rank;
  }
};

export default Card;
