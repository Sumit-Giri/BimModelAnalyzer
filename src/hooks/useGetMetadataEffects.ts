import React, { useEffect, useState } from "react";
import { SPECIFIC_QUERY_DATA } from "../model/constants/constants";

// Custom hook to handle effects related to fetching metadata and properties
function useGetMetadataEffects(
  urn: string | null,
  token: any,
  getProperties: any,
  getSpecificProperties: any,
  getMetadata: any,
  setPropertiesData: any,
  setLoading: any // Add setLoading as parameter
) {
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Check if URN or token is available
        if (!urn || !token) return;

        // Set loading to true
        setLoading(true);

        // Fetch metadata using access token and URN
        const metadataResponse = await getMetadata(token.access_token, urn);

        // Extract metadata from the response
        const metadata = metadataResponse?.data?.metadata;

        // Log the GUID for debugging
        console.log('GUID', metadata);

        // Check if metadata is available
        if (metadata && metadata.length > 0) {
          // Get the model GUID from metadata
          const modelGuid = metadata[0]?.guid;

          // Check if model GUID is available
          if (modelGuid) {
            // Fetch properties using access token, URN, and model GUID
            const propertiesResponse = await getProperties(
              token.access_token,
              urn,
              modelGuid
            );

            // Extract properties collection from the response
            const propertiesCollection = propertiesResponse?.data?.collection;

            // Log properties collection for debugging
            console.log("propertiesCollection" , propertiesCollection);

            // Check if properties collection is available
            if (propertiesCollection && propertiesCollection.length > 0) {
              // Initialize an array to store processed data
              const processedData: any[] = [];

              // Loop through each query in SPECIFIC_QUERY_DATA
              for (const query of SPECIFIC_QUERY_DATA) {
                // Fetch specific properties using access token, URN, model GUID, and query
                const specificPropertiesResponse = await getSpecificProperties(
                  token.access_token,
                  urn,
                  modelGuid,
                  query
                );

                // Extract specific properties collection from the response
                const specificPropertiesCollection =
                  specificPropertiesResponse?.data?.collection;

                // Check if specific properties collection is available
                if (
                  specificPropertiesCollection &&
                  specificPropertiesCollection.length > 0
                ) {
                  // Push specific properties into the processed data array
                  processedData.push(...specificPropertiesCollection);
                }
              }

              // Set the processed data as properties data
              setPropertiesData(processedData);
            } else {
              // Log a warning if properties collection is empty
              console.warn("Properties collection is empty.");
            }
          } else {
            // Log a warning if model GUID is not found in metadata
            console.warn("Model GUID not found in metadata.");
          }
        } else {
          // Log a warning if metadata collection is empty
          console.warn("Metadata collection is empty.");
        }
      } catch (error) {
        // Log any errors that occur during data fetching
        console.error("Error fetching data:", error);
      } finally {
        // Set loading to false when fetching completes (whether successful or not)
        setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchData();
  // Depend on urn and token for changes triggering data fetching
  }, [urn, token]);
}

export default useGetMetadataEffects;
