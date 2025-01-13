// background/messages/saveAuth.ts
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const { token, uid, refreshToken } = req.body
    const storage = new Storage()
 
    await storage.set("firebaseToken", token)
    await storage.set("firebaseUid", uid)
    await storage.set("firebaseRefreshToken", refreshToken)
 
    res.send({
      status: "success"
    })
  } catch (err) {
    console.log("There was an error")
    console.error(err)
    res.send({ err })
  }
}
 
export default handler