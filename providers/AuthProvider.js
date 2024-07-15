import React, { createContext, useEffect, useState } from "react"
import authService from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getProfile } from '../services/profileService';


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

  async function login(email, password) {
    setLoading(true);
    const _user = await authService(email, password)

    setUser(_user)
    if (_user) {
      await AsyncStorage.setItem("@authData", JSON.stringify(_user))
      const profile = await getProfile();
      await AsyncStorage.setItem("@user", profile)
    }

    setLoading(false)

  }

  async function logout() {
    setLoading(true);
    
    await AsyncStorage.removeItem('@authData');

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