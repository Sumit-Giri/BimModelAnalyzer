// Function to initiate file translation using the Autodesk Forge API
export async function translateFile(
  objectId: string, // Object ID of the file to be translated
  accessToken: string // Access token for authentication
): Promise<any> {
  // Convert object ID to base64 and remove padding characters
  const urn = btoa(objectId).replace(/=/g, "");
  
  // API endpoint for translation job
  const url = "https://developer.api.autodesk.com/modelderivative/v2/designdata/job";
  
  // Payload for translation job
  const payload = {
    input: {
      urn, // URN of the file to be translated
    },
    output: {
      formats: [
        {
          type: "svf", // Output format: SVF (Simple Viewing Format)
          views: ["2d", "3d"], // Views to include: 2D and 3D
        },
      ],
    },
  };

  // Send POST request to initiate translation job
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`, // Include access token in headers for authentication
      "Content-Type": "application/json", // Specify content type as JSON
    },
    body: JSON.stringify(payload), // Convert payload to JSON string
  });

  // Check if the request was successful
  if (!response.ok) throw new Error("Failed to start translation job");
  
  // Parse and return the response body as JSON
  return response.json();
}
