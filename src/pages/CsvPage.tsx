import {
  Box,
  IconButton,
  Paper,
  Snackbar,
  SxProps,
  TextField,
  Theme,
} from "@mui/material";
import Person from "faker-hk";
import React, { useCallback, useMemo, useState } from "react";
import { formatDate } from "date-fns";
import { Close as CloseIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { asString, generateCsv, mkConfig } from "export-to-csv";

interface CsvPageState {
  count: string;
  profiles: Person[];
  avgBirthday: Date;
  ageStd: string;
}

const CsvPage = () => {
  const [state, setState] = useState<CsvPageState>(DEFAULT_STATE);
  const [open, setOpen] = useState<boolean>(false);

  const csv = useMemo<string>(() => {
    const persons = Array(parseInt(state.count || "10", 10))
      .fill(0)
      .map(
        () =>
          new Person({
            ageStd: parseInt(state.ageStd || "6", 10),
            avgBirthTs: state.avgBirthday.getTime(),
          }),
      )
      .map(({ sex, birth, ...person }) => ({
        sex: sex === "f" ? "Female" : "Male",
        birth: formatDate(birth, "y-MM-dd"),
        ...person,
      }));

    return asString(generateCsv(csvConfig)(persons));
  }, [state]);

  const handleCopy = useCallback(
    (str: string) => () => {
      navigator.clipboard.writeText(str);
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={rootSx}>
      <Box
        display="flex"
        gap={2}
        justifyContent="space-between"
        width="100%"
        height="100%"
        flex={1}
        overflow="hidden"
      >
        <Box flex={1} display="flex" flexDirection="column" gap={2}>
          <TextField
            value={state.count}
            onChange={({ target: { value } }) =>
              setState((prev) => ({ ...prev, count: value }))
            }
            type="number"
            label="Number of profiles"
            fullWidth
            sx={{ mt: 2 }}
          />
          <DatePicker
            value={state.avgBirthday}
            onChange={(v) =>
              setState((prev) => ({
                ...prev,
                avgBirthday: isValidDate(v) ? v : new Date(),
              }))
            }
            format="yyyy-MM-dd"
          />
          <TextField
            value={state.ageStd}
            onChange={({ target: { value } }) =>
              setState((prev) => ({ ...prev, ageStd: value }))
            }
            type="number"
            label="Age STD."
            fullWidth
            sx={{ mt: 2 }}
          />
        </Box>
        <Box maxWidth="50%" height="100%" flex={1}>
          <Paper
            sx={{
              whiteSpace: "pre",
              height: "100%",
              maxWidth: "100%",
              overflow: "scroll",
              p: 2,
            }}
            onClick={handleCopy(csv)}
          >
            {csv}
          </Paper>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Copied"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Box>
  );
};

export default CsvPage;

const rootSx: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  flex: 1,
  width: "100%",
  overflow: "scroll",
  py: 1,
};

const DEFAULT_STATE = {
  count: "50",
  profiles: [],
  avgBirthday: new Date(),
  ageStd: "6",
};

const isValidDate = (d: unknown): d is Date => {
  if (Object.prototype.toString.call(d) === "[object Date]") {
    // @ts-expect-error it is a date
    if (isNaN(d)) {
      // d.getTime() or d.valueOf() will also work
      // date object is not valid
      return false;
    } else {
      // date object is valid
      return true;
    }
  }
  return false;
};

const csvConfig = mkConfig({
  columnHeaders: [
    "chnSurname",
    "chnFirstname",
    "firstname",
    "surname",
    "sex",
    "hkid",
    "birth",
    "avatar",
    "phone",
    "address",
    "chnAddress",
  ],
});
