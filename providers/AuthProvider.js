import React, { createContext, useEffect, useState } from "react"
import authService from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  async function loadStorageData() {
    try {
      setLoading(true)

      const authDataSerialize = await AsyncStorage.getItem('@authData');

      if (authDataSerialize) {
        const _authData = JSON.parse(authDataSerialize)
        setUser(_authData)
      }

    } catch (error) {
      console.log("Fail storage data", error)

    } finally {
      setLoading(false)
    }
  }

  async function login(username, password) {
    setLoading(true);
    const _user = await authService(username, password)

    setUser(_user)
    if (_user) {
      await AsyncStorage.setItem("@authData", JSON.stringify(_user))
      console.log({ _user })
    }
    setLoading(false)
  }
  async function logout(username, password) {
    setLoading(true);
    setUser(undefined)
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }