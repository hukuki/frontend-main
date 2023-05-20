const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).send({
      error: 'Invalid operation',
      data: null,
    });
  try {
    const { accessToken, documentId } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/get_bookmarks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    for (let bookmark in data) {
      if (bookmark.document._id === documentId) {
        res.send(
          JSON.stringify({
            error: null,
            data: {
              isBookmarked: true,
              bookmarkId: bookmark._id,
            },
          })
        );
      }
    }
    res.send(
      JSON.stringify({
        error: null,
        data: {
          isBookmarked: false,
        },
      })
    );
  } catch (error) {
    res.status(500).send({
      error: error,
      data: null,
    });
  }
}
