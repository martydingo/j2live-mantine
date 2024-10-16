import "@mantine/core/styles.css";
import {
  AppShell,
  Center,
  Flex,
  MantineProvider,
  Textarea,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
//@ts-ignore
import FileIconsJinja from "~icons/file-icons/jinja";
import { useState } from "react";
import { theme } from "./theme";
import "./theme.css";

import YAMLEditor from "./components/TextComponents/YAMLEditor/YAMLEditor";
import JinjaEditor from "./components/TextComponents/JinjaEditor/JinjaEditor";

async function renderTemplate(
  yamlVariables: string,
  JinjaTemplate: string
): Promise<{ error: boolean; message: string }> {
  try {
    const postRequest = await fetch("/api", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        YAML: yamlVariables,
        Jinja: JinjaTemplate,
      }),
      mode: "cors",
    });
    const postResponse: { error: boolean; message: string } =
      await postRequest.json();

    return {
      error: postResponse["error"],
      message: postResponse["message"],
    };
  } catch (err) {
    const errorMsg = err as string;
    return {
      error: true,
      message: errorMsg,
    };
  }
}

export default function App() {
  const [editorData, setEditorData] = useState({
    // yamlVariables: "",
    // JinjaTemplate: "",
    YAMLEditor: "",
    JinjaEditor: "",
  });
  const [errorState, setErrorState] = useState("");

  const handleEditorChange = (editorContent: string, editorName: string) => {
    const outputElement = document.getElementById("TemplatePreview");
    let generateTemplatePromise;

    setEditorData((prevState) => ({ ...prevState, [editorName]: editorContent }));

    if (editorName === "YAMLEditor") {
      generateTemplatePromise = renderTemplate(
        editorContent,
        editorData.JinjaEditor
      );
    } else {
      generateTemplatePromise = renderTemplate(
        editorData.YAMLEditor,
        editorContent
      );
    }

    Promise.all([generateTemplatePromise]).then(
      ([templateGeneratorResponse]) => {
        if (templateGeneratorResponse.error == false) {
          setErrorState(templateGeneratorResponse.error as unknown as string);
        } else {
          setErrorState(
            templateGeneratorResponse.message.toString() as unknown as string
          );
        }
        outputElement!.innerHTML =
          templateGeneratorResponse.message as unknown as string;
      }
    );
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell header={{ height: "2em" }} withBorder={false} padding="2em">
        <AppShell.Header>
          <Flex
            align="start"
            gap="xs"
            style={{ marginLeft: "1em", marginTop: "1em" }}
          >
            <FileIconsJinja style={{ fontSize: "2.1em" }} />
            <Title>J2Live</Title>
          </Flex>
        </AppShell.Header>
        <AppShell.Main>
          <TypographyStylesProvider>
            <Flex
              direction="row"
              justify="center"
              style={{ width: "100%", height: "100%" }}
            >
              <Flex
                direction="column"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "1em",
                  maxWidth: "49vw",
                  maxHeight: "90vh",
                }}
                align="start"
              >
                <YAMLEditor
                  editorData={editorData}
                  handleEditorChange={handleEditorChange}
                />
                <div
                  style={{
                    marginTop: "0.5em",
                    marginBottom: "0.5em",
                    width: "100%",
                  }}
                />
                <JinjaEditor
                  editorData={editorData}
                  handleEditorChange={handleEditorChange}
                />
              </Flex>
              <Flex
                direction="column"
                justify="center"
                align="end"
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "1em",
                  maxWidth: "49vw",
                  maxHeight: "90vh",
                }}
              >
                {/* <TemplatePreview /> */}
                <Textarea
                  id="TemplatePreview"
                  inputWrapperOrder={["label", "description", "error", "input"]}
                  label="Generated Template"
                  description="The generated output below will automatically update when tweaking values on the left-hand side"
                  style={{ textWrap: "pretty", height: "100%", width: "90%", textAlign: "end" }}
                  minRows={
                    ((errorState == "false" || errorState === undefined) && 38) ||
                    34.5 - (Math.max(errorState.length / 90, 0) - 2)
                  }
                  autosize
                  error={errorState || false}
                  size="md"
                  disabled
                />
              </Flex>
            </Flex>
          </TypographyStylesProvider>
        </AppShell.Main>
        <AppShell.Footer>
          <TypographyStylesProvider>
            <Center style={{ paddingBottom: "1em" }}>J2Live v0.1</Center>
          </TypographyStylesProvider>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
