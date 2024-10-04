import "@mantine/core/styles.css";
import { AppShell, Code, Divider, Flex, MantineProvider, Textarea, Title } from "@mantine/core";
import FileIconsJinja from '~icons/file-icons/jinja';
import { theme } from "./theme";

export default function App() {
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
              label="YAML"
              minRows={21}
              maxRows={21}
              autosize
            />
            <Divider
              style={{ marginTop: "2em", marginBottom: "1em" }}
            />
            <Textarea
              label="Jinja2"
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
