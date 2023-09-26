import {
  Box,
  Button,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { GitHub as GitHubIcon, Info as InfoIcon } from "@mui/icons-material";
import npmLogo from "../assets/npm.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box sx={rootSx}>
      <Typography
        variant="h6"
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
      >
        Faker HK
      </Typography>
      <Box>
        <Button
          variant="text"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/doc")}
          color="inherit"
        >
          <Typography variant="body1">Doc</Typography>
        </Button>
        <IconButton
          onClick={() => {
            window.open(
              "https://github.com/chunlaw/faker-hk",
              "_blank",
            );
          }}
          size="small"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            window.open(
              "https://www.npmjs.com/package/faker-hk",
              "_blank",
            );
          }}
          size="small"
        >
          <img src={npmLogo} width={24} height={24} alt="NPM logo" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;

const rootSx: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  gap: 1,
  width: "100%",
};
