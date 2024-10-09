import { shikiToMonaco } from "@shikijs/monaco/index.mjs";
import { useEffect, useRef } from "react";
import { createHighlighter } from "shiki/index.mjs";
import shiki_halcyon from "../../styles/themes/shiki-halcyon";

import Editor from "@monaco-editor/react";

export default function YAMLEditor({
  editorData,
  handleEditorChange,
}: {
  editorData: { YAMLEditor: string; YAMLEditor: string };
  handleEditorChange: (editorContent: string, editorName: string) => void;
}) {
  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
    monaco.languages.register({ id: "yaml" });
    const highlighter = createHighlighter({
      themes: [shiki_halcyon],
      langs: ["yaml"],
    });

    editor.updateOptions({
      fontSize: 14
    })

    Promise.all([highlighter]).then(([highlighter]) => {
      shikiToMonaco(highlighter, monaco);
    });
  }

  return (
    <>
      <label
        className="m_8fdc1311 mantine-InputWrapper-label mantine-Textarea-label"
        data-size="md"
        id="YAMLEditor-label"
      >
        YAML Variables
      </label>
      <p
        className="YAMLEditor m_fe47ce59 mantine-InputWrapper-description mantine-Textarea-description"
        data-size="md"
        id="YAMLEditor-description"
      >{`e.g. some_var: abc`}</p>
        <Editor
          height={window.visualViewport!.height}
          defaultLanguage="yaml"
          value={editorData.YAMLEditor}
          onMount={handleEditorDidMount}
          onChange={(editorContent) =>
            handleEditorChange(editorContent!, "YAMLEditor")
          }
        />
    </>
  );
}
