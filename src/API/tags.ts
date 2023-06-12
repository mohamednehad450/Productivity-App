import Axios from "axios";
import { User } from "./auth";

export interface Tag {
  color: string;
  label: string;
  id: string | number;
}

export interface TagError {
  color?: string[];
  label?: string[];
  id?: string[];
  non_field_errors?: string[];
  notFound?: boolean;
}

export const createEmptyTag = (): Partial<Tag> => {
  return {
    label: "",
    color: "",
  };
};

export const getTages = async (user?: User): Promise<Tag[]> => {
  const { data } = await Axios.get<Tag[]>("/api/tags/", {
    headers: {
      Authorization: `JWT ${user?.token}`,
    },
  });
  return data;
};

export const updateTag = async (
  id: Tag["id"],
  tag: Partial<Tag>,
  user?: User
): Promise<Tag> => {
  const { data } = await Axios.patch<Tag>(`/api/tags/${id}/`, tag, {
    headers: {
      Authorization: `JWT ${user?.token}`,
    },
  });
  return data;
};

export const deleteTag = async (id: Tag["id"], user?: User): Promise<void> => {
  await Axios.delete<void>(`/api/tags/${id}/`, {
    headers: {
      Authorization: `JWT ${user?.token}`,
    },
  });
};

export const addNewTag = async (
  tag: Partial<Tag>,
  user?: User
): Promise<Tag> => {
  const { data } = await Axios.post<Tag>("/api/tags/", tag, {
    headers: {
      Authorization: `JWT ${user?.token}`,
    },
  });
  return data;
};
