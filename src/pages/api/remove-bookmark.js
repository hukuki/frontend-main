export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.status(405).send('Invalid operation');
  }
  try {
    const { documentId, accessToken } = JSON.parse(req.body);
    const res = await fetch(`http://localhost:8080/bookmarks/${documentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
}
