export async function fetchAccount() {
  const res = await fetch("/api/v1/user/account");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch account");
  return data;
}

export async function updateAccountField(field: string, value: string) {
  const res = await fetch("/api/v1/user/account", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to update field");
  return data;
}
