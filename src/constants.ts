export const CARDS_PER_SUIT = 13;
export const NUMBER_OF_SUITS = 4;

export const HAND_SIZE_LIMIT = 5;

export const LOCAL_STORAGE_KEY = "save_data";

export const ASCENDING_RANK_COMPARATOR = (rank1: number, rank2: number) => {
  // Handle aces.
  if (rank1 === 1 && rank2 !== 1) {
    return 1;
  } else if (rank1 !== 1 && rank2 === 1) {
    return -1;
  } else if (rank1 === 1 && rank2 === 1) {
    return 0;
  }

  // For non-aces, we can just compare normally.
  return rank1 - rank2;
};

export const DESCENDING_RANK_COMPARATOR = (rank1: number, rank2: number) => {
  return -ASCENDING_RANK_COMPARATOR(rank1, rank2);
};
