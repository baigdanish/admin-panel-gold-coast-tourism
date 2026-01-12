import { Box, Stack, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      sx={{
        height: "70px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eee",
        padding: "0 20px",
        display: "flex",

        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #eee",
      }}
    >
      <Typography variant="h6" color="primary">
        Gold Coast Tours
      </Typography>

      <Stack direction="row" spacing={2}>
        {/* Icons / Profile */}
      </Stack>
    </Box>
  );
};

export default Navbar;
