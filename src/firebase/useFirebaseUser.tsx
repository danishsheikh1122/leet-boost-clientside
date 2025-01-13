import { useState, useEffect } from 'react'
import { browserLocalPersistence, onAuthStateChanged, setPersistence, User } from 'firebase/auth'  // Import User type
import { sendToBackground } from '@plasmohq/messaging'
import { auth } from './firebaseClient'

export default function useFirebaseUser() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Error setting persistence: ", error)
    })
  }, [])

  const onLogout = async () => {
    setIsLoading(true)
    if (user) {
      await auth.signOut()
      await sendToBackground({
        name: 'removeAuth',
        body: {},
      })
    }
  }

  const onLogin = () => {
    if (!user) return

    const uid = user.uid

    user.getIdToken(true).then(async (token) => {
      await sendToBackground({
        name: 'saveAuth',
        body: {
          token,
          uid,
          refreshToken: user.refreshToken,
        },
      })
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false)
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      onLogin()
    }
  }, [user])

  return {
    isLoading,
    user,
    onLogin,
    onLogout,
  }
}
