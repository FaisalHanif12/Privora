import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  fullName: string;
  email: string;
  profileImage?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on app start
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // For development, we'll use the known user data from the database
        // In production, this would fetch from the backend using stored token
        const mockUserData: User = {
          fullName: 'Faisal',
          email: 'mehrfaisall11@gmail.com',
        };
        
        setUser(mockUserData);
        
        // TODO: In production, uncomment this to fetch real user data
        // const token = await getStoredToken(); // Get from secure storage
        // if (token) {
        //   const response = await apiService.getCurrentUser(token);
        //   if (response.success && response.data) {
        //     setUser({
        //       fullName: response.data.fullName,
        //       email: response.data.email,
        //       profileImage: response.data.profileImage,
        //     });
        //   }
        // }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      
      // TODO: In production, also update the backend
      // if (updates.profileImage || updates.fullName || updates.email) {
      //   // Update backend with new user data
      //   updateUserInBackend(updatedUser);
      // }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}; 