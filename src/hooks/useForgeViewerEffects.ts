import { useEffect } from "react";

// Custom hook to handle effects related to Forge Viewer
function useForgeViewerEffects(urn: any, forgeViewer: any) {
  // Callback function called when document loading succeeds
  const onDocumentLoadSuccess = (viewerDocument: Autodesk.Viewing.Document) => {
    // Get the default model from the viewer document
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();

    // Log forgeViewer for debugging
    console.log("forgeViewer: ", forgeViewer);

    // Check if forgeViewer exists
    if (forgeViewer) {
      // Log loading document node
      console.log("loading document node...");
      
      // Load the document node into the viewer
      forgeViewer.loadDocumentNode(viewerDocument, defaultModel);
      
      // Show the toolbar if available
      forgeViewer?.toolbar?.setVisible(true);
    }
    
    // Log document loaded successfully
    console.log("Document loaded fine!", viewerDocument);
  };

  // Callback function called when document loading fails
  function onDocumentLoadFailure() {
    console.error("Failed fetching Forge manifest");
  }

  useEffect(() => {
    // Check if forgeViewer exists
    if (forgeViewer) {
      // Start the viewer and get the start code
      const startCode = forgeViewer.start();

      // Check if the viewer started successfully
      if (startCode === 0) {
        // Load the document using its URN
        Autodesk.Viewing.Document.load(
          `urn:${urn}`,
          onDocumentLoadSuccess,
          onDocumentLoadFailure
        );
      } else {
        // Log an error if the viewer failed to start
        console.error("Failed to start the viewer.");
      }
    }
  // Depend on forgeViewer for changes triggering viewer initialization
  }, [forgeViewer]);
}

export default useForgeViewerEffects;
