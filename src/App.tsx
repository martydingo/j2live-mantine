import "@mantine/core/styles.css";
import { AppShell, Code, Divider, Flex, MantineProvider, Text, Textarea, Title, TypographyStylesProvider } from "@mantine/core";
import FileIconsJinja from '~icons/file-icons/jinja';
import { useState } from "react";
import { theme } from "./theme";
import "./theme.css"

async function renderTemplate(yamlVariables: string, jinja2Template: string) {
  try {
    const postRequest = await fetch("http://localhost:8000/", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        "YAML": yamlVariables,
        "Jinja": jinja2Template
      }),
      mode: 'cors',
    })
    const postResponse = await postRequest.json()
    return {
      error: postResponse['error'],
      message: JSON.parse(JSON.stringify(postResponse['message']))
    }

  }
  catch (err) {
    return {
      error: true,
      message: err
    }
  }
}

export default function App() {
  const [formData, setFormData] = useState({
    yamlVariables: "",
    jinja2Template: "",
  });
  const [yamlErrorState, setYamlErrorState] = useState();
  const [jinja2ErrorState, setJinja2ErrorState] = useState();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    const outputElement = document.getElementById("generatedOutput")
    let generatedOutput
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "yamlVariables") {
      generatedOutput = renderTemplate(value, formData.jinja2Template)
    } else {
      generatedOutput = renderTemplate(formData.yamlVariables, value)
    }
    Promise.all([generatedOutput]).then((output) => {
      if (output[0].error == false) {
        setYamlErrorState(output[0].error as unknown as string)
        setJinja2ErrorState(output[0].error as unknown as string)
      } else {
        if (name === "yamlVariables") {
          setYamlErrorState(output[0].error as unknown as string)
        } else {
          setJinja2ErrorState(output[0].error as unknown as string)
        }
      }
      setFormData((prevState) => ({ ...prevState, generatedOutput: output[0].message as unknown as string }))
      outputElement!.innerText = output[0].message as unknown as string
    })
  }

  return <MantineProvider theme={theme} defaultColorScheme="dark">
    <AppShell
      header={{ height: "2em" }}
      withBorder={false}
      padding="2em"
    >
      <AppShell.Header>
        <Flex
          align="start"
          gap="xs"
          style={{ marginLeft: "1.5em", marginTop: "1em" }}
        >
          <FileIconsJinja style={{ fontSize: '2.1em' }} />
          <Title>J2Live</Title>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <TypographyStylesProvider>

          <Flex
            direction="row"
            justify="center"
          >
            <Flex
              direction="column"
              style={{ width: "100%", height: "100%", padding: "1em", maxWidth: "45vw", maxHeight: "45vh" }}
            >
              <Textarea
                label="YAML Variables"
                name="yamlVariables"
                id="yamlVariables"
                description="e.g. some_var: abc"
                minRows={18}
                maxRows={18}
                autosize
                onChange={(event) => handleChange(event)}
                value={formData.yamlVariables}
                error={yamlErrorState || false}
                style={{ fontFamily: "var(--mantine-font-family-monospace)" }}
                size="md"
              />
              <Textarea
                label="Jinja2 Template"
                name="jinja2Template"
                id="jinja2Template"
                description="e.g. {{ some_var }}"
                minRows={18}
                maxRows={18}
                autosize
                onChange={(event) => handleChange(event)}
                value={formData.jinja2Template}
                error={jinja2ErrorState}
                style={{ marginTop: "1em", fontFamily: "var(--mantine-font-family-monospace)" }}
                size="md"
              />
            </Flex>
            <Flex
              direction="column"
              style={{ width: "100%", height: "100%", padding: "1em", marginTop: "3.6em", maxWidth: "45vw" }}
            >
              <Code id="generatedOutput"
                style={{ textWrap: "pretty", height: "100%" }}
                block />
            </Flex>
          </Flex>
        </TypographyStylesProvider>
      </AppShell.Main>
    </AppShell>
  </MantineProvider>;
}
