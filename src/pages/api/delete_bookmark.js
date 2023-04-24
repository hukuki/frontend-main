const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).send();
  try {
    const { bookmarkId, accessToken } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.send(
      JSON.stringify({
        error: null,
        data: {},
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
