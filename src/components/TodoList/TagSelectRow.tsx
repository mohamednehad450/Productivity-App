import { FC, useState } from "react";
import { useTodo } from ".";
import { Tag } from "../../API";

import { ReactComponent as Circle } from "../../icons/circle.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import NewTagOverlay from "./NewTagOverlay";

interface TagSelectRowProps {
  tag: Tag;
  onClick: () => void;
  isSelected: boolean;
}
const TagSelectRow: FC<TagSelectRowProps> = ({ tag, isSelected, onClick }) => {
  const [editTag, setEditTag] = useState(false);
  const { deleteTag, updateTag } = useTodo();
  return (
    <>
      {editTag && (
        <NewTagOverlay
          submit={(t) => updateTag(tag.id, t)}
          done={() => setEditTag(false)}
          initialTag={tag}
        />
      )}
      <span
        className={`${
          isSelected ? "select-item-selected" : ""
        } tag-select-container select-item`}
        onClick={onClick}
      >
        <button className={`tag-select-item iconbutton`}>
          <span className="icon">{<Circle fill={tag.color} />}</span>
          <span className="iconbutton-label">{tag.label}</span>
        </button>
        <span className="tag-select-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditTag(true);
            }}
            className="iconbutton icon icon-gray tag-select-action"
          >
            {<EditIcon />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTag(tag.id);
            }}
            className="iconbutton icon icon-gray tag-select-action"
          >
            {<DeleteIcon />}
          </button>
        </span>
      </span>
    </>
  );
};

export default TagSelectRow;
