export async function load(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(res.status);
      // ? throw Error(res.status.toString());
      return false;
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
}
