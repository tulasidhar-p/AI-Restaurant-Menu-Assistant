const API_URL = import.meta.env.VITE_API_URL;

/**
 * Uploads a restaurant menu PDF to the backend.
 *
 * @param {File} file - The PDF file to upload.
 * @returns {Promise<Object>} The parsed backend response.
 */
export async function uploadMenu(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed with status: ${response.status}`);
  }

  return response.json();
}

/**
 * Searches the uploaded menu and gets an AI answer.
 *
 * @param {string} question - The user's query/question.
 * @returns {Promise<Object>} The parsed backend response.
 */
export async function askQuestion(question) {
  const response = await fetch(
    `${API_URL}/search?query=${encodeURIComponent(question)}`
  );

  if (!response.ok) {
    throw new Error(`Search failed with status: ${response.status}`);
  }

  return response.json();
}