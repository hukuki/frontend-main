const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).send('Invalid operation');
  try {
    const { accessToken } = JSON.parse(req.body);
    console.log(accessToken);
    const response = await fetch(`${backend_url}/spaces`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    res.send(
      JSON.stringify({
        error: null,
        data,
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
