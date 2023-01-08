import { useState, useEffect, createContext } from "react";
import axios from "axios";
const AuthContext = createContext()

function authProviderWrapper() {
    const [isLoggedIn, setIsLoggedIn] = useState()
    const [isLoading, setIsLoading] = useState()
    const [user, setUser] = useState()
}