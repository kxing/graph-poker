export enum Suit {
  Clubs = "clubs",
  Hearts = "hearts",
  Spades = "spades",
  Diamonds = "diamonds"
}

export const suitToSymbol = (suit: Suit): string => {
  switch (suit) {
    case Suit.Clubs:
      return "♣";
    case Suit.Hearts:
      return "♥";
    case Suit.Spades:
      return "♠";
    case Suit.Diamonds:
      return "♦";
    default:
      throw new Error(`Invalid suit: ${suit}`);
  }
};

export const suitToColor = (suit: Suit): string => {
  switch (suit) {
    case Suit.Clubs:
    case Suit.Spades:
      return "black";
    case Suit.Hearts:
    case Suit.Diamonds:
      return "red";
    default:
      throw new Error(`Invalid suit: ${suit}`);
  }
};
