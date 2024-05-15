
import { Grid, Typography } from "@mui/material";

// Component for displaying the Revit model
function RevitModal() {
  return (
    <Grid
      item
      xs={6}
      style={{
        height: "92%",
        width: "50%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        style={{
          color: "white",
          textAlign: "center",
          padding: "8px",
          backgroundColor: "#303030",
        }}
      >
        Revit Model
      </Typography>
      {/* Forge Viewer container */}
      <div
        id="forgeViewer"
        style={{
          background: "black",
          height: "100vh",
          width: "100%",
          position: "relative",
        }}
      />
    </Grid>
  );
}

export default RevitModal;
