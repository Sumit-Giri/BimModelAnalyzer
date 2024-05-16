// Function to upload a file to a specific bucket in the Autodesk Forge API
export async function uploadFileToBucket(
  file: File, // The file to be uploaded
  accessToken: string, // Access token for authentication
  bucketKey: string // Bucket key where the file will be uploaded
): Promise<any> {
  const url = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${encodeURIComponent(
    file.name
  )}`;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include access token for authentication
        "Content-Type": "application/octet-stream", // Specify content type
      },
      body: file, // Include the file in the request body
    });

    // If the request was not successful, throw an error
    if (!response.ok) {
      throw new Error("Failed to upload file to bucket");
    }

    // Parse and return the response body as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors
    console.error("Failed to upload file to bucket:", error);
    throw error;
  }
}

// Function to check if a file exists in a specific bucket in the Autodesk Forge API
export async function checkFileUploaded(
  bucketKey: string, // Bucket key where the file is located
  objectName: string, // Name of the file
  accessToken: string // Access token for authentication
): Promise<any> {
  const url = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/objects/${objectName}`;

  // Headers for the request
  const headers = {
    "Content-Type": "application/json", // Specify content type
    Authorization: `Bearer ${accessToken}`, // Include access token for authentication
  };

  try {
    // Send a GET request to check if the file exists
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    // If the request was not successful, throw an error
    if (!response.ok) {
      if (response.status === 404) {
        console.log("File not found."); // Log a message if the file is not found
        return null;
      }
      throw new Error("Error checking file: " + response.statusText);
    }

    // Return the response
    return response;
  } catch (error) {
    // Handle errors
    console.error("Failed to check if file is uploaded:", error);
    return null;
  }
}
