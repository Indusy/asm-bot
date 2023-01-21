const API_URL = "https://apptracker-dev.cn2.tiers.top";

export async function searchByKw(kw: string) {
  const res = await fetch(
    API_URL +
      "/api/appinfo" +
      "?" +
      new URLSearchParams({
        per: "10",
        page: "1",
        q: kw,
      })
  );

  const json = await res.json();
  return json;
}

export async function getIcon(packageName: string) {
  const res = await fetch(
    API_URL +
      "/api/icon" +
      "?" +
      new URLSearchParams({
        packageName,
      })
  );

  const blob = await res.blob();
  return blob;
}

export function searchByRegex() {}
