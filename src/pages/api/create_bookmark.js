const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  try {
    const { documentId, accessToken } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/bookmarks`, {
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
    res.send(
      JSON.stringify({
        error: null,
        data: data,
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
