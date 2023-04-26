import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";

import Game from "../models/game";
import Score from "../models/score";
import Player from "../models/player";

interface StatsModalProps {
  gameJson: string;
  open: boolean;
  handleClose: () => void;
}

const StatsModal = (props: StatsModalProps) => {
  const handleClose = (_e: React.MouseEvent<HTMLButtonElement>) => {
    props.handleClose();
  };

  const game = Game.fromJson(props.gameJson);
  const players = game.getPlayers();
  const playersAndScores: [Player, Score][] = players.map((player) => {
    const score = Score.scoreHand(player.getCards());
    return [player, score];
  });
  const playersAndScoreComparator = (
    playerAndScore1: [Player, Score],
    playerAndScore2: [Player, Score]
  ) => {
    const [, score1] = playerAndScore1;
    const [, score2] = playerAndScore2;

    // We invert the sort order, so that we go from best hand to worst hand.
    return -Score.compare(score1, score2);
  };
  playersAndScores.sort(playersAndScoreComparator);

  const places = new Array(players.length);
  if (players.length > 0) {
    places[0] = 1;
  }
  for (let index = 1; index < playersAndScores.length; index += 1) {
    const [, score] = playersAndScores[index];
    const [, previousScore] = playersAndScores[index - 1];
    if (Score.compare(score, previousScore) === 0) {
      places[index] = places[index - 1];
    } else {
      places[index] = index + 1;
    }
  }

  const ary = (place: number): string => {
    switch (place) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle>Results</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Table size="small">
              <TableBody>
                {playersAndScores.map(([player, score], index) => {
                  const place = places[index];
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <b>{`${place}${ary(place)}`}</b>
                      </TableCell>
                      <TableCell>{`${
                        player.name
                      } with ${score.description()}`}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatsModal;
