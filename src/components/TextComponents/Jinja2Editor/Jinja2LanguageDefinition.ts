export default function defineMonacoJinja2Language(monaco) {
  monaco.languages.register({
    id: "jinja",
    extensions: [".jinja", ".jinja2"],
    aliases: ["Jinja", "jinja", "jinja2"],
    mimetypes: ["text/jinja", "text/jinja2"],
  });

  monaco.languages.setMonarchTokensProvider("jinja", {
    wordPattern: /(-?\d*\.\d\w*)|([^`~!@$^&*()=+[{]}\\|;:'",.<>\/\s]+)/g,
    comments: {
      blockComment: ["{#", "#}"],
    },
    autoClosingPairs: [
      { open: "{# ", close: " #}" },
      { open: "{% ", close: " %}" },
      { open: "{{ ", close: " }}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: '"' },
      { open: "'", close: "'" },
    ],
    surroundingPairs: [
      { open: '"', close: '"' },
      { open: "'", close: "'" },
      // HTML
      { open: "<", close: ">" },
    ],
    ////////////////////
    defaultToken: "",
    tokenPostfix: "",
    ignoreCase: true,
    brackets: [
      { token: "delimiter.twig", open: "{%", close: "%}" },
      { token: "delimiter.twig", open: "{{", close: "}}" },
      { token: "delimiter.twig", open: "{#", close: "#}" },
      { token: "delimiter.square.twig", open: "[", close: "]" },
      { token: "delimiter.paren.twig", open: "(", close: ")" },
    ],
    keywords: [
      "if",
      "else",
      "elif",
      "endif",
      "for",
      "endfor",
      "while",
      "endwhile",
      "do",
      "loop",
      "break",
      "continue",
      "as",
      "with",
      "without",
      "context",
      "include",
      "import",
      "from",
      "as",
      "true",
      "false",
      "none",
    ],
    tokenizer: {
      root: [
        [/\s+/],
        [/{#/, "comment.twig", "@commentState"],
        [/{%[-~]?/, "delimiter.twig", "@blockState"],
        [/{{[-~]?/, "delimiter.twig", "@variableState"],
        [/[^{]+/, ""],
      ],
      commentState: [
        [/#}/, "comment.twig", "@pop"],
        [/./, "comment.twig"],
      ],
      blockState: [
        [/-?%}/, "delimiter.twig", "@pop"],
        [
          /\b(if|else|elif|endif|for|endfor|while|endwhile|do|loop|break|continue|as|with|without|context|include|import|from|true|false|none)\b/,
          "keyword.twig",
        ],
        { include: "expression" },
      ],
      variableState: [
        [/-?}}/, "delimiter.twig", "@pop"],
        { include: "expression" },
      ],
      expression: [
        [/\s+/],
        [/\(|\)|\[|\]|\{|\}/, "delimiter.twig"],
        [/\d+(\.\d+)?/, "number.twig"],
        [/"([^#"\\]*(?:\\.[^#"\\]*)*)"/, "string.twig"],
        [/'([^'\\]*(?:\\.[^'\\]*)*)'/, "string.twig"],
        [/\b(and|or|not|b-and|b-xor|b-or)\b/, "operators.twig"],
        [/\b(starts with|ends with|matches)\b/, "operators.twig"],
        [/\b(in|is)\b/, "operators.twig"],
        [
          /\+|-|\*{1,2}|\/{1,2}|%|==|!=|<|>|>=|<=|\||~|:|\.{1,2}|\?{1,2}|=/,
          "operators.twig",
        ],
        [
          /[^\W\d][\w]*/,
          {
            cases: {
              "@keywords": "keyword.twig",
              "@default": "variable.twig",
            },
          },
        ],
      ],
    },
  });
}
