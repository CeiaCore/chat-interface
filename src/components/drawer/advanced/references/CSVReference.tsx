import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import styles from "./Reference.module.css";
import { IoDocumentTextOutline } from "react-icons/io5";

interface ReferenceProps {
  data: {
    link: string;
    content: string;
    title: string;
    detail: {
      page: number;
    };
  };
  type: string;
}

const CSVReference = ({ reference }: { reference: ReferenceProps }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = reference.data.link;
    link.download = reference.data.title;
    link.click();
  };

  return (
    <>
      <li className={styles.reference} onClick={handleOpen}>
        <div className={styles.header_reference}>
          <span
            style={{
              position: "absolute",
              right: "10px",
              width: "50px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              height: "20px",
              borderRadius: "50px",
              fontSize: ".7rem",
              fontWeight: "700",
              textAlign: "center",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}
          >
            {reference.type}
          </span>
          <IoDocumentTextOutline style={{ width: "18px", height: "18px" }} />
          <p className={styles.reference_title}> {reference?.data?.title}</p>
        </div>
        <p style={{ fontSize: ".7rem" }}>
          Página {reference?.data?.detail?.page}
        </p>
        <p style={{ fontSize: ".85rem", height: "200px" }}>
          {reference?.data?.content}
        </p>
      </li>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {reference.data.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <h2 style={{ margin: 0, marginBottom: "20px" }}>
            Contexto Recuperado
          </h2>
          <Typography
            variant="body2"
            style={{
              whiteSpace: "pre-line",
              maxHeight: "500px",
              overflowY: "auto",
            }}
          >
            {reference?.data?.content}
          </Typography>
          <Typography
            style={{
              marginTop: "16px",
              display: "block",
              fontSize: ".8rem",
              fontWeight: "700",
            }}
          >
            Página {reference?.data?.detail?.page}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<DownloadIcon style={{ color: "#fff" }} />}
            style={{ backgroundColor: "#333" }}
            variant="contained"
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CSVReference;
