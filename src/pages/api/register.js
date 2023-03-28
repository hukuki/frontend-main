import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../utils/firebase/auth"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();
  try {
    const {email, password} = req.body;
    const response = await createUserWithEmailAndPassword(auth, email, password)
  } catch (err) {
    console.log(err)
  }
}
