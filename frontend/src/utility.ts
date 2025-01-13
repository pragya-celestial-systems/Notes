import axios from "axios";

function detectLangauge() {}

export async function translate() {
  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: "how are you",
        source: "auto",
        target: "hi",
        format: "text",
        alternatives: 3,
        api_key: "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await res.json());
  } catch (error) {
    console.log(error);
  }
}

detectLangauge();

export async function getOrSetData(
  endpoint: string,
  method: string,
  data: object | string = {},
) {
  try {
    const baseUrl: string | undefined = process.env.REACT_APP_BASE_URL;
    if (!baseUrl) throw new Error("Base URL is undefined.");

    let response;
    switch (method) {
    case "POST":
      response = await axios.post(`${baseUrl}/${endpoint}`, data, {
        headers: {
          "Content-type": "application/json",
        },
      });

      return response.data;

    case "DELETE":
      response = await axios.delete(`${baseUrl}/${endpoint}`);
      return response.data;

    case "PATCH":
      response = await axios.patch(`${baseUrl}/${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
      return response.data;

    default:
      response = await axios.get(`${baseUrl}/${endpoint}`);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't fetch data.");
  }
}