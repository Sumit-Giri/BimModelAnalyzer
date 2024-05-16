// Function to check if a bucket exists
export async function checkBucketExists(
  accessToken: string, // Access token for authentication
  bucketKey: string // Name of the bucket to check
): Promise<any> {
  // Construct URL for checking bucket details
  const url = `https://developer.api.autodesk.com/oss/v2/buckets/${bucketKey}/details`;

  // Headers for the request
  const headers = {
    Authorization: `Bearer ${accessToken}`, // Include access token for authentication
    "Content-Type": "application/json", // Specify content type as JSON
  };

  try {
    // Send GET request to check bucket details
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    // If the request was not successful, return null
    if (!response.ok) {
      return null;
    }

    // Parse and return the response body as JSON
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors
    console.error("Failed to check bucket:", error);
    throw error;
  }
}

// Function to create a bucket if it doesn't exist
export const createBucket = async (
  accessToken: string, // Access token for authentication
  bucketKey: string, // Name of the bucket to create
  policyKey: string = "transient" // Policy key for the bucket (default: transient)
): Promise<any> => {
  // Check if the bucket already exists
  const bucketData = await checkBucketExists(accessToken, bucketKey);

  // If the bucket doesn't exist, create it
  if (!bucketData) {
    // Construct URL for creating a bucket
    const url = `https://developer.api.autodesk.com/oss/v2/buckets`;

    // Headers for the request
    const headers = {
      "Content-Type": "application/json", // Specify content type as JSON
      Authorization: `Bearer ${accessToken}`, // Include access token for authentication
    };

    // Body of the request
    const body = JSON.stringify({
      bucketKey, // Name of the bucket
      policyKey, // Policy key for the bucket
    });

    try {
      // Send POST request to create the bucket
      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      // If the request was not successful, throw an error
      if (!response.ok) {
        throw new Error(`Failed to create bucket: ${response.statusText}`);
      }

      // Parse and return the response body as JSON
      const data = await response.json();
      console.log("created bucket: ", data);
      return data;
    } catch (error) {
      // Handle errors
      console.error("Failed to create bucket:", error);
      throw error;
    }
  }
};
