const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid operation',
        data: null,
      })
    );
  }
  const { name, description, people, accessToken } = JSON.parse(req.body);
  try {
    let response = await fetch(`${backend_url}/spaces`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let data = await response.json();

    response = await fetch(`${backend_url}/spaces/${data._id}/users`, {
      method: 'POST',
      body: JSON.stringify({
        people: people,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    data = await response.json();
    console.log(data);
    res.send(
      JSON.stringify({
        data,
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(
      JSON.stringify({
        data: null,
        error,
      })
    );
  }
}
