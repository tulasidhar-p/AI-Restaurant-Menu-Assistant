/**
 * Uploads a restaurant menu PDF to the backend.
 * 
 * @param {File} file - The PDF file to upload.
 * @returns {Promise<Object>} The parsed backend response.
 */
export async function uploadMenu(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://127.0.0.1:8000/upload', {
    method: 'POST',
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
  const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(question)}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Search failed with status: ${response.status}`);
  }

  return response.json();
}
