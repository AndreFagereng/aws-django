import { Alert, AlertColor, Box, Button, Collapse, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

type MessageProps = {
  message: string;
  severity: AlertColor;
};

const AlertMessage = ({ message, severity }: MessageProps) => {
  const [open, setOpen] = useState(true);

  // If show is true this will be returned
  return (
    <Box sx={{ width: "100%", position: "absolute", textAlign: "center", justifyContent: "center" }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          style={{ textAlign: "center" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default AlertMessage;
