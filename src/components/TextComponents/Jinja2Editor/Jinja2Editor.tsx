import { shikiToMonaco } from "@shikijs/monaco/index.mjs";
import { useEffect, useRef } from "react";
import { createHighlighter } from "shiki/index.mjs";
import shiki_halcyon from "../../../styles/themes/shiki-halcyon";
import Editor from "@monaco-editor/react";
import defineMonacoJinja2Language from "./Jinja2LanguageDefinition";
import "./Jinja2Editor.css";
import monaco_theme_halcyon from "../../../styles/themes/monaco/monaco-halcyon";

export default function Jinja2Editor({
  editorData,
  handleEditorChange,
}: {
  editorData: { Jinja2Editor: string; Jinja2Editor: string };
  handleEditorChange: (editorContent: string, editorName: string) => void;
}) {
  const editorRef = useRef(null);
 
  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;

    defineMonacoJinja2Language(monaco);

    const highlighter = createHighlighter({
      themes: [shiki_halcyon],
      langs: ["jinja"],
      colorReplacements: {
        '#ffd700': '#5ccfe6'
      }
    });

    Promise.all([highlighter]).then(([highlighter]) => {
      shikiToMonaco(highlighter, monaco);
    });

    monaco_theme_halcyon()
    monaco.editor.setTheme("Halcyon")
    editor.updateOptions({
      fontSize: 14
    })
  }

  return (
    <>
      <label
        className="m_8fdc1311 mantine-InputWrapper-label mantine-Textarea-label"
        data-size="md"
        id="Jinja2Editor-label"
      >
        Jinja2 Template
      </label>
      <p
        className="Jinja2Editor m_fe47ce59 mantine-InputWrapper-description mantine-Textarea-description"
        data-size="md"
        id="Jinja2Editor-description"
      >{`e.g. {{ some_var }}`}</p>
      <Editor
        height="90vh"
        defaultLanguage="jinja"
        value={editorData.Jinja2Editor}      
        onMount={handleEditorDidMount}
        onChange={(editorContent) =>
          handleEditorChange(editorContent!, "Jinja2Editor")
        }
      />
    </>
  );
}
