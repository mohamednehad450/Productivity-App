import React, { FC, useState } from "react";
import { SliderPicker } from "react-color";
import { createEmptyTag } from "../../API";

import {
  Overlay,
  Button,
  ButtonsRow,
  TextInput,
  ColorTag,
  ErrorList,
} from "../common";

import type { Tag, TagError } from "../../API";

interface NewTagOverlayProps {
  done: () => void;
  submit: (tag: Partial<Tag>) => Promise<void>;
  initialTag?: Partial<Tag>;
}

const NewTagOverlay: FC<NewTagOverlayProps> = ({
  submit,
  initialTag,
  done,
}) => {
  const [tag, setTag] = useState<Partial<Tag>>(initialTag || createEmptyTag());
  const [err, setErr] = useState<TagError>({});

  return (
    <Overlay>
      <div className="overlay-container">
        <div className="input-row padding-top-3">
          <ColorTag tag={tag} />
          <TextInput
            placeholder="Tag Name"
            onChange={(label) => setTag({ ...tag, label })}
            value={tag.label}
            errors={[...(err.label || []), ...(err.non_field_errors || [])]}
          />
        </div>
        <div className="grow"></div>
        <SliderPicker
          className="padding"
          color={tag.color}
          onChange={(color) => setTag({ ...tag, color: color.hex })}
        />
        <ErrorList errors={err.color} />
        <div className="grow"></div>
        <ButtonsRow>
          <Button type="secondary" onClick={done}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() =>
              submit(tag)
                .then(done)
                .catch((err) => setErr(err))
            }
          >
            {initialTag ? "Save" : "Add"}
          </Button>
        </ButtonsRow>
      </div>
    </Overlay>
  );
};

export default NewTagOverlay;
