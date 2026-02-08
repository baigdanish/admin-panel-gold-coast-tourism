import Close from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

type IProps = {
  open: boolean;
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
  handleClose: (v: any) => void;
  onConfirm: () => void;
};

function Alert(props: IProps) {
  const {
    open,
    title,
    message,
    handleClose,
    onConfirm,
    cancelText,
    confirmText,
  } = props;

  return (
    <>
      {/* <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        sx={{ maxWidth: "450px", margin: "auto" }}
      >
        <DialogTitle>{title}</DialogTitle>
        <Box position="absolute" right={0} top={0}>
          <IconButton onClick={() => handleClose("topClose")}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            sx={{ fontSize: "0.7rem" }}
            variant="contained"
            onClick={() => handleClose("bottomClose")}
          >
            {cancelText}
          </Button>
          <Button
            color="secondary"
            sx={{ fontSize: "0.7rem" }}
            variant="contained"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog> */}

      <Dialog maxWidth="lg" open={open} onClose={handleClose}>
        <Box>
          <DialogTitle>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              {title}
              <IconButton onClick={() => handleClose("topClose")}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ height: "50px", width: "350px" }}>
            <DialogContentText>
              <Typography sx={{ fontSize: "17px" }}>{message}</Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mb: 1,
              mr: 2,
              color: "#fff",
            }}
          >
            <Button
              sx={{
                fontFamily: "Arial",
                fontSize: "15px",
                height: "40px",
                width: "30%",
                color: "#fff",
                backgroundColor: "#F04461",
                "&:hover": {
                  backgroundColor: "#D73852",
                },
              }}
              title={cancelText}
              variant="contained"
              onClick={() => handleClose("bottomClose")}
            />
            <Button
              sx={{
                fontFamily: "Arial",
                fontSize: "15px",
                height: "40px",
                width: "30%",
                color: "#fff",
                backgroundColor: "#41DA7E",
                "&:hover": {
                  backgroundColor: "#37C26E",
                },
              }}
              title={confirmText}
              variant="contained"
              onClick={onConfirm}
            />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}

export default React.memo(Alert);
