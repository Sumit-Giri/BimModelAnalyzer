import { useEffect } from "react";
import { ForgeViewerToken } from "../model/types/forgeViewer.types";
import { REVIT_FILES_BUCKET_KEY } from "../model/constants";

// This custom hook is used to manage the effects related to creating a bucket
function useCreateBucketEffects(getAccessToken:any , setToken: any, createBucket: any) {
  useEffect(() => {
    // When the component mounts, fetch the access token
    getAccessToken().then((token: ForgeViewerToken) => {
      // Once the access token is retrieved, set it using the provided function
      setToken(token);
      // Call the function to create a bucket using the access token and bucket key
      createBucket(token.access_token, REVIT_FILES_BUCKET_KEY);
    });
  // Empty dependency array ensures that this effect runs only once, similar to componentDidMount
  }, []);
}

export default useCreateBucketEffects;
