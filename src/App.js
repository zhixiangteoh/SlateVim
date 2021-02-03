// Import React dependencies.
import React, { useMemo, useState, useCallback } from "react";
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text, Path } from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

// Custom components
import Header from "./components/Header";

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(initialValue);
  const [mode, setMode] = useState(INSERT_MODE);

  const [keyString, setKeyString] = useState("");
  const [clipboard, setClipboard] = useState("");

  const onModeButtonClick = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
      <Header mode={mode} paraStyle={paraStyle} />
      <div className="container rounded bg-gray-200 p-2 w-1/6 mx-auto text-base text-center m-4">
        <div className="flex space-x-4">
          <button
            className={`${btnStyle}`}
            value="normal"
            onClick={onModeButtonClick}
          >
            Normal
          </button>
          <button
            className={`${btnStyle}`}
            value="insert"
            onClick={onModeButtonClick}
          >
            Insert
          </button>
        </div>
      </div>
      <p className={`${paraStyle}`}>
        You are currently in{" "}
        <span className="text-red-500">{mode.toUpperCase()}</span> mode.
      </p>
      {mode === INSERT_MODE ? (
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            autoFocus
            className="box-border rounded h-80 w-1/3 mx-auto bg-black p-6 text-white overflow-y-auto"
          />
        </Slate>
      ) : (
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <Editable
            className="box-border rounded h-80 w-1/3 mx-auto bg-black p-6 text-white overflow-y-auto"
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "d") {
                if (keyString === "d") {
                  event.preventDefault();
                  // Move selection to start of line
                  Transforms.move(editor, { unit: "line", reverse: "true" });
                  const start = editor.selection.anchor;
                  console.log(start);
                  // Move cursor to end of line
                  Transforms.move(editor, { unit: "line" });
                  // const endOffset = Math.min(
                  //   editor.selection.anchor.offset,
                  //   LINE_MAX_CHAR
                  // );
                  // const end = {
                  //   path: editor.selection.anchor.path,
                  //   offset: endOffset,
                  // };
                  const end = editor.selection.anchor;
                  console.log(end);
                  // Select text from start of line to end of line
                  Transforms.select(editor, {
                    anchor: start,
                    focus: end,
                  });
                  document.execCommand("copy");
                  Transforms.delete(editor);
                  setKeyString("");
                  return false;
                }
                event.preventDefault();
                setKeyString("d");
              }
              if (event.key === "y") {
                if (keyString === "y") {
                  event.preventDefault();
                  // Move selection to start of line
                  Transforms.move(editor, { unit: "line", reverse: "true" });
                  const start = editor.selection.anchor;
                  console.log(start);
                  // Move cursor to end of line
                  Transforms.move(editor, { unit: "line" });
                  // const endOffset = Math.min(
                  //   editor.selection.anchor.offset,
                  //   LINE_MAX_CHAR
                  // );
                  // const end = {
                  //   path: editor.selection.anchor.path,
                  //   offset: endOffset,
                  // };
                  const end = editor.selection.anchor;
                  console.log(end);
                  // Select text from start of line to end of line
                  Transforms.select(editor, {
                    anchor: start,
                    focus: end,
                  });
                  document.execCommand("copy");
                  setKeyString("");
                  return false;
                }
                event.preventDefault();
                setKeyString("y");
              }
            }}
          />
          <p className={`${paraStyle}`}>
            Current registered half-command:{" "}
            {keyString ? (
              <kbd className="bg-gray-200 p-1 rounded">{keyString}</kbd>
            ) : null}
          </p>
        </Slate>
      )}
    </div>
  );
};

export default App;

const findLeaf = (node, selection, depth) => {
  // if ()
  const pathArr = selection.anchor.path;
  node.reduce((acc, curr) => {
    if (node.indexOf(curr) === pathArr[depth]) {
      acc = acc[pathArr[depth]];
      return findLeaf(acc, selection, depth++);
    }
  });
};

// Some Constants
const LINE_MAX_CHAR = 83;

// Vim Modes
const INSERT_MODE = "insert";
const NORMAL_MODE = "normal";

// Initial document value(s), [Node]
const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text:
          "In Insert Mode, you can edit plaintext, just as you would in Vim!",
      },
    ],
  },
];

const btnStyle =
  "flex-1 bg-gray-100 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded";

const paraStyle = "container w-5/12 mx-auto text-base text-center m-4";