import Axios from "axios";

import type { User, Todo, TodoWithTag } from ".";

export interface PomodoroInterval {
  id: string;
  todo?: Todo["id"];
  startDate: Date | string;
  endDate: Date | string;
  defaultDuration: number;
}

export interface IntervalWithTodo {
  id: string;
  todo?: TodoWithTag;
  startDate: Date | string;
  endDate: Date | string;
  defaultDuration: number;
}

export const addInterval = async (
  pomInterval: Partial<PomodoroInterval>,
  user?: User
): Promise<PomodoroInterval> => {
  const { data } = await Axios.post<PomodoroInterval>(
    "/api/pomodoros/",
    pomInterval,
    {
      headers: {
        Authorization: `JWT ${user?.token}`,
      },
    }
  );
  return data;
};

export const getIntervals = async (
  user?: User
): Promise<PomodoroInterval[]> => {
  const { data } = await Axios.get<PomodoroInterval[]>("/api/pomodoros/", {
    headers: {
      Authorization: `JWT ${user?.token}`,
    },
  });
  return data;
};

export const getInterval = async (
  id: PomodoroInterval["id"],
  user?: User
): Promise<PomodoroInterval> => {
  const { data } = await Axios.get<PomodoroInterval>(`/api/pomodoros/${id}/`, {
    headers: {
      Authorization: `JWT ${user?.token}`,
    },
  });
  return data;
};
