import {
  ASCENDING_RANK_COMPARATOR,
  DESCENDING_RANK_COMPARATOR
} from "../constants";
import Card, { rankToString } from "./card";

// Taken from: https://en.wikipedia.org/wiki/List_of_poker_hands
export enum HandType {
  FiveOfAKind = "five_of_a_kind",
  StraightFlush = "straight_flush",
  FourOfAKind = "four_of_a_kind",
  FullHouse = "full_house",
  Flush = "flush",
  Straight = "straight",
  ThreeOfAKind = "three_of_a_kind",
  TwoPair = "two_pair",
  OnePair = "one_pair",
  HighCard = "high_card"
}

class Score {
  public readonly handType: HandType;
  private tiebreakers: number[];

  constructor(handType: HandType, tiebreakers: number[]) {
    this.handType = handType;
    this.tiebreakers = tiebreakers;

    switch (handType) {
      case HandType.FiveOfAKind:
        if (tiebreakers.length !== 1) {
          throw new Error(`Expected five of [number]`);
        }
        break;
      case HandType.StraightFlush:
        if (tiebreakers.length !== 1) {
          throw new Error(`Expected straight flush with [number] high`);
        }
        break;
      case HandType.FourOfAKind:
        if (tiebreakers.length < 1) {
          throw new Error(`Expected four of a kind of [number]`);
        }
        break;
      case HandType.FullHouse:
        if (tiebreakers.length !== 2) {
          throw new Error(`Expected a full house of [number] over [number]`);
        }
        break;
      case HandType.Flush:
        if (tiebreakers.length !== 5) {
          throw new Error(
            `Expected a flush of [number], [number], [number], [number], and [number]`
          );
        }
        break;
      case HandType.Straight:
        if (tiebreakers.length !== 1) {
          throw new Error(`Expected a straight with [number] high`);
        }
        break;
      case HandType.ThreeOfAKind:
        if (tiebreakers.length < 1) {
          throw new Error(`Expected a three of a kind of [number]`);
        }
        break;
      case HandType.TwoPair:
        if (tiebreakers.length < 2) {
          throw new Error(`Expected two pair of [number] and [number]`);
        }
        break;
      case HandType.OnePair:
        if (tiebreakers.length < 1) {
          throw new Error(`Expected one pair of [number]`);
        }
        break;
      case HandType.HighCard:
        break;
      default:
        throw new Error(`Invalid hand type: ${handType}`);
    }
  }

  public description() {
    switch (this.handType) {
      case HandType.FiveOfAKind:
        return `Five of a kind of ${rankToString(this.tiebreakers[0])}`;
      case HandType.StraightFlush:
        return `Straight flush with ${rankToString(this.tiebreakers[0])} high`;
      case HandType.FourOfAKind:
        return `Four of a kind of ${rankToString(this.tiebreakers[0])}`;
      case HandType.FullHouse:
        return `Full house of ${rankToString(
          this.tiebreakers[0]
        )} over ${rankToString(this.tiebreakers[1])}`;
      case HandType.Flush:
        return `Flush (${rankToString(this.tiebreakers[0])} high)`;
      case HandType.Straight:
        return `Straight with ${rankToString(this.tiebreakers[0])} high`;
      case HandType.ThreeOfAKind:
        return `Three of a kind of ${rankToString(this.tiebreakers[0])}`;
      case HandType.TwoPair:
        return `Two pair of ${rankToString(
          this.tiebreakers[0]
        )} and ${rankToString(this.tiebreakers[1])}`;
      case HandType.OnePair:
        return `One pair of ${rankToString(this.tiebreakers[0])}`;
      case HandType.HighCard:
        let highCardDescription = "";
        if (this.tiebreakers.length > 0) {
          highCardDescription = ` (${rankToString(this.tiebreakers[0])} high)`;
        }
        return `Nothing${highCardDescription}`;
      default:
        throw new Error(`Invalid hand type: ${this.handType}`);
    }
  }

  private static isFlush(cards: Card[]): boolean {
    if (cards.length !== 5) {
      // Need five cards for a flush.
      return false;
    }
    const suits = new Set(cards.map((card) => card.suit));
    return suits.size === 1;
  }

  // Returns the high card of the straight, if it is one, or
  // null if it isn't a straight.
  private static checkStraight(cards: Card[]): number | null {
    const ranks = cards.map((card) => card.rank);
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== 5) {
      // Not a straight if we:
      // - have a pair (or more)
      // - have fewer than 5 cards
      return null;
    }

