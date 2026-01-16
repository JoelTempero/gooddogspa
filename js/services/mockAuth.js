/**
 * Good Dog Spa - Mock Authentication Service
 * Simulates Firebase Auth using localStorage for demo purposes
 */

const MockAuth = (function() {
    const STORAGE_KEY = 'gooddogspa_auth';
    const USERS_KEY = 'gooddogspa_users';
    const AUTH_VERSION_KEY = 'gooddogspa_auth_version';
    const CURRENT_VERSION = '2.0.2'; // Increment this to force user data refresh
    
    // Check version and reset users if needed
    function checkVersion() {
        const storedVersion = localStorage.getItem(AUTH_VERSION_KEY);
        if (storedVersion !== CURRENT_VERSION) {
            console.log('Auth version changed, resetting user data...');
            localStorage.removeItem(USERS_KEY);
            localStorage.removeItem(STORAGE_KEY); // Also clear current session
            localStorage.setItem(AUTH_VERSION_KEY, CURRENT_VERSION);
        }
    }
    
    // Run version check immediately
    checkVersion();
    
    // Demo users (pre-seeded)
    const defaultUsers = [
        { uid: 'demo-user-001', email: 'demo@gooddogspa.co.nz', password: 'demo123', displayName: 'Joel Tempero', role: 'member', phone: '0204 023 9009', address: '15 Dogtrot Lane, Wigram', createdAt: '2024-06-15T10:00:00Z' },
        { uid: 'demo-admin-001', email: 'admin@gooddogspa.co.nz', password: 'admin123', displayName: 'Spa Admin', role: 'admin', phone: '03 929 0987', createdAt: '2024-01-01T09:00:00Z' },
        { uid: 'user-002', email: 'sarah.mitchell@email.com', password: 'password123', displayName: 'Sarah Mitchell', role: 'member', phone: '027 555 1234', address: '45 Puppy Place, Hornby', createdAt: '2024-07-08T14:30:00Z' },
        { uid: 'user-003', email: 'mike.johnson@email.com', password: 'password123', displayName: 'Mike Johnson', role: 'member', phone: '021 888 7777', address: '78 Bark Street, Riccarton', createdAt: '2024-09-25T11:00:00Z' },
        { uid: 'user-004', email: 'emma.williams@email.com', password: 'password123', displayName: 'Emma Williams', role: 'member', phone: '022 333 4444', address: '92 Woof Way, Ilam', createdAt: '2024-06-05T16:00:00Z' },
        { uid: 'user-005', email: 'david.brown@email.com', password: 'password123', displayName: 'David Brown', role: 'member', phone: '027 111 2222', address: '12 Fetch Road, Papanui', createdAt: '2024-05-20T09:00:00Z' },
        { uid: 'user-006', email: 'lisa.taylor@email.com', password: 'password123', displayName: 'Lisa Taylor', role: 'member', phone: '021 333 4444', address: '88 Collar Close, Merivale', createdAt: '2024-08-12T11:30:00Z' },
        { uid: 'user-007', email: 'james.wilson@email.com', password: 'password123', displayName: 'James Wilson', role: 'member', phone: '022 555 6666', address: '34 Paw Print Ave, Fendalton', createdAt: '2024-04-18T14:00:00Z' },
        { uid: 'user-008', email: 'rachel.davis@email.com', password: 'password123', displayName: 'Rachel Davis', role: 'member', phone: '027 777 8888', address: '67 Bone Boulevard, Halswell', createdAt: '2024-07-22T10:15:00Z' },
        { uid: 'user-009', email: 'chris.martin@email.com', password: 'password123', displayName: 'Chris Martin', role: 'member', phone: '021 999 0000', address: '23 Leash Lane, Burnside', createdAt: '2024-03-10T16:45:00Z' },
        { uid: 'user-010', email: 'amanda.white@email.com', password: 'password123', displayName: 'Amanda White', role: 'member', phone: '022 111 3333', address: '56 Kennel Court, Cashmere', createdAt: '2024-09-05T08:30:00Z' },
        { uid: 'user-011', email: 'tom.harris@email.com', password: 'password123', displayName: 'Tom Harris', role: 'member', phone: '027 444 5555', address: '91 Tail Wag Terrace, St Albans', createdAt: '2024-06-28T13:00:00Z' },
        { uid: 'user-012', email: 'nicole.clark@email.com', password: 'password123', displayName: 'Nicole Clark', role: 'member', phone: '021 666 7777', address: '15 Sniff Street, Addington', createdAt: '2024-08-30T15:20:00Z' },
        { uid: 'user-013', email: 'ben.anderson@email.com', password: 'password123', displayName: 'Ben Anderson', role: 'member', phone: '022 888 9999', address: '42 Howl Highway, Sockburn', createdAt: '2024-05-14T11:00:00Z' },
        { uid: 'user-014', email: 'kate.robinson@email.com', password: 'password123', displayName: 'Kate Robinson', role: 'member', phone: '027 222 3333', address: '73 Sit Stay Road, Spreydon', createdAt: '2024-07-01T09:45:00Z' },
        { uid: 'user-015', email: 'peter.lee@email.com', password: 'password123', displayName: 'Peter Lee', role: 'member', phone: '021 444 5556', address: '28 Good Boy Grove, Sydenham', createdAt: '2024-04-25T14:30:00Z' },
        { uid: 'user-016', email: 'jenny.thompson@email.com', password: 'password123', displayName: 'Jenny Thompson', role: 'member', phone: '022 666 7778', address: '84 Treat Trail, Linwood', createdAt: '2024-09-18T10:00:00Z' },
        { uid: 'user-017', email: 'mark.scott@email.com', password: 'password123', displayName: 'Mark Scott', role: 'member', phone: '027 888 9990', address: '19 Walkies Way, Avonhead', createdAt: '2024-06-10T16:15:00Z' },
        { uid: 'user-018', email: 'helen.king@email.com', password: 'password123', displayName: 'Helen King', role: 'member', phone: '021 111 2223', address: '51 Roll Over Road, Bishopdale', createdAt: '2024-08-05T12:30:00Z' },
        { uid: 'user-019', email: 'steve.wright@email.com', password: 'password123', displayName: 'Steve Wright', role: 'member', phone: '022 333 4445', address: '37 Belly Rub Blvd, Bryndwr', createdAt: '2024-03-28T08:00:00Z' },
        { uid: 'user-020', email: 'olivia.green@email.com', password: 'password123', displayName: 'Olivia Green', role: 'member', phone: '027 555 6667', address: '62 Fetch Circle, Casebrook', createdAt: '2024-07-15T11:45:00Z' },
        { uid: 'user-021', email: 'daniel.baker@email.com', password: 'password123', displayName: 'Daniel Baker', role: 'member', phone: '021 777 8889', address: '95 Pawsome Place, Northwood', createdAt: '2024-05-02T15:00:00Z' },
        { uid: 'user-022', email: 'michelle.hill@email.com', password: 'password123', displayName: 'Michelle Hill', role: 'member', phone: '022 999 0001', address: '11 Biscuit Bay, Belfast', createdAt: '2024-09-28T09:30:00Z' },
        { uid: 'user-023', email: 'andrew.moore@email.com', password: 'password123', displayName: 'Andrew Moore', role: 'member', phone: '027 111 2224', address: '46 Zoomies Zone, Redwood', createdAt: '2024-04-08T13:15:00Z' },
        { uid: 'user-024', email: 'sophie.young@email.com', password: 'password123', displayName: 'Sophie Young', role: 'member', phone: '021 333 4446', address: '79 Pupper Path, Northcote', createdAt: '2024-08-20T10:45:00Z' },
        { uid: 'user-025', email: 'ryan.allen@email.com', password: 'password123', displayName: 'Ryan Allen', role: 'member', phone: '022 555 6668', address: '24 Furry Friend Ave, Mairehau', createdAt: '2024-06-22T14:00:00Z' },
        { uid: 'user-026', email: 'megan.hall@email.com', password: 'password123', displayName: 'Megan Hall', role: 'member', phone: '027 777 8890', address: '58 Wag Lane, Shirley', createdAt: '2024-05-30T11:30:00Z' },
        { uid: 'user-027', email: 'paul.walker@email.com', password: 'password123', displayName: 'Paul Walker', role: 'member', phone: '021 999 0002', address: '83 Canine Court, Richmond', createdAt: '2024-07-28T08:15:00Z' },
        { uid: 'user-028', email: 'anna.turner@email.com', password: 'password123', displayName: 'Anna Turner', role: 'member', phone: '022 111 2225', address: '16 Pup Paradise, Dallington', createdAt: '2024-04-15T16:30:00Z' },
        { uid: 'user-029', email: 'jason.cooper@email.com', password: 'password123', displayName: 'Jason Cooper', role: 'member', phone: '027 333 4447', address: '49 Doggo Drive, Aranui', createdAt: '2024-09-10T12:00:00Z' },
        { uid: 'user-030', email: 'claire.evans@email.com', password: 'password123', displayName: 'Claire Evans', role: 'member', phone: '021 555 6669', address: '72 Woofer Way, Bromley', createdAt: '2024-06-05T09:45:00Z' }
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
