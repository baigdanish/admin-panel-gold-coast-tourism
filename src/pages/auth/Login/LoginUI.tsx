import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";

interface ILoginUI {
  formik: any;
  handlePasswordToggle: () => void;
  showPassword: boolean;
}

function LoginUI(props: ILoginUI) {
  const { formik, showPassword, handlePasswordToggle } = props;
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography gutterBottom variant="h4">
            Login
          </Typography>

          <TextField
            fullWidth
            required
            error={!!touched.phone && !!errors.phone}
            helperText={(touched.phone && errors.phone) || ""}
            margin="normal"
            placeholder="Enter your phone"
            value={values.phone}
            variant="outlined"
            onBlur={handleBlur("phone")}
            onChange={handleChange("phone")}
          />

          <TextField
            fullWidth
            required
            error={!!touched.password && !!errors.password}
            helperText={(touched.password && errors.password) || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handlePasswordToggle}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            margin="normal"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            variant="outlined"
            onBlur={handleBlur("password")}
            onChange={handleChange("password")}
          />

          <Button
            fullWidth
            sx={{
              mt: 2,
              background: "linear-gradient(to right, #2193b0, #6dd5ed)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(to right, #2193b0, #6dd5ed)",
              },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            {isSubmitting ? <CircularProgress size={18} /> : "Log in"}
          </Button>

          <Typography sx={{ mt: 2 }} variant="body2">
            Or sign in with:
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginUI;
