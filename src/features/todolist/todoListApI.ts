export function addFetcher() {
  return new Promise(() => {
    setTimeout(() => console.log("add complete!"), 500);
  });
}

export function deleteFetcher() {
  return new Promise(() => {
    setTimeout(() => console.log("delete complete!"), 500);
  });
}
