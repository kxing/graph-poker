import Button from "@mui/material/Button";
import React from "react";
import styled from "styled-components";

import Player from "../models/player";
import Score from "../models/score";
import PlayingCard from "./PlayingCard";

const DrawCardButton = styled(Button)`
  margin-bottom: 10px;
`;

const CardsWrapper = styled.div`
  margin-top: 10px;
`;

interface PlayerHandProps {
  playerJson: string;
  handleDrawExtraCard: () => void;
  handleDiscardCard: (id: number) => void;
}

const PlayerHand = (props: PlayerHandProps) => {
  const player = Player.fromJson(props.playerJson);
  const cards = player.getCards();
  const score = Score.scoreHand(cards);

  const handleDrawCardButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    props.handleDrawExtraCard();
  };

  const handleDiscard = (id: number) => () => {
    props.handleDiscardCard(id);
  };

  return (
    <>
      <h2>{player.name}</h2>
      <h3>{score.description()}</h3>
      <DrawCardButton
        variant="outlined"
        onClick={handleDrawCardButtonClick}
        disabled={player.isAtHandSizeLimit()}
      >
        Draw Card
      </DrawCardButton>
      <CardsWrapper>
        {cards.map((card, index) => (
          <PlayingCard
            id={card.id}
            key={index}
            handleDiscard={handleDiscard(card.id)}
          />
        ))}
      </CardsWrapper>
    </>
  );
};

export default PlayerHand;
