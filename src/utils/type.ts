export enum Status {
  SOLD = "SOLD",
  UNSOLD = "UNSOLD",
  READY = "READY",
}

export type Tournament = {
  tournament_id: number;
  name: string;
  start_date: string;
  end_date: string;
};

export type Team = {
  team_id: number;
  tournament_id: number;
  name: string;
  points: number;
};

export type Player = {
  player_id: number;
  team_id: number;
  name: string;
  points: number;
  status: Status;
};

export type FormValues = {
  team?: string;
  points?: string;
};
