export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  try {
    const { documentId, accessToken } = JSON.parse(req.body);
    const response = await fetch('http://localhost:8080/bookmarks', {
      method: 'POST',
      body: JSON.stringify({
        document: documentId,
      }),
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
