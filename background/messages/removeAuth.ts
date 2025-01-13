// background/messages/removeAuth.ts
import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const storage = new Storage()
 
    await storage.set("firebaseToken", null)
    await storage.set("firebaseUid", null)
 
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