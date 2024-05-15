// Function to fetch properties of a specific model GUID from the Autodesk Forge API
export const getProperties = async (token: string, urn: string ,modelGuid :string) => {
  // URL for fetching properties
  const url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelGuid}/properties`;

  try {
      // Send a GET request to fetch properties
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
      console.log("extract metadata properties " , data); // Log fetched properties data
      return data;
  } catch (error) {
      // Handle errors
      console.error('extract Error fetching metadata:', error);
      return null;
  }
};
