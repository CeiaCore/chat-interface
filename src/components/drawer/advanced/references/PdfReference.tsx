import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";
import styles from "./Reference.module.css";

import { Viewer } from "@react-pdf-viewer/core";

// Plugins
import { Worker } from "@react-pdf-viewer/core";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Reference } from "../../../../context/ChatContext";
// Create new plugin instance

const URL = window._env_.URL_API;

const PATH_DEFAULT = "/api/v1/knowledge_router/pdf";

const PdfReference = ({ reference }: { reference: Reference }) => {
  const [open, setOpen] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
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
            pdf
          </span>
          <FaRegFilePdf />
          <p className={styles.reference_title}>{reference?.source}</p>
        </div>
        <p style={{ fontSize: ".7rem" }}>
          Página {Number(reference?.page) + 1}
        </p>
        <p style={{ fontSize: ".85rem", height: "200px" }}>
          {reference?.content}
        </p>
      </li>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>{reference?.source}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
            <div
              style={{
                height: "750px",
              }}
            >
              <Viewer
                fileUrl={`${URL}${PATH_DEFAULT}/${reference?.document_id}`}
                initialPage={Number(reference?.page)}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Typography>
        </DialogContent>
      </Dialog>
    </Worker>
  );
};

export default PdfReference;
