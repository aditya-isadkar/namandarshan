import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    email: string;
    name?: string;
    role?: 'admin' | 'user';
    password?: string; // For mock auth only
}

interface AuthContextType {
    isUserAuthenticated: boolean;
    isAdminAuthenticated: boolean;
    user: User | null; // Public user
    admin: User | null; // Admin user
    isLoading: boolean;
    loginUser: (email: string, password?: string) => boolean;
    signupUser: (email: string, password?: string, name?: string) => boolean;
    loginAdmin: (email: string, password?: string) => boolean;
    logoutUser: () => void;
    logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [admin, setAdmin] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Initialize registered users from localStorage
    const getRegisteredUsers = (): User[] => {
        const users = localStorage.getItem('registeredUsers');
        return users ? JSON.parse(users) : [];
    };

    useEffect(() => {
        // Check User localStorage on mount
        const storedUserAuth = localStorage.getItem('isUserAuthenticated');
        const storedUser = localStorage.getItem('user');

        if (storedUserAuth === 'true' && storedUser) {
            setIsUserAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }

        // Check Admin localStorage on mount
        const storedAdminAuth = localStorage.getItem('isAdminAuthenticated');
        const storedAdmin = localStorage.getItem('admin');

        if (storedAdminAuth === 'true' && storedAdmin) {
            setIsAdminAuthenticated(true);
            setAdmin(JSON.parse(storedAdmin));
        }

        setIsLoading(false);
    }, []);

    const signupUser = (email: string, password?: string, name?: string): boolean => {
        if (email.toLowerCase().includes('admin@namandarshan.com')) return false; // Block admin email from user signup

        const users = getRegisteredUsers();
        if (users.find(u => u.email === email)) {
            return false; // User already exists
        }

        const newUser: User = {
            email,
            name: name || email.split('@')[0],
            role: 'user',
            password
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

        // Auto login after signup
        loginUser(email, password);
        return true;
    };

    const loginUser = (email: string, password?: string): boolean => {
        if (email.toLowerCase() === 'admin@namandarshan.com') return false; // Block admin email from user login

        const users = getRegisteredUsers();
        const foundUser = users.find(u => u.email === email);

        if (foundUser && foundUser.password === password) {
            const { password: _, ...safeUser } = foundUser;
            setUser(safeUser);
            setIsUserAuthenticated(true);
            localStorage.setItem('isUserAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(safeUser));
            return true;
        }
        return false;
    };

    const loginAdmin = (email: string, password?: string): boolean => {
        if (email.toLowerCase() === 'admin@namandarshan.com') {
            if (password !== 'admin123') return false;

            const adminUser: User = {
                email,
                name: 'Admin',
                role: 'admin'
            };
            setAdmin(adminUser);
            setIsAdminAuthenticated(true);
            localStorage.setItem('isAdminAuthenticated', 'true');
            localStorage.setItem('admin', JSON.stringify(adminUser));
            return true;
        }
        return false;
    };

    const logoutUser = () => {
        setIsUserAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isUserAuthenticated');
        localStorage.removeItem('user');
    };

    const logoutAdmin = () => {
        setIsAdminAuthenticated(false);
        setAdmin(null);
        localStorage.removeItem('isAdminAuthenticated');
        localStorage.removeItem('admin');
    };

    return (
        <AuthContext.Provider value={{
            isUserAuthenticated,
            isAdminAuthenticated,
            user,
            admin,
            isLoading,
            loginUser,
            signupUser,
            loginAdmin,
            logoutUser,
            logoutAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
