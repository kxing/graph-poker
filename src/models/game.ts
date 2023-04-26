import Player, { PlayerJsonObject } from "./player";

// JSON representation of everything in the game.
export interface GameJsonObject {
  players: PlayerJsonObject[];
}

class Game {
  private players: Player[];

  constructor() {
    this.players = [];
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public addNewPlayer(name: string) {
    this.players.push(new Player(name));
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public drawRandomCards() {
    this.players.forEach((player) => {
      player.drawRandomCard();
    });
  }

  public drawRandomCard(playerIndex: number) {
    this.players[playerIndex].drawRandomCard();
  }

  public clearBoard() {
    this.players.forEach((player) => {
      player.clearCards();
    });
  }

  public isAnyPlayerAtHandSizeLimit() {
    return this.players.some((player) => player.isAtHandSizeLimit());
  }

  public isEveryPlayerHandEmpty() {
    return this.players.every((player) => player.getCards().length === 0);
  }

  public toJsonObject(): GameJsonObject {
    return {
      players: this.players.map((player) => player.toJsonObject())
    };
  }

  public toJson(): string {
    const value: GameJsonObject = this.toJsonObject();
    return JSON.stringify(value);
  }

  public static fromJsonObject(jsonObject: GameJsonObject): Game {
    const game = new Game();
    jsonObject.players.forEach((playerJsonObject) => {
      const player = Player.fromJsonObject(playerJsonObject);
      game.addPlayer(player);
    });
    return game;
  }

  public static fromJson(json: string): Game {
    const value: GameJsonObject = JSON.parse(json);
    return Game.fromJsonObject(value);
  }
}

export default Game;
