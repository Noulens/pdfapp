import React, { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState<any>({
		user: "",
		edentoken: "",
		id: ""
	})

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext