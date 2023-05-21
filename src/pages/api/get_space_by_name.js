const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid operation',
        data: null,
      })
    );
  try {
    const { accessToken, query } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/spaces`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    const spaces = data.filter((space) => {
      if (space.name.toLowerCase().includes(query)) {
        return true;
      }
    });
    console.log(spaces);
    res.send(
      JSON.stringify({
        error: null,
        data: spaces,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).send(
      JSON.stringify({
        error: err,
        data: null,
      })
    );
  }
}
