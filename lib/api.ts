export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Get All Income Data
export const fetchIncomeEntries = async () => {
  const response = await fetch(`${API_BASE_URL}/incomes`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch income entries");
  }

  return response.json();
};

// Add Income
export const addIncomeEntry = async (entry: any) => {
  const response = await fetch(`${API_BASE_URL}/incomes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error("Failed to add income entry");
  }

  return response.json();
};

// Edit Income
export const editIncomeEntry = async (id: string, entry: any) => {
  const response = await fetch(`${API_BASE_URL}/incomes/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error("Failed to update income entry");
  }

  return response.json();
};

// Delete Income
export const deleteIncomeEntry = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/incomes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Failed to delete income entry");
  }

  return response.json();
};
