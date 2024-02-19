"use server";
export async function getAllData() {
  const response = await fetch(
    "https://sentinel-safe-backend.vercel.app/locmetrics",
    {
      method: "GET",
      cache: "default",
      next: { revalidate: 3600 },
    }
  );
  return response.json();
}
