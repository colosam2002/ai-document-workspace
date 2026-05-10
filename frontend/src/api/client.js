const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("VITE_API_URL is not configured");
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

// Auth

export async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}

export async function loginUser(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Could not fetch current user");
}

// Documents

export async function getDocuments() {
  const response = await fetch(`${API_URL}/documents`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Could not fetch documents");
}

export async function getDocumentDetail(documentId) {
  const response = await fetch(`${API_URL}/documents/${documentId}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Could not fetch document detail");
}

export async function uploadDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Document upload failed");
  }

  return response.json();
}

export async function deleteDocument(documentId) {
  const response = await fetch(`${API_URL}/documents/${documentId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Could not delete document");
}

// AI / RAG

export async function askDocuments(question, topK = 5, documentId = null) {
  const body = {
    question,
    top_k: topK,
  };

  if (documentId) {
    body.document_id = Number(documentId);
  }

  const response = await fetch(`${API_URL}/documents/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response, "Could not ask documents");
}

export async function generateDocumentSummary(documentId) {
  const response = await fetch(`${API_URL}/documents/${documentId}/summary`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  return handleResponse(response, "Could not generate document summary");
}

async function handleResponse(response, errorMessage) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
}