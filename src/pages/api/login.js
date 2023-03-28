import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";

initAuth()

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();
  try {
    await setAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}
