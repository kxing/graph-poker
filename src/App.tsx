import "./styles.css";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import styled from "styled-components";

import AddPlayerModal from "./components/AddPlayerModal";
import LoadModal from "./components/LoadModal";
import PlayerHand from "./components/PlayerHand";
import SaveModal from "./components/SaveModal";
import StatsModal from "./components/StatsModal";
import React, { useState } from "react";
import Game from "./models/game";

const TopRibbon = styled.div`
  margin-bottom: 10px;
`;

const Content = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Footer = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  display: inline;
  margin-right: 10px;
`;

export default function App() {
  const [gameJson, setGameJson] = useState<string>(new Game().toJson());
  const game = Game.fromJson(gameJson);

  const [statsModalOpen, setStatsModalOpen] = useState<boolean>(false);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [loadModalOpen, setLoadModalOpen] = useState<boolean>(false);
  const [addPlayerModalOpen, setAddPlayerModalOpen] = useState<boolean>(false);

  const handleAddPlayer = (name: string) => {
    game.addNewPlayer(name);
    setGameJson(game.toJson());
  };

  const handleDrawCardsForEachPlayer = (
    _e: React.MouseEvent<HTMLButtonElement>
  ) => {
    game.drawRandomCards();
    setGameJson(game.toJson());
  };

  const handleClearBoard = (_e: React.MouseEvent<HTMLButtonElement>) => {
    game.clearBoard();
    setGameJson(game.toJson());
  };

  const handleDrawExtraCardForPlayer = (playerIndex: number) => () => {
    game.getPlayers()[playerIndex].drawRandomCard();
    setGameJson(game.toJson());
  };

  const handleDiscardCardForPlayer = (playerIndex: number) => (id: number) => {
    game.getPlayers()[playerIndex].deleteCard(id);
    setGameJson(game.toJson());
  };

  const handleOpenStatsModal = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setStatsModalOpen(true);
  };

  const handleCloseStatsModal = () => {
    setStatsModalOpen(false);
  };

  const handleOpenSaveModal = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setSaveModalOpen(true);
  };

  const handleCloseSaveModal = () => {
    setSaveModalOpen(false);
  };

  const handleOpenLoadModal = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setLoadModalOpen(true);
  };

  const handleCloseLoadModal = () => {
    setLoadModalOpen(false);
  };

  const handleLoad = (gameData: string) => {
    setGameJson(gameData);
  };

  const handleOpenAddPlayerModal = (
    _e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAddPlayerModalOpen(true);
  };

  const handleCloseAddPlayerModal = () => {
    setAddPlayerModalOpen(false);
  };

  return (
    <div className="App">
      <h1>Graph Poker</h1>
      <TopRibbon>
        <ButtonWrapper>
          <Button
            variant="outlined"
            onClick={handleDrawCardsForEachPlayer}
            disabled={game.isAnyPlayerAtHandSizeLimit()}
          >
            Draw cards
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button variant="outlined" onClick={handleOpenStatsModal}>
            Score
          </Button>
        </ButtonWrapper>
        <StatsModal
          gameJson={gameJson}
          open={statsModalOpen}
          handleClose={handleCloseStatsModal}
        />
        <ButtonWrapper>
          <Button variant="outlined" onClick={handleOpenSaveModal}>
            Save
          </Button>
        </ButtonWrapper>
        <SaveModal
          gameJson={gameJson}
          open={saveModalOpen}
          handleClose={handleCloseSaveModal}
        />
        <ButtonWrapper>
          <Button variant="outlined" onClick={handleOpenLoadModal}>
            Load
          </Button>
        </ButtonWrapper>
        <LoadModal
          open={loadModalOpen}
          handleClose={handleCloseLoadModal}
          handleLoad={handleLoad}
        />
      </TopRibbon>
      <Content>
        {game.getPlayers().map((player, index) => {
          return (
            <PlayerHand
              playerJson={player.toJson()}
              key={index}
              handleDrawExtraCard={handleDrawExtraCardForPlayer(index)}
              handleDiscardCard={handleDiscardCardForPlayer(index)}
            />
          );
        })}
      </Content>
      <Divider />
      <Footer>
        <ButtonWrapper>
          <Button variant="outlined" onClick={handleOpenAddPlayerModal}>
            Add Player
          </Button>
        </ButtonWrapper>
        <AddPlayerModal
          open={addPlayerModalOpen}
          handleAddPlayer={handleAddPlayer}
          handleClose={handleCloseAddPlayerModal}
        />
        <ButtonWrapper>
          <Button
            variant="outlined"
            onClick={handleClearBoard}
            disabled={game.isEveryPlayerHandEmpty()}
          >
            Clear board
          </Button>
        </ButtonWrapper>
      </Footer>
    </div>
  );
}
