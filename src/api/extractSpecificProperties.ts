// Function to fetch specific properties of a model GUID using a query from the Autodesk Forge API
export const getSpecificProperties = async (token: string, urn: string, modelGuid: string , query :any) => {
  // URL for fetching specific properties using a query
  const url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/metadata/${modelGuid}/properties:query`;

  try {
      // Send a POST request to fetch specific properties
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`, // Include access token for authentication
              'Content-Type': 'application/json' // Specify content type as JSON
          },
          body: JSON.stringify(query) // Convert query object to JSON string and include in the request body
      });

      // If the request was not successful, throw an error
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse and return the response body as JSON
      const data = await response.json();
      console.log("Extracted specific properties:", data); // Log fetched specific properties data
      return data;
  } catch (error) {
      // Handle errors
      console.error('Error fetching specific properties:', error);
      return null;
  }
};
