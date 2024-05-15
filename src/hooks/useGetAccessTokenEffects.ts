import  { useEffect } from "react";

// Custom hook to handle effects related to obtaining access token and initializing the viewer
function useGetAccessTokenEffects(urn:string | null, token:any, setForgeViewer: any) {
  useEffect(() => {
    // Function to initialize the viewer
    const initializeViewer = async () => {
      try {
        // Check if URN or token is available
        if (!urn || !token) {
          console.log("URN or token not available.");
          return;
        }

        // Log that viewer initialization is in progress
        console.log("Initializing viewer...");
        
        // Options for viewer initialization
        const options = {
          env: "AutodeskProduction2",
          api: "streamingV2",
          // Function to get access token and its expiration time
          getAccessToken: (
            onTokenReady: (token: string, expires: number) => void
          ) => {
            // Provide the access token and its expiration time
            onTokenReady(token.access_token, token.expires_in);
          },
        };

        // Initialize the viewer
        Autodesk.Viewing.Initializer(options, () => {
          // Get the viewer element
          const viewerDiv = document.getElementById("forgeViewer");

          // Check if the viewer element exists
          if (viewerDiv) {
            // Create a new viewer instance and set it
            setForgeViewer(new Autodesk.Viewing.GuiViewer3D(viewerDiv));
          } else {
            // Log an error if the viewer element is not found
            console.error("Viewer element not found.");
          }
        });
      } catch (error) {
        // Log any errors that occur during viewer initialization
        console.error("Error initializing viewer:", error);
      }
    };

    // Call the function to initialize the viewer
    initializeViewer();
  // Depend on urn and token for changes triggering re-initialization
  }, [urn, token]);
}

export default useGetAccessTokenEffects;
