import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import FakeHKer from "faker-hk";
import { useMemo, useState } from "react";

const Doc = () => {
  const [state, setState] = useState<number | null>(null);

  const person = useMemo(() => {
    const person = new FakeHKer({seed: state === null ? undefined : state})
    return JSON.parse(JSON.stringify(person))
  }, [state])

  const alwaysExpanded = true;

  return (
    <Box sx={rootSx}>
      <Accordion expanded={alwaysExpanded}>
        <AccordionSummary sx={accordionSummarySx}>
          <Typography variant="h6">Installation</Typography>
          <Typography variant="body1">
            <i>faker-hk</i>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailSx}>
          <Box sx={{ flex: 1 }}>
            <SyntaxHighlighter
              language="bash"
              lineProps={{
                style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
              }}
              wrapLines={true}
            >
              {
                "npm install faker-hk\n\n# or\n\nyarn add faker-hk"
              }
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary sx={accordionSummarySx}>
          <Typography variant="h6">
            {"new Person( seed?: number ): Person"}
          </Typography>
          <Typography variant="body1">
            <i>
              returns fake person profile
            </i>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailSx}>
          <Box sx={{ flex: 1 }}>
            <TextField
              value={state}
              onChange={(e) => setState(e.target.value ? parseInt(e.target.value, 10) : null)}
              type="number"
              fullWidth
            />
            <SyntaxHighlighter
              language="tsx"
              lineProps={{
                style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
              }}
              wrapLines={true}
            >
              {getPersonCode(state)}
            </SyntaxHighlighter>
          </Box>
          <Box sx={{ flex: 1, my: 1 }}>
            <JsonView
              data={person}
              style={{
                ...darkStyles,
                container: `${darkStyles.container} json-container`,
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Doc;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
  width: "100%",
  overflow: "scroll",
};

const detailSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  gap: 2,
  alignItems: "flex-start",
};

const accordionSummarySx: SxProps<Theme> = {
  "& .MuiAccordionSummary-content": {
    alignItems: "baseline",
    gap: 2,
    borderBottom: "#eee 1px solid",
  },
};

const getPersonCode = (
  input: number | null,
) => `import FakeHKer from "faker-hk";

console.log( new FakeHKer({seed: ${input === null ? "" : input }}) );`;
