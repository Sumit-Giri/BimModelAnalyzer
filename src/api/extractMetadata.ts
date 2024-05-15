// Function to fetch metadata of a specific URN from the Autodesk Forge API
export const getMetadata = async (token: string, urn: string) => {
  // URL for fetching metadata
  const url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata`;

  try {
      // Send a GET request to fetch metadata
      const response = await fetch(url, {
          headers: {
              Authorization: `Bearer ${token}`, // Include access token for authentication
          },
      });

      // If the request was not successful, throw an error
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse and return the response body as JSON
      const data = await response.json();
      return data;
  } catch (error) {
      // Handle errors
      console.error('Error fetching metadata:', error);
      return null;
  }
};
