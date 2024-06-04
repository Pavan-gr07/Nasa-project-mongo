const API_URL = "http://localhost:9000";
// const API_URL = "https://nasa-project-woad.vercel.app/";

async function httpGetPlanets() {
  const res = await fetch(`${API_URL}/planets`);
  return res.json();
}

async function httpGetLaunches() {
  const res = await fetch(`${API_URL}`);

  const fetchedLaunches = await res.json();
  return fetchedLaunches.sort((a, b) => {
    return a.updatedAt - b.updatedAt;
  });
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/?id=` + id, {
      method: "put",
      headers: { "Content-type": "application/json" },
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
