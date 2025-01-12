import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SharedModal = ({ open, onClose, title, content }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          boxShadow: 24,
          p: 3, // Increased padding
          width: 400,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <IconButton onClick={onClose} sx={{ padding: 0 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          id="modal-description"
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {content} {/* This renders the passed component as content */}
        </Box>
      </Box>
    </Modal>
  );
};

export default SharedModal;
