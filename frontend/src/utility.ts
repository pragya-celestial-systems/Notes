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
