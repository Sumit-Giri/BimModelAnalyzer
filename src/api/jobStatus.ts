// Function to check the status of a translation job in the Autodesk Forge API
export async function checkJobStatus(
  urn: string, // URN of the translated file
  accessToken: string, // Access token for authentication
  callback: (urn: string) => void // Callback function to be executed when job is successful
): Promise<void> {
  // URL for fetching manifest status
  const url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/manifest`;

  // Send a GET request to fetch manifest status
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include access token for authentication
    },
  });

  // Parse the response body as JSON
  const data = await response.json();

  // Check the status of the translation job
  if (data.status === "success") {
    // If the status is success, execute the callback function with the URN
    callback(urn);
  } else if (data.status === "inprogress") {
    // If the status is in progress, retry after a delay
    setTimeout(() => checkJobStatus(urn, accessToken, callback), 1000); // Retry after 1 second (adjust as needed)
  } else {
    // If the status is neither success nor in progress, throw an error
    throw new Error("Translation failed with status " + data.status);
  }
}
