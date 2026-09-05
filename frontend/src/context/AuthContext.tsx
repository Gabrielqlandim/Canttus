import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextType{
    estaLogado: boolean;
    logout: ()=> void;
    setEstaLogado: (valor:boolean)=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: {children: ReactNode}){
    const [estaLogado, setEstaLogado] = useState(!!localStorage.getItem('access_token'));

    function logout(){
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setEstaLogado(false);
    }

    return(
        <AuthContext.Provider value={{estaLogado, logout, setEstaLogado}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const contexto = useContext(AuthContext);
    if(!contexto) throw new Error('useAuth precise estar dentro de um AuthProvider');
    return contexto;
}