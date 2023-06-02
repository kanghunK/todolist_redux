export async function addFetcher() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("add complete!");
      resolve(true);
    }, 500);
  }).catch(() => {
    console.error("add failed!");
  });
}

export async function deleteFetcher() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("delete complete!");
      resolve(true);
    }, 500);
  }).catch(() => {
    console.error("add failed!");
  });
}

export async function editFetcher() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("edit complete!");
      resolve(true);
    }, 500);
  }).catch(() => {
    console.error("edit failed!");
  });
}
