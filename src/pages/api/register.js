import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/auth"
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();
  try {
    const {email, password} = req.body;
    const response = await createUserWithEmailAndPassword(auth, email, password)
    console.log(response.json())
  } catch (err) {
    console.log(err)
  }
}
