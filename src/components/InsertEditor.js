import React, { useMemo, useState, useEffect, useRef } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import { editorStyle } from "../styles/tailwindStyles";

const InsertEditor = (props) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    props.emitter.on("*", (type, ops) => {
      if (props.id.current !== type) {
        props.remote.current = true;
        ops.forEach((op) => editor.apply(op));
        props.remote.current = false;
      }
    });
  }, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(value) => {
        setValue(value);
        props.setValue(value);

        const ops = editor.operations
          .filter((op) => {
            if (op) {
              return (
                op.type !== "set_selection" &&
                op.type !== "set_value" &&
                (!op.data || !op.data["source"])
              );
            }
            return false;
          })
          .map((op) => ({ ...op, data: { source: "one" } }));

        if (
          ops.length &&
          props.id &&
          (!props.remote || !props.remote.current)
        ) {
          props.emitter.emit(props.id.current, ops);
        }
      }}
    >
      <Editable autoFocus className={`${editorStyle}`} />
    </Slate>
  );
};

export default InsertEditor;
