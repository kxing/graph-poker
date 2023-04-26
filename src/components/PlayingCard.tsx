import Button from "@mui/material/Button";
import React from "react";
import styled from "styled-components";

import Card, { rankToString } from "../models/card";
import { Suit, suitToColor, suitToSymbol } from "../models/suit";

type SuitProps = {
  suit: Suit;
};

const ButtonWrapper = styled.div`
  display: inline;
  margin-right: 10px;
`;

const StyledCardContents = styled.div<SuitProps>`
  color: ${(props) => suitToColor(props.suit)};
`;

interface CardProps {
  id: number;
  handleDiscard: () => void;
}

const PlayingCard = (props: CardProps) => {
  const card = new Card(props.id);
  const suitSymbol = suitToSymbol(card.suit);

  const handleDiscardClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleDiscard();
  };

  return (
    <ButtonWrapper>
      <Button variant="outlined" onClick={handleDiscardClick}>
        <StyledCardContents suit={card.suit}>
          {rankToString(card.rank)}
          {suitSymbol}
        </StyledCardContents>
      </Button>
    </ButtonWrapper>
  );
};

export default PlayingCard;
