import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FlightTakeoff from "@mui/icons-material/FlightTakeoff";
import BeachAccess from "@mui/icons-material/BeachAccess";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Stack,
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
        background: "linear-gradient(120deg, #0ea5e9, #6366f1)",
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,.15)",
            textAlign: "center",
          }}
        >
          {/* Brand Section */}
          <Stack alignItems="center" spacing={0.5} mb={2}>
            <FlightTakeoff sx={{ fontSize: 38, color: "primary.main" }} />
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{
                background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gold Coast Tourism
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to manage adventures
            </Typography>
          </Stack>

          <TextField
            fullWidth
            required
            error={!!touched.email && !!errors.email}
            helperText={(touched.email && errors.email) || ""}
            margin="normal"
            label="Email Address"
            value={values.email}
            variant="outlined"
            onBlur={handleBlur("email")}
            onChange={handleChange("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BeachAccess fontSize="small" />
                </InputAdornment>
              ),
            }}
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
            label="Password"
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
              borderRadius: "12px",
              py: 1.3,
              background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
              textTransform: "none",
              fontSize: "15px",
              "&:hover": {
                background: "linear-gradient(90deg, #0ea5e9, #6366f1)",
                opacity: 0.95,
              },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Log in"
            )}
          </Button>

          <Typography sx={{ mt: 2 }} variant="caption" color="text.secondary">
            Explore • Manage • Travel
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginUI;
// deployed on vercel: https://gold-coast-tourism.vercel.app/login
