import "@mantine/core/styles.css";
import { AppShell, Code, Divider, Flex, MantineProvider, Textarea, Title } from "@mantine/core";
import FileIconsJinja from '~icons/file-icons/jinja';
import { useState } from "react";
import { theme } from "./theme";

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
      return JSON.parse(JSON.stringify(postResponse['message']))

  }
  catch (err) { return err }
}

export default function App() {
  const [formData, setFormData] = useState({
    yamlVariables: "x:\n  - name: abc\n  - name: def",
    jinjaTemplate: "{% for y in x %}\n{{ y }}\n{% endfor %}",
    generatedOutput: ""
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    let generatedOutput
    if (name === "yamlVariables") {
        generatedOutput = renderTemplate(value, formData.jinjaTemplate)
    } else {
        generatedOutput = renderTemplate(formData.yamlVariables, value)
    }
    Promise.all([generatedOutput]).then((output) => {
        setFormData((prevState) => ({ ...prevState, generatedOutput: output as unknown as string }))
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
          align="center"
          gap="xs"
          style={{ marginLeft: "1em", marginTop: "1em", marginBottom: "0.3em" }}
        >
          <FileIconsJinja style={{ fontSize: '2.5em' }} />
          <Title order={2}>J2Live</Title>
        </Flex>
      </AppShell.Header>
      <AppShell.Main
        style={{ marginTop: "1em" }}
      >
        <Flex
          direction="row"
          justify="center"
        >
          <Flex
            direction="column"
            style={{ width: "100%", height: "100%" }}
          >
            <Textarea
              label="YAML Variables"
              description="e.g. some_var: abc"
              minRows={21}
              maxRows={21}
              autosize
            />
            <Divider
              style={{ marginTop: "2em", marginBottom: "1em" }}
            />
            <Textarea
              label="Jinja2 Template"
              description="e.g. {{ some_var }}"
              minRows={20}
              maxRows={20}
              autosize
            />
          </Flex>
          <Flex
            direction="column"
            style={{ width: "100%", height: "100%" }}
          >
            <Code block>
              Blah
            </Code>
          </Flex>
        </Flex>
      </AppShell.Main>
      <AppShell.Footer
        style={{ marginBottom: "1em" }}
      >
        <Flex
          align="center"
          justify="center"
        >
          J2Live v0.1
        </Flex>
      </AppShell.Footer>
    </AppShell>
  </MantineProvider>;
}
