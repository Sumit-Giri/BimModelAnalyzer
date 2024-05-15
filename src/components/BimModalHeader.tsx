import { AppBar, Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import * as XLSX from "xlsx";
import { translateFile } from "../api/convertDataToSVFFormat"; 
import { checkJobStatus } from "../api/jobStatus";
import { checkFileUploaded, uploadFileToBucket } from "../api/loadFileToBucket";
import { REVIT_FILES_BUCKET_KEY } from "../model/constants";
import { createUrn } from "../model/utils/urnUtils";

// Component for the header of the BIM model analyzer
function BimModalHeader(props: any) {
  const { token, setUrn, updatedPropertyData } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    if (token) {
      // Check if the file is already uploaded to the bucket
      const fileCheckResp = await checkFileUploaded(
        REVIT_FILES_BUCKET_KEY,
        file.name,
        token.access_token
      );
      console.log("fileCheckResp: ", fileCheckResp);

      if (fileCheckResp) {
        // If file already exists, set the URN
        setUrn(createUrn(REVIT_FILES_BUCKET_KEY, file.name));
      } else {
        // If file doesn't exist, upload the file to the bucket
        console.log("uploading file to bucket ... ");
        const uploadResp = await uploadFileToBucket(
          file,
          token.access_token,
          `revit_files_by_sumit_giri_01`
        );
        console.log("uploadResp : ", uploadResp);
        const { objectId } = uploadResp;

        // Translate the uploaded file for viewing
        console.log("Sending uploaded file for translation ... ");
        const translationResp = await translateFile(
          objectId,
          token.access_token
        );
        console.log("translationResp : ", translationResp);
        const { urn } = translationResp;

        // Check the status of the translation job
        checkJobStatus(urn, token.access_token, (urn) => setUrn(urn));
      }
    }
  };

  // Function to handle click event for file upload button
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle click event for file download button
  const handleDownloadButtonClick = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(updatedPropertyData);

    XLSX.utils.book_append_sheet(wb, ws, "Properties Data");
    const wbArrayBuffer = XLSX.write(wb, { type: "array" });
    const blob = new Blob([wbArrayBuffer], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "properties_data.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render
  return (
    <div id="header">
      <h1 id="logo">BIM Model Analyzer</h1>
      <Grid
        item
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppBar position="sticky">
          <div
           style={{background:"black"}} 
          >
            {/* Hidden file input element */}
            <input
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* Button to trigger file selection */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  marginBottom: "8px",
                  borderBottom: "none",
                  borderRadius:"0px",
                  position:'relative',
                  top:'5px',
                }}
                onClick={handleButtonClick}
              >
                Upload File
              </Button>
              {/* Button to trigger file download */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  marginBottom: "8px",
                  borderBottom: "none",
                  borderRadius:"0px",
                  position:'relative',
                  top:'5px',
                }}
                onClick={handleDownloadButtonClick}
              >
                Download File
              </Button>
            </div>
          </div>
        </AppBar>
      </Grid>
    </div>
  );
}

export default BimModalHeader;
