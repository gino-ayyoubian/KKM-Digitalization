// Dynamic loader for locale messages. Keeps explicit imports so bundlers create separate chunks.
// Add new locales by adding a new case and a JSON file under src/locales.
export type Messages = Record<string, string>;

export async function loadMessages(locale: string): Promise<Messages> {
  switch (locale) {
    case "fa":
      return (await import(/* webpackChunkName: "locale-fa" */ "../locales/fa.json")).default;
    case "ku":
      return (await import(/* webpackChunkName: "locale-ku" */ "../locales/ku.json")).default;
    case "ar":
      return (await import(/* webpackChunkName: "locale-ar" */ "../locales/ar.json")).default;
    case "en":
    default:
      return (await import(/* webpackChunkName: "locale-en" */ "../locales/en.json")).default;
  }
}
