import { FC, useEffect, useState } from "react";
import { SliderPicker } from "react-color";
import { Overlay, Button, ButtonsRow, TextInput, ColorTag } from "../common";
import { v4 } from "uuid";

import type { Tag } from "./hooks";

interface NewTagOverlayProps {
  close: () => void;
  submit: (tag: Tag) => void;
  initialTag?: Tag;
}

const NewTagOverlay: FC<NewTagOverlayProps> = ({
  submit,
  initialTag,
  close,
}) => {
  const [tag, setTag] = useState<Tag>(
    initialTag || { id: v4(), color: "#ffffff", label: "" }
  );
  const [err, setErr] = useState<string>();

  useEffect(() => {
    if (tag.label && err) {
      setErr(undefined);
    }
  }, [tag.label]);

  return (
    <Overlay>
      <div className="overlay-container">
        <div className="input-row padding-top-3">
          <ColorTag tag={tag} />
          <TextInput
            placeholder="Tag Name"
            onChange={(label) => setTag({ ...tag, label })}
            value={tag.label}
            errors={err ? [err] : []}
          />
        </div>
        <div className="grow"></div>
        <SliderPicker
          className="padding"
          color={tag.color}
          onChange={(color) => setTag({ ...tag, color: color.hex })}
        />
        <div className="grow"></div>
        <ButtonsRow>
          <Button type="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (!tag.label) {
                setErr("Must provide title");
                return;
              }
              if (tag.label.length > 150) {
                setErr("Tag label cannot be more then 150 character");
                return;
              }
              submit(tag);
              close();
            }}
          >
            {initialTag ? "Save" : "Add"}
          </Button>
        </ButtonsRow>
      </div>
    </Overlay>
  );
};

export default NewTagOverlay;
