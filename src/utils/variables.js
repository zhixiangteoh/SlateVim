// Some Constants
export const LINE_MAX_CHAR = 83;
export const INDENT_LITERAL = "    ";
export const PLACEHOLDER =
  "Type some text in Insert Mode and use Vim commands in Normal Mode...";

// Vim Modes
export const INSERT_MODE = "insert";
export const NORMAL_MODE = "normal";

// Initial document value(s), [Node]
export const INITIAL_VALUE = [
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

export const SITE_URL = "http://localhost:3000";
