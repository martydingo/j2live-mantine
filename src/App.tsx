import "@mantine/core/styles.css";
import { AppShell, Center, Code, Divider, Flex, MantineProvider, Text, Textarea, Title, TypographyStylesProvider } from "@mantine/core";
import FileIconsJinja from '~icons/file-icons/jinja';
import { useState } from "react";
import { theme } from "./theme";
import "./theme.css"

async function renderTemplate(yamlVariables: string, jinja2Template: string): Promise<{ error: boolean; message: string; }> {
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
    const postResponse: { error: boolean; message: string; } = await postRequest.json()
    
    return {
      error: postResponse['error'],
      message: postResponse['message']
    }

  }
  catch (err) {
    const errorMsg = err as string
    return {
      error: true,
      message: errorMsg
    }
  }
}

export default function App() {
  const [formData, setFormData] = useState({
    // yamlVariables: "",
    // jinja2Template: "",
    yamlVariables: "x:\n  - name: abc\n  - name: def",
    jinja2Template: "{% for y in x %}\n{{ y }}\n{% endfor %}",
  });
  const [errorState, setErrorState] = useState();

  const handleChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        setErrorState(output[0].error as unknown as string)
      } else {
        setErrorState(output[0].message.toString() as unknown as string)
      }
      setFormData((prevState) => ({ ...prevState, generatedOutput: output[0].message as unknown as string }))
      outputElement!.innerHTML = output[0].message as unknown as string
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
          style={{ marginLeft: "1em", marginTop: "1em" }}
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
              style={{ width: "100%", height: "100%" }}
            >
            <Flex
              direction="column"
              style={{ width: "100%", height: "100%", padding: "1em", maxWidth: "49vw", maxHeight: "45vh" }}
              align="center"
            >
              <Textarea
                label="YAML Variables"
                name="yamlVariables"
                id="yamlVariables"
                description="e.g. some_var: abc"
                minRows={16}
                autosize
                onChange={(event) => handleChange(event)}
                value={formData.yamlVariables}
                style={{ width: "90%" }}
                size="md"
              />
              <Textarea
                label="Jinja2 Template"
                name="jinja2Template"
                id="jinja2Template"
                description="e.g. {{ some_var }}"
                minRows={16}
                autosize
                onChange={(event) => handleChange(event)}
                value={formData.jinja2Template}
                style={{ marginTop: "2.5em", width: "90%" }}
                size="md"
              />
            </Flex>
            <Flex
              direction="column"
              justify="end"
              align="center"
              style={{ width: "100%", height: "100%", padding: "1em", maxWidth: "49vw" }}
            >
              <Textarea id="generatedOutput"
                inputWrapperOrder={['label', 'description', 'error', 'input']}
                label="Generated Template"
                description="The generated output below will automatically update when tweaking values on the left-hand side"
                style={{ textWrap: "pretty", height: "100%", width: "90%" }}
                minRows={(errorState == false || errorState == undefined) && 37 || 34.5 - (Math.max(errorState.length/128, 0)-0.5)}
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
          <Center style={{paddingBottom: "1em"}}>
            J2Live v0.1
          </Center>
        </TypographyStylesProvider>
      </AppShell.Footer>
    </AppShell>
  </MantineProvider>;
}
