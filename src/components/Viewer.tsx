
import { Grid } from "@mui/material";
import React, { useState } from "react";
import { createBucket } from "../api/createBucket";
import { getMetadata } from "../api/extractMetadata";
import { getProperties } from "../api/extractProperties";
import { getSpecificProperties } from "../api/extractSpecificProperties";
import { getAccessToken } from "../api/getToken";
import useCreateBucketEffects from "../hooks/useCreateBucketEffects";
import useForgeViewerEffects from "../hooks/useForgeViewerEffects";
import useGetAccessTokenEffects from "../hooks/useGetAccessTokenEffects";
import useGetMetadataEffects from "../hooks/useGetMetadataEffects";
import { ForgeViewerToken } from "../model/types/forgeViewer.types";
import BmiModalHeader from "./BimModalHeader";
import PropertiesTable from "./PropertiesTable";
import RevitModal from "./RevitModal";

// Extend the global window object to access the Autodesk namespace
declare global {
  interface Window {
    Autodesk: any;
  }
}

// Component for displaying the Forge Viewer and related functionalities
const Viewer: React.FC = () => {
  // Accessing the Autodesk namespace from the global window object
  var Autodesk = window.Autodesk;
  console.log("Autodesk: ", Autodesk);

  // State variables
  const [token, setToken] = useState<ForgeViewerToken | null>(null);
  const [urn, setUrn] = useState<string | null>(null);
  const [forgeViewer, setForgeViewer] = useState<Autodesk.Viewing.GuiViewer3D | null>(null);
  const [propertiesData, setPropertiesData] = useState<any[]>([]);
  const [updatedPropertyData, setUpdatedPropertyData] = useState<any[]>([]);

  console.log("urn: ", urn);

  // Custom hooks for managing effects
  useForgeViewerEffects(urn, forgeViewer);
  useGetAccessTokenEffects(urn, token, setForgeViewer);
  useCreateBucketEffects(getAccessToken, setToken, createBucket);
  useGetMetadataEffects(urn, token, getProperties, getSpecificProperties, getMetadata, setPropertiesData);

  // Render
  return (
    <section id="viewer">
      {/* Header component */}
      <BmiModalHeader
        token={token}
        setUrn={setUrn}
        propertiesData={propertiesData}
        forgeViewer={forgeViewer}
        updatedPropertyData={updatedPropertyData}
      />
      {/* Main content grid */}
      <Grid container style={{ height: "100vh", width: "100%" }}>
        {/* Modal for Revit files */}
        <RevitModal />
        {/* Table component for displaying properties */}
        <PropertiesTable
          propertiesData={propertiesData}
          updatedPropertyData={updatedPropertyData}
          setUpdatedPropertyData={setUpdatedPropertyData}
        />
      </Grid>
    </section>
  );
};

export default Viewer;


