/**
 * Good Dog Spa - Mock Authentication Service
 * Simulates Firebase Auth using localStorage for demo purposes
 */

const MockAuth = (function() {
    const STORAGE_KEY = 'gooddogspa_auth';
    const USERS_KEY = 'gooddogspa_users';
    
    // Demo users (pre-seeded)
    const defaultUsers = [
        {
            uid: 'demo-user-001',
            email: 'demo@gooddogspa.co.nz',
            password: 'demo123',
            displayName: 'Joel Tempero',
            role: 'member',
            phone: '0204 023 9009',
            address: '123 Dog Lane, Wigram',
            createdAt: '2024-06-15T10:00:00Z'
        },
        {
            uid: 'demo-admin-001',
            email: 'admin@gooddogspa.co.nz',
            password: 'admin123',
            displayName: 'Spa Admin',
            role: 'admin',
            phone: '03 929 0987',
            createdAt: '2024-01-01T09:00:00Z'
        },
        {
            uid: 'demo-user-002',
            email: 'sarah@example.com',
            password: 'password123',
            displayName: 'Sarah Mitchell',
            role: 'member',
            phone: '027 555 1234',
            address: '45 Puppy Place, Hornby',
            createdAt: '2024-07-08T14:30:00Z'
        },
        {
            uid: 'demo-user-003',
            email: 'mike@example.com',
            password: 'password123',
            displayName: 'Mike Johnson',
            role: 'member',
            phone: '021 888 7777',
            address: '78 Bark Street, Riccarton',
            createdAt: '2024-09-25T11:00:00Z'
        },
        {
            uid: 'demo-user-004',
            email: 'emma@example.com',
            password: 'password123',
            displayName: 'Emma Williams',
            role: 'member',
            phone: '022 333 4444',
            address: '92 Woof Way, Ilam',
            createdAt: '2024-06-05T16:00:00Z'
        }
    ];
    
    // Initialize users in localStorage if not present
    function initUsers() {
        const existingUsers = localStorage.getItem(USERS_KEY);
        if (!existingUsers) {
            localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
        }
    }
    
    // Get all users
    function getUsers() {
        initUsers();
        return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    }
    
    // Save users
    function saveUsers(users) {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    
    // Get current session
    function getSession() {
        const session = localStorage.getItem(STORAGE_KEY);
        return session ? JSON.parse(session) : null;
    }
    
    // Save session
    function saveSession(user) {
        const sessionUser = { ...user };
        delete sessionUser.password; // Don't store password in session
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
    }
    
    // Clear session
    function clearSession() {
        localStorage.removeItem(STORAGE_KEY);
    }
    
    // Public API
    return {
        /**
         * Sign in with email and password
         */
        signIn: function(email, password) {
            return new Promise((resolve, reject) => {
                // Simulate network delay
                setTimeout(() => {
                    const users = getUsers();
                    const user = users.find(u => 
                        u.email.toLowerCase() === email.toLowerCase() && 
                        u.password === password
                    );
                    
                    if (user) {
                        saveSession(user);
                        resolve({
                            uid: user.uid,
                            email: user.email,
                            displayName: user.displayName,
                            role: user.role,
                            phone: user.phone
                        });
                    } else {
                        reject({ code: 'auth/invalid-credentials', message: 'Invalid email or password' });
                    }
                }, 500);
            });
        },
        
        /**
         * Sign up new user
         */
        signUp: function(email, password, displayName, phone = '') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const users = getUsers();
                    
                    // Check if email already exists
                    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
                        reject({ code: 'auth/email-already-in-use', message: 'Email already registered' });
                        return;
                    }
                    
                    // Create new user
                    const newUser = {
                        uid: 'user-' + Date.now(),
                        email: email,
                        password: password,
                        displayName: displayName,
                        role: 'member',
                        phone: phone,
                        createdAt: new Date().toISOString()
                    };
                    
                    users.push(newUser);
                    saveUsers(users);
                    saveSession(newUser);
                    
                    resolve({
                        uid: newUser.uid,
                        email: newUser.email,
                        displayName: newUser.displayName,
                        role: newUser.role
                    });
                }, 500);
            });
        },
        
        /**
         * Sign out current user
         */
        signOut: function() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    clearSession();
                    resolve();
                }, 200);
            });
        },
        
        /**
         * Get current user
         */
        getCurrentUser: function() {
            return getSession();
        },
        
        /**
         * Check if user is logged in
         */
        isLoggedIn: function() {
            return getSession() !== null;
        },
        
        /**
         * Check if current user is admin
         */
        isAdmin: function() {
            const user = getSession();
            return user && user.role === 'admin';
        },
        
        /**
         * Update user profile
         */
        updateProfile: function(updates) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const session = getSession();
                    if (!session) {
                        reject({ code: 'auth/no-user', message: 'No user logged in' });
                        return;
                    }
                    
                    const users = getUsers();
                    const userIndex = users.findIndex(u => u.uid === session.uid);
                    
                    if (userIndex === -1) {
                        reject({ code: 'auth/user-not-found', message: 'User not found' });
                        return;
                    }
                    
                    // Update user
                    users[userIndex] = { ...users[userIndex], ...updates };
                    saveUsers(users);
                    saveSession(users[userIndex]);
                    
                    resolve(users[userIndex]);
                }, 300);
            });
        },
        
        /**
         * Send password reset (mock - just logs to console)
         */
        sendPasswordReset: function(email) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const users = getUsers();
                    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
                    
                    if (user) {
                        console.log(`[DEMO] Password reset email would be sent to: ${email}`);
                        resolve();
                    } else {
                        reject({ code: 'auth/user-not-found', message: 'No account found with this email' });
                    }
                }, 500);
            });
        },
        
        /**
         * Reset demo data
         */
        resetDemo: function() {
            localStorage.removeItem(USERS_KEY);
            localStorage.removeItem(STORAGE_KEY);
            initUsers();
            console.log('[DEMO] Auth data reset to defaults');
        },
        
        /**
         * Get demo credentials (for login page hints)
         */
        getDemoCredentials: function() {
            return {
                member: { email: 'demo@gooddogspa.co.nz', password: 'demo123' },
                admin: { email: 'admin@gooddogspa.co.nz', password: 'admin123' }
            };
        }
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockAuth;
}
