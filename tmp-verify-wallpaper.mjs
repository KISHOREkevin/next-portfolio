const API = "http://localhost:3000/api/wallpaper";

async function pick() {
  const res = await fetch(API, { cache: "no-store" });
  const json = await res.json();
  return { status: res.status, json };
}

const first = await pick();
const second = await pick();

console.log("call 1 status:", first.status);
console.log("call 1 id:", first.json.photo?.id, "| query:", first.json.photo?.query);
console.log("call 1 url:", first.json.photo?.imageUrl);
console.log("call 1 size:", first.json.photo?.width, "x", first.json.photo?.height);
console.log("call 1 credit:", first.json.photo?.attribution?.photographerName, "/", first.json.photo?.attribution?.licenseName);
console.log("call 2 id:", second.json.photo?.id, "| query:", second.json.photo?.query);
console.log("call 2 url:", second.json.photo?.imageUrl);
console.log("DIFFERENT PHOTO:", first.json.photo?.id !== second.json.photo?.id);

const url = first.json.photo?.imageUrl;
if (url) {
  const head = await fetch(url, { method: "GET", headers: { Origin: "http://localhost:3000", Range: "bytes=0-0" } });
  console.log("image status:", head.status);
  console.log("access-control-allow-origin:", head.headers.get("access-control-allow-origin"));
  console.log("content-type:", head.headers.get("content-type"));
  console.log("content-range:", head.headers.get("content-range"));
}
