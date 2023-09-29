import {
  Box,
  IconButton,
  Snackbar,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import Person from "faker-hk";
import React, { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  ContentCopy,
  Close as CloseIcon,
  CopyAll,
  Refresh,
} from "@mui/icons-material";

const Doc = () => {
  const [state, setState] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const person = useMemo(() => {
    if (state || state === 0) {
      return new Person();
    }
    return new Person();
  }, [state]);

  const handleCopy = useCallback((str: string) => {
    navigator.clipboard.writeText(str);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box sx={rootSx}>
      <Box sx={containerSx}>
        <Box
          sx={{
            background: `url(${person.avatar})`,
            height: 128,
            width: 128,
            backgroundSize: "contain",
          }}
        ></Box>
      </Box>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell sx={{ width: "20%" }}>
              <Typography variant="body2">Sex:&emsp;</Typography>
            </TableCell>
            <TableCell sx={{ width: "70%" }}>
              <Typography variant="body1" fontWeight="bold">
                {person.sex.toUpperCase()}
              </Typography>
            </TableCell>
            <TableCell sx={{ width: "10%" }}>
              <IconButton
                onClick={() => handleCopy(person.sex.toUpperCase())}
                size="small"
              >
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">Chinese Name:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {person.chnSurname}
                {person.chnFirstname}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() =>
                  handleCopy(person.chnSurname + person.chnFirstname)
                }
                size="small"
              >
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">English Name:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {person.surname} {person.firstname}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() =>
                  handleCopy(`${person.surname} ${person.firstname}`)
                }
                size="small"
              >
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">Birth:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {format(person.birth, "yyyy-MM-dd")}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() => handleCopy(format(person.birth, "yyyy-MM-dd"))}
                size="small"
              >
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">HKID:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {person.hkid}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleCopy(person.hkid)} size="small">
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">Phone:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {person.phone}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleCopy(person.phone)} size="small">
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">Address:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {person.address}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() => handleCopy(person.address)}
                size="small"
              >
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body1">Chinese Address:&emsp;</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" fontWeight="bold">
                {person.chnAddress}
              </Typography>
            </TableCell>
            <TableCell>
              <IconButton
                onClick={() => handleCopy(person.chnAddress)}
                size="small"
              >
                <ContentCopy />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={containerSx}>
        <IconButton
          size="small"
          onClick={() => handleCopy(JSON.stringify(person, null, 2))}
        >
          <CopyAll />
        </IconButton>
        <IconButton size="small" onClick={() => setState((prev) => prev + 1)}>
          <Refresh />
        </IconButton>
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

export default Doc;

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

const containerSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};
