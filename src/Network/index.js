import apis from "./apis";
async function fetchAPI({ url, method = "GET" }) {
  return await fetch(url, { method })
    .then((res) => res.json())
    .catch((err) => err)
    .finally((res) => res);
}
export { fetchAPI, apis };
