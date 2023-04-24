const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(400).send('Invalid operation');
  try {
    const { documentId, accessToken } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/documents/${documentId}`, {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    });
    const data = await response.json();
    console.log(data);
    res.send(JSON.stringify(data));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
