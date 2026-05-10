const API_URL = "http://127.0.0.1:8000";

export async function registerUser(username, password) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
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
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch current user");
  }

  return response.json();
}

export async function uploadDocument(file) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Document upload failed");
  }

  return response.json();
}

export async function getDocuments() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/documents`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch documents");
  }

  return response.json();
}

export async function deleteDocument(documentId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/documents/${documentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not delete document");
  }

  return response.json();
}

export async function getDocumentDetail(documentId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/documents/${documentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch document detail");
  }

  return response.json();
}

export async function askDocuments(question, topK = 5) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/documents/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      question: question,
      top_k: topK,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not ask documents");
  }

  return response.json();
}