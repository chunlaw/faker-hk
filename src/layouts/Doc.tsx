import { useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Divider,
  SxProps,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Theme,
  Typography,
} from "@mui/material";
import ReactJson from "react-json-view";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import FakeHKer, { type FakeHKerOption } from "faker-hk";
import { useMemo, useState } from "react";

const Doc = () => {
  const [state, setState] = useState<FakeHKerOption>({});

  const person = useMemo(() => {
    const person = new FakeHKer(state);
    return JSON.parse(JSON.stringify(person));
  }, [state]);

  const alwaysExpanded = true;

  const handleChangeSeeds = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        seeds: value === "" ? undefined : parseInt(value, 10),
      }));
    },
    [],
  );

  const handleChangeTs = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        avgBirthTs: value === "" ? undefined : parseInt(value, 10),
      }));
    },
    [],
  );

  const handleChangeStd = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({
        ...prev,
        ageStd: value === "" ? undefined : parseInt(value, 10),
      }));
    },
    [],
  );

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
              {"npm install faker-hk\n\n# or\n\nyarn add faker-hk"}
            </SyntaxHighlighter>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary sx={accordionSummarySx}>
          <Typography variant="h6">
            {
              "new FakerHKer( { seeds?: number[], avgBirthTs?: number, ageStd?: number } ): FakerHKer"
            }
          </Typography>
          <Typography variant="body1">
            <i>returns fake person profile</i>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailSx}>
          <Grid container spacing={1} sx={{ flex: 1 }} alignItems="flex-start">
            <Grid
              item
              container
              xs={12}
              md={6}
              spacing={1}
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <TextField
                  label="seeds[]"
                  value={state.seeds ?? ""}
                  onChange={handleChangeSeeds}
                  type="number"
                  size="small"
                  placeholder="Random number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Average Birthday Timestamp"
                  value={state.avgBirthTs ?? ""}
                  onChange={handleChangeTs}
                  type="number"
                  size="small"
                  placeholder="376099200000 (i.e., 1981-12-02)"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Age Standard Deviation"
                  value={state.ageStd ?? ""}
                  onChange={handleChangeStd}
                  type="number"
                  size="small"
                  placeholder="15"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <SyntaxHighlighter
                  language="tsx"
                  lineProps={{
                    style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
                  }}
                  wrapLines={true}
                >
                  {getPersonCode(state)}
                </SyntaxHighlighter>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <ReactJson
                src={person}
                theme="monokai"
                quotesOnKeys={false}
                displayDataTypes={false}
              />
            </Grid>
          </Grid>
          <Box sx={{ width: "100%" }}>
            <Divider />
          </Box>
          <TableContainer>
            <Typography variant="h6">FakeHKerOption</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Field</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>seeds</TableCell>
                  <TableCell>number | number[]</TableCell>
                  <TableCell>
                    Random number for generating the profile (Optional){" "}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>avgBirthTs</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    Average birth date in Unix timestamp for generating age
                    using normal distribution (Optional){" "}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ageStd</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    Standard deviation for generating age using normal
                    distribution (Optional){" "}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
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
  flexDirection: "column",
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

const getPersonCode = (option: FakeHKerOption) => {
  let ret = `import FakeHKer from "faker-hk";\n\n`;

  ret += `console.log( new FakeHKer(`;
  if (
    option.seeds === undefined &&
    option.avgBirthTs === undefined &&
    option.ageStd === undefined
  ) {
    ret += `) );`;
  } else {
    ret += "{\n";
    if (option.seeds) {
      ret += `  seeds: ${option.seeds},\n`;
    }
    if (option.avgBirthTs) {
      ret += `  avgBirthTs: ${option.avgBirthTs},\n`;
    }
    if (option.ageStd) {
      ret += `  ageStd: ${option.ageStd},\n`;
    }
    ret += `}));\n`;
  }
  return ret;
};