    const minRank = Math.min(...ranks);
    const maxRank = Math.max(...ranks);
    if (minRank + 4 === maxRank) {
      // We have a straight if we have 5 unique ranks from
      // minRank to maxRank.
      return maxRank;
    }
    // Handle the case when we have a straight from 10 to ace.
    ranks.sort(ASCENDING_RANK_COMPARATOR);
    if (JSON.stringify(ranks) === JSON.stringify([10, 11, 12, 13, 1])) {
      // Ace high.
      return 1;
    }
    return null;
  }

  public static scoreHand(cards: Card[]): Score {
    const ranks = cards.map((card) => card.rank);
    const countsByRank = new Map<number, number>();
    ranks.forEach((rank) => {
      if (!countsByRank.has(rank)) {
        countsByRank.set(rank, 0);
      }
      countsByRank.set(rank, countsByRank.get(rank)! + 1);
    });
    const ranksByCount = new Map<number, number[]>();
    countsByRank.forEach((count, rank) => {
      if (!ranksByCount.has(count)) {
        ranksByCount.set(count, []);
      }
      ranksByCount.get(count)!.push(rank);
    });
    const isFlush = Score.isFlush(cards);
    const checkStraightResult: number | null = Score.checkStraight(cards);
    const isStraight = checkStraightResult != null;

    const sortedRanks = [...ranks];
    sortedRanks.sort(DESCENDING_RANK_COMPARATOR);

    const sortedPairs = [...(ranksByCount.get(2) || [])];
    sortedPairs.sort(DESCENDING_RANK_COMPARATOR);

    const sortedSingletons = [...(ranksByCount.get(1) || [])];
    sortedSingletons.sort(DESCENDING_RANK_COMPARATOR);

    if (ranksByCount.has(5)) {
      // Five of a kind.
      return new Score(HandType.FiveOfAKind, [ranksByCount.get(5)![0]]);
    }
    if (isFlush && isStraight) {
      // Straight flush.
      return new Score(HandType.StraightFlush, [checkStraightResult]);
    }
    if (ranksByCount.has(4)) {
      // Four of a kind.
      return new Score(HandType.FourOfAKind, [
        ranksByCount.get(4)![0],
        ...sortedSingletons
      ]);
    }
    if (ranksByCount.has(3) && ranksByCount.has(2)) {
      // Full house.
      return new Score(HandType.FullHouse, [
        ranksByCount.get(3)![0],
        ...sortedPairs
      ]);
    }
    if (isFlush) {
      // Flush.
      return new Score(HandType.Flush, sortedRanks);
    }
    if (isStraight) {
      // Straight.
      return new Score(HandType.Straight, [checkStraightResult]);
    }
    if (ranksByCount.has(3)) {
      // Three of a kind.
      return new Score(HandType.ThreeOfAKind, [
        ranksByCount.get(3)![0],
        ...sortedSingletons
      ]);
    }
    if (ranksByCount.has(2) && sortedPairs.length === 2) {
      // Two pair.
      return new Score(HandType.TwoPair, [...sortedPairs, ...sortedSingletons]);
    }
    if (ranksByCount.has(2) && sortedPairs.length === 1) {
      // One pair.
      return new Score(HandType.OnePair, [...sortedPairs, ...sortedSingletons]);
    }
    return new Score(HandType.HighCard, sortedRanks);
  }

  private static handTypeToValue(handType: HandType): number {
    switch (handType) {
      case HandType.FiveOfAKind:
        return 9;
      case HandType.StraightFlush:
        return 8;
      case HandType.FourOfAKind:
        return 7;
      case HandType.FullHouse:
        return 6;
      case HandType.Flush:
        return 5;
      case HandType.Straight:
        return 4;
      case HandType.ThreeOfAKind:
        return 3;
      case HandType.TwoPair:
        return 2;
      case HandType.OnePair:
        return 1;
      case HandType.HighCard:
        return 0;
      default:
        throw new Error(`Invalid hand type: ${handType}`);
    }
  }

  public static compare(score1: Score, score2: Score): number {
    const handType1Value = Score.handTypeToValue(score1.handType);
    const handType2Value = Score.handTypeToValue(score2.handType);

    if (handType1Value !== handType2Value) {
      return handType1Value - handType2Value;
    }
    for (let index = 0; index < score1.tiebreakers.length; index += 1) {
      const tiebreaker1 = score1.tiebreakers[index];
      const tiebreaker2 = score2.tiebreakers[index];

      if (tiebreaker1 !== tiebreaker2) {
        return ASCENDING_RANK_COMPARATOR(tiebreaker1, tiebreaker2);
      }
    }
    return 0;
  }
}

export default Score;
