const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.send(400).send('Invalid operation');
  try {
    const { spaceId, accessToken } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/spaces/${spaceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
    res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
