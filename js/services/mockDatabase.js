/**
 * Good Dog Spa - Mock Database Service
 * Simulates Firestore using localStorage for demo purposes
 */

const MockDatabase = (function() {
    const DB_PREFIX = 'gooddogspa_db_';
    
    // Helper to generate dates
    function getFutureDate(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        // Skip weekends
        while (date.getDay() === 0 || date.getDay() === 6) {
            date.setDate(date.getDate() + 1);
        }
        return date.toISOString().split('T')[0];
    }
    
    function getPastDate(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    }
    
    // Default demo data
    const defaultData = {
        dogs: [
            {
                id: 'dog-001',
                ownerId: 'demo-user-001',
                name: 'Sidon',
                breed: 'Golden Retriever',
                age: 1.5,
                weight: 38,
                gender: 'male',
                colour: 'Golden',
                vaccinated: true,
                desexed: true,
                microchipped: true,
                vetName: 'Wigram Vet',
                vetPhone: '03 929 0987',
                medicalNotes: 'Healthy pup, no issues.',
                behaviourNotes: 'Very friendly, loves other dogs and people. Good recall. Enjoys swimming and fetch.',
                emergencyContact: 'Joel Tempero - 0204 023 9009',
                photo: 'https://tempero.nz/assets/images/slideshow10-ff574a56.jpg?v=4a5a960a',
                assessmentPassed: true,
                assessmentDate: '2024-08-20',
                size: 'large',
                createdAt: '2024-08-15T10:00:00Z'
            },
            {
                id: 'dog-002',
                ownerId: 'demo-user-002',
                name: 'Bella',
                breed: 'Labrador',
                age: 3,
                weight: 28,
                gender: 'female',
                colour: 'Chocolate',
                vaccinated: true,
                desexed: true,
                microchipped: true,
                vetName: 'Wigram Vet',
                vetPhone: '03 929 0987',
                medicalNotes: 'Mild hip dysplasia - benefits from hydrotherapy.',
                behaviourNotes: 'Very social, loves water. Plays well with all sizes.',
                emergencyContact: 'Sarah Mitchell - 027 555 1234',
                photo: null,
                assessmentPassed: true,
                assessmentDate: '2024-07-15',
                size: 'large',
                createdAt: '2024-07-10T09:00:00Z'
            },
            {
                id: 'dog-003',
                ownerId: 'demo-user-002',
                name: 'Max',
                breed: 'French Bulldog',
                age: 4,
                weight: 12,
                gender: 'male',
                colour: 'Fawn',
                vaccinated: true,
                desexed: false,
                microchipped: true,
                vetName: 'Wigram Vet',
                vetPhone: '03 929 0987',
                medicalNotes: 'Brachycephalic - monitor in warm weather. Prone to overheating.',
                behaviourNotes: 'Prefers small dogs. Monday daycare only. Gentle temperament.',
                emergencyContact: 'Sarah Mitchell - 027 555 1234',
                photo: null,
                assessmentPassed: true,
                assessmentDate: '2024-09-25',
                size: 'small',
                createdAt: '2024-09-22T09:00:00Z'
            },
            {
                id: 'dog-004',
                ownerId: 'demo-user-003',
                name: 'Charlie',
                breed: 'Border Collie',
                age: 2,
                weight: 20,
                gender: 'male',
                colour: 'Black & White',
                vaccinated: true,
                desexed: true,
                microchipped: true,
                vetName: 'Riccarton Vet',
                vetPhone: '03 348 9728',
                medicalNotes: 'No issues. High energy.',
                behaviourNotes: 'Very active, needs lots of stimulation. Good with other dogs.',
                emergencyContact: 'Mike Johnson - 021 888 7777',
                photo: null,
                assessmentPassed: true,
                assessmentDate: '2024-10-01',
                size: 'medium',
                createdAt: '2024-09-28T14:00:00Z'
            },
            {
                id: 'dog-005',
                ownerId: 'demo-user-003',
                name: 'Luna',
                breed: 'Cavapoo',
                age: 1,
                weight: 7,
                gender: 'female',
                colour: 'Apricot',
                vaccinated: true,
                desexed: true,
                microchipped: true,
                vetName: 'Riccarton Vet',
                vetPhone: '03 348 9728',
                medicalNotes: 'None.',
                behaviourNotes: 'Sweet natured, a bit shy at first. Loves cuddles.',
                emergencyContact: 'Mike Johnson - 021 888 7777',
                photo: null,
                assessmentPassed: true,
                assessmentDate: '2024-10-05',
                size: 'small',
                createdAt: '2024-10-02T11:00:00Z'
            },
            {
                id: 'dog-006',
                ownerId: 'demo-user-004',
                name: 'Cooper',
                breed: 'Australian Shepherd',
                age: 4,
                weight: 25,
                gender: 'male',
                colour: 'Blue Merle',
                vaccinated: true,
                desexed: true,
                microchipped: true,
                vetName: 'Wigram Vet',
                vetPhone: '03 929 0987',
                medicalNotes: 'ACL surgery recovery - regular hydro sessions recommended.',
                behaviourNotes: 'Friendly but can be protective. Good with familiar dogs.',
                emergencyContact: 'Emma Williams - 022 333 4444',
                photo: null,
                assessmentPassed: true,
                assessmentDate: '2024-06-15',
                size: 'medium',
                createdAt: '2024-06-10T10:00:00Z'
            }
        ],
        
        bookings: [], // Will be populated dynamically
        
        credits: {
            'demo-user-001': {
                fullDay: 7,
                halfDay: 3,
                threeHour: 2,
                rehab30: 2,
                rehab60: 1
            },
            'demo-user-002': {
                fullDay: 12,
                halfDay: 5,
                threeHour: 0,
                rehab30: 3,
                rehab60: 0
            },
            'demo-user-003': {
                fullDay: 3,
                halfDay: 2,
                threeHour: 4,
                rehab30: 0,
                rehab60: 0
            },
            'demo-user-004': {
                fullDay: 0,
                halfDay: 0,
                threeHour: 0,
                rehab30: 8,
                rehab60: 2
            }
        },
        
        transactions: [
            {
                id: 'txn-001',
                userId: 'demo-user-001',
                type: 'purchase',
                description: 'Purchased 10x Full Day Package',
                package: '10x Full Days',
                amount: 425.00,
                credits: 10,
                creditType: 'fullDay',
                date: getPastDate(30),
                status: 'completed'
            },
            {
                id: 'txn-002',
                userId: 'demo-user-001',
                type: 'usage',
                description: 'Daycare - Sidon (Full Day)',
                credits: -1,
                creditType: 'fullDay',
                date: getPastDate(25),
                bookingId: 'booking-past-001'
            },
            {
                id: 'txn-003',
                userId: 'demo-user-001',
                type: 'purchase',
                description: 'Purchased 5x Rehab 30min Package',
                package: '5x Rehab 30min',
                amount: 308.00,
                credits: 5,
                creditType: 'rehab30',
                date: getPastDate(20),
                status: 'completed'
            },
            {
                id: 'txn-004',
                userId: 'demo-user-002',
                type: 'purchase',
                description: 'Purchased 20x Full Day Package',
                package: '20x Full Days',
                amount: 760.00,
                credits: 20,
                creditType: 'fullDay',
                date: getPastDate(45),
                status: 'completed'
            },
            {
                id: 'txn-005',
                userId: 'demo-user-003',
                type: 'purchase',
                description: 'Purchased 5x Full Day Package',
                package: '5x Full Days',
                amount: 225.00,
                credits: 5,
                creditType: 'fullDay',
                date: getPastDate(14),
                status: 'completed'
            },
            {
                id: 'txn-006',
                userId: 'demo-user-004',
                type: 'purchase',
                description: 'Purchased 5x Rehab 30min Package',
                package: '5x Rehab 30min',
                amount: 308.00,
                credits: 5,
                creditType: 'rehab30',
                date: getPastDate(60),
                status: 'completed'
            }
        ]
    };
    
    // Generate dynamic bookings on init
    function generateBookings() {
        return [
            // ===== JOEL TEMPERO (demo-user-001) - Sidon =====
            // Upcoming bookings
            {
                id: 'booking-001',
                ownerId: 'demo-user-001',
                dogId: 'dog-001',
                dogName: 'Sidon',
                type: 'daycare',
                sessionType: 'full',
                date: getFutureDate(2),
                dropOff: '07:30',
                pickUp: '17:30',
                status: 'confirmed',
                notes: '',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-002',
                ownerId: 'demo-user-001',
                dogId: 'dog-001',
                dogName: 'Sidon',
                type: 'daycare',
                sessionType: 'half-am',
                date: getFutureDate(4),
                dropOff: '07:30',
                pickUp: '12:30',
                status: 'confirmed',
                notes: 'Morning session only',
                price: 38.50,
                paidWithCredits: true,
                creditType: 'halfDay',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-003',
                ownerId: 'demo-user-001',
                dogId: 'dog-001',
                dogName: 'Sidon',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getFutureDate(6),
                time: '10:00',
                status: 'confirmed',
                notes: 'Conditioning session',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: new Date().toISOString()
            },
            // Past bookings - Joel
            {
                id: 'booking-past-001',
                ownerId: 'demo-user-001',
                dogId: 'dog-001',
                dogName: 'Sidon',
                type: 'daycare',
                sessionType: 'full',
                date: getPastDate(5),
                dropOff: '07:30',
                pickUp: '17:30',
                status: 'completed',
                notes: 'Had a great day! Made lots of friends.',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: getPastDate(10)
            },
            {
                id: 'booking-past-002',
                ownerId: 'demo-user-001',
                dogId: 'dog-001',
                dogName: 'Sidon',
                type: 'daycare',
                sessionType: 'full',
                date: getPastDate(12),
                dropOff: '07:30',
                pickUp: '17:30',
                status: 'completed',
                notes: 'Very energetic, loved playing!',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: getPastDate(15)
            },
            
            // ===== SARAH MITCHELL (demo-user-002) - Bella & Max =====
            // Upcoming
            {
                id: 'booking-004',
                ownerId: 'demo-user-002',
                dogId: 'dog-002',
                dogName: 'Bella',
                type: 'daycare',
                sessionType: 'full',
                date: getFutureDate(1),
                dropOff: '08:00',
                pickUp: '17:00',
                status: 'confirmed',
                notes: '',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-005',
                ownerId: 'demo-user-002',
                dogId: 'dog-002',
                dogName: 'Bella',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getFutureDate(3),
                time: '14:00',
                status: 'confirmed',
                notes: 'Hip maintenance session',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-006',
                ownerId: 'demo-user-002',
                dogId: 'dog-003',
                dogName: 'Max',
                type: 'daycare',
                sessionType: 'half-am',
                date: getFutureDate(8), // Should be a Monday for small breeds
                dropOff: '08:00',
                pickUp: '12:30',
                status: 'confirmed',
                notes: 'Small breed Monday',
                price: 38.50,
                paidWithCredits: true,
                creditType: 'halfDay',
                createdAt: new Date().toISOString()
            },
            // Past - Sarah
            {
                id: 'booking-past-003',
                ownerId: 'demo-user-002',
                dogId: 'dog-002',
                dogName: 'Bella',
                type: 'daycare',
                sessionType: 'full',
                date: getPastDate(3),
                dropOff: '08:00',
                pickUp: '17:00',
                status: 'completed',
                notes: 'Great day, very social',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: getPastDate(7)
            },
            {
                id: 'booking-past-004',
                ownerId: 'demo-user-002',
                dogId: 'dog-002',
                dogName: 'Bella',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getPastDate(7),
                time: '11:00',
                status: 'completed',
                notes: 'Good progress on hip mobility',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: getPastDate(10)
            },
            
            // ===== MIKE JOHNSON (demo-user-003) - Charlie & Luna =====
            // Upcoming
            {
                id: 'booking-007',
                ownerId: 'demo-user-003',
                dogId: 'dog-004',
                dogName: 'Charlie',
                type: 'daycare',
                sessionType: 'full',
                date: getFutureDate(2),
                dropOff: '07:00',
                pickUp: '18:00',
                status: 'confirmed',
                notes: 'High energy - needs lots of play',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-008',
                ownerId: 'demo-user-003',
                dogId: 'dog-005',
                dogName: 'Luna',
                type: 'daycare',
                sessionType: '3hour',
                date: getFutureDate(5),
                dropOff: '09:00',
                pickUp: '12:00',
                status: 'confirmed',
                notes: 'Short socialisation visit',
                price: 26.50,
                paidWithCredits: true,
                creditType: 'threeHour',
                createdAt: new Date().toISOString()
            },
            // Past - Mike
            {
                id: 'booking-past-005',
                ownerId: 'demo-user-003',
                dogId: 'dog-004',
                dogName: 'Charlie',
                type: 'daycare',
                sessionType: 'full',
                date: getPastDate(4),
                dropOff: '07:30',
                pickUp: '17:30',
                status: 'completed',
                notes: 'Ran around all day!',
                price: 50.50,
                paidWithCredits: true,
                creditType: 'fullDay',
                createdAt: getPastDate(8)
            },
            
            // ===== EMMA WILLIAMS (demo-user-004) - Cooper =====
            // Upcoming - primarily rehab
            {
                id: 'booking-009',
                ownerId: 'demo-user-004',
                dogId: 'dog-006',
                dogName: 'Cooper',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getFutureDate(1),
                time: '09:00',
                status: 'confirmed',
                notes: 'ACL recovery - Week 8',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-010',
                ownerId: 'demo-user-004',
                dogId: 'dog-006',
                dogName: 'Cooper',
                type: 'hydrotherapy',
                sessionType: '60min',
                date: getFutureDate(4),
                time: '10:00',
                status: 'confirmed',
                notes: 'Extended session for strength building',
                price: 125.00,
                paidWithCredits: true,
                creditType: 'rehab60',
                createdAt: new Date().toISOString()
            },
            {
                id: 'booking-011',
                ownerId: 'demo-user-004',
                dogId: 'dog-006',
                dogName: 'Cooper',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getFutureDate(8),
                time: '09:00',
                status: 'confirmed',
                notes: 'ACL recovery - Week 9',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: new Date().toISOString()
            },
            // Past - Emma
            {
                id: 'booking-past-006',
                ownerId: 'demo-user-004',
                dogId: 'dog-006',
                dogName: 'Cooper',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getPastDate(3),
                time: '09:00',
                status: 'completed',
                notes: 'ACL recovery - Week 7. Good progress!',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: getPastDate(5)
            },
            {
                id: 'booking-past-007',
                ownerId: 'demo-user-004',
                dogId: 'dog-006',
                dogName: 'Cooper',
                type: 'hydrotherapy',
                sessionType: '30min',
                date: getPastDate(10),
                time: '09:00',
                status: 'completed',
                notes: 'ACL recovery - Week 6',
                price: 70.00,
                paidWithCredits: true,
                creditType: 'rehab30',
                createdAt: getPastDate(12)
            }
        ];
    }
    
    // Initialize data
    function initCollection(name) {
        const key = DB_PREFIX + name;
        if (!localStorage.getItem(key)) {
            let data;
            if (name === 'bookings') {
                data = generateBookings();
            } else {
                data = defaultData[name] || [];
            }
            localStorage.setItem(key, JSON.stringify(data));
        }
    }
    
    // Get collection
    function getCollection(name) {
        initCollection(name);
        return JSON.parse(localStorage.getItem(DB_PREFIX + name) || '[]');
    }
    
    // Save collection
    function saveCollection(name, data) {
        localStorage.setItem(DB_PREFIX + name, JSON.stringify(data));
    }
    
    // Simulate async delay
    function delay(ms = 300) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Public API
    return {
        // =========== DOGS ===========
        
        /**
         * Get all dogs for a user
         */
        getDogs: async function(userId) {
            await delay();
            const dogs = getCollection('dogs');
            return dogs.filter(d => d.ownerId === userId);
        },
        
        /**
         * Get single dog
         */
        getDog: async function(dogId) {
            await delay();
            const dogs = getCollection('dogs');
            return dogs.find(d => d.id === dogId) || null;
        },
        
        /**
         * Add new dog
         */
        addDog: async function(dogData) {
            await delay(500);
            const dogs = getCollection('dogs');
            const newDog = {
                ...dogData,
                id: 'dog-' + Date.now(),
                assessmentPassed: false,
                assessmentDate: null,
                createdAt: new Date().toISOString()
            };
            dogs.push(newDog);
            saveCollection('dogs', dogs);
            return newDog;
        },
        
        /**
         * Update dog
         */
        updateDog: async function(dogId, updates) {
            await delay(500);
            const dogs = getCollection('dogs');
            const index = dogs.findIndex(d => d.id === dogId);
            if (index === -1) throw new Error('Dog not found');
            dogs[index] = { ...dogs[index], ...updates };
            saveCollection('dogs', dogs);
            return dogs[index];
        },
        
        /**
         * Delete dog
         */
        deleteDog: async function(dogId) {
            await delay(500);
            const dogs = getCollection('dogs');
            saveCollection('dogs', dogs.filter(d => d.id !== dogId));
            return true;
        },
        
        // =========== BOOKINGS ===========
        
        /**
         * Get bookings for a user
         */
        getBookings: async function(userId, options = {}) {
            await delay();
            let bookings = getCollection('bookings').filter(b => b.ownerId === userId);
            
            // Filter by status
            if (options.status) {
                bookings = bookings.filter(b => b.status === options.status);
            }
            
            // Sort by date (newest first for past, oldest first for upcoming)
            bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
            
            return bookings;
        },
        
        /**
         * Get upcoming bookings
         */
        getUpcomingBookings: async function(userId) {
            await delay();
            const today = new Date().toISOString().split('T')[0];
            let bookings = getCollection('bookings')
                .filter(b => b.ownerId === userId && b.date >= today && b.status !== 'cancelled');
            bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
            return bookings;
        },
        
        /**
         * Get past bookings
         */
        getPastBookings: async function(userId) {
            await delay();
            const today = new Date().toISOString().split('T')[0];
            let bookings = getCollection('bookings')
                .filter(b => b.ownerId === userId && (b.date < today || b.status === 'completed'));
            bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
            return bookings;
        },
        
        /**
         * Get all bookings (admin)
         */
        getAllBookings: async function(options = {}) {
            await delay();
            let bookings = getCollection('bookings');
            
            if (options.date) {
                bookings = bookings.filter(b => b.date === options.date);
            }
            if (options.status) {
                bookings = bookings.filter(b => b.status === options.status);
            }
            
            bookings.sort((a, b) => new Date(a.date) - new Date(b.date));
            return bookings;
        },
        
        /**
         * Create booking
         */
        createBooking: async function(bookingData) {
            await delay(500);
            const bookings = getCollection('bookings');
            const newBooking = {
                ...bookingData,
                id: 'booking-' + Date.now(),
                status: 'confirmed',
                createdAt: new Date().toISOString()
            };
            bookings.push(newBooking);
            saveCollection('bookings', bookings);
            return newBooking;
        },
        
        /**
         * Update booking
         */
        updateBooking: async function(bookingId, updates) {
            await delay(500);
            const bookings = getCollection('bookings');
            const index = bookings.findIndex(b => b.id === bookingId);
            if (index === -1) throw new Error('Booking not found');
            bookings[index] = { ...bookings[index], ...updates };
            saveCollection('bookings', bookings);
            return bookings[index];
        },
        
        /**
         * Cancel booking
         */
        cancelBooking: async function(bookingId) {
            return this.updateBooking(bookingId, { status: 'cancelled' });
        },
        
        // =========== CREDITS ===========
        
        /**
         * Get user credits
         */
        getCredits: async function(userId) {
            await delay();
            initCollection('credits');
            const credits = JSON.parse(localStorage.getItem(DB_PREFIX + 'credits') || '{}');
            return credits[userId] || {
                fullDay: 0,
                halfDay: 0,
                threeHour: 0,
                rehab30: 0,
                rehab60: 0
            };
        },
        
        /**
         * Add credits (purchase)
         */
        addCredits: async function(userId, creditType, amount) {
            await delay(500);
            initCollection('credits');
            const credits = JSON.parse(localStorage.getItem(DB_PREFIX + 'credits') || '{}');
            if (!credits[userId]) {
                credits[userId] = { fullDay: 0, halfDay: 0, threeHour: 0, rehab30: 0, rehab60: 0 };
            }
            credits[userId][creditType] = (credits[userId][creditType] || 0) + amount;
            localStorage.setItem(DB_PREFIX + 'credits', JSON.stringify(credits));
            return credits[userId];
        },
        
        /**
         * Use credits
         */
        useCredits: async function(userId, creditType, amount = 1) {
            await delay(300);
            initCollection('credits');
            const credits = JSON.parse(localStorage.getItem(DB_PREFIX + 'credits') || '{}');
            if (!credits[userId] || credits[userId][creditType] < amount) {
                throw new Error('Insufficient credits');
            }
            credits[userId][creditType] -= amount;
            localStorage.setItem(DB_PREFIX + 'credits', JSON.stringify(credits));
            return credits[userId];
        },
        
        // =========== TRANSACTIONS ===========
        
        /**
         * Get user transactions
         */
        getTransactions: async function(userId) {
            await delay();
            const transactions = getCollection('transactions');
            return transactions
                .filter(t => t.userId === userId)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        
        /**
         * Add transaction
         */
        addTransaction: async function(transactionData) {
            await delay(300);
            const transactions = getCollection('transactions');
            const newTxn = {
                ...transactionData,
                id: 'txn-' + Date.now(),
                date: new Date().toISOString()
            };
            transactions.push(newTxn);
            saveCollection('transactions', transactions);
            return newTxn;
        },
        
        // =========== PACKAGES ===========
        
        /**
         * Get available packages
         */
        getPackages: async function() {
            await delay(200);
            return [
                { id: 'pkg-dc-5f', name: '5x Full Days', type: 'daycare', creditType: 'fullDay', credits: 5, price: 225.00, savings: 27.50 },
                { id: 'pkg-dc-10f', name: '10x Full Days', type: 'daycare', creditType: 'fullDay', credits: 10, price: 425.00, savings: 80.00, popular: true },
                { id: 'pkg-dc-20f', name: '20x Full Days', type: 'daycare', creditType: 'fullDay', credits: 20, price: 760.00, savings: 250.00, bestValue: true },
                { id: 'pkg-dc-5h', name: '5x Half Days', type: 'daycare', creditType: 'halfDay', credits: 5, price: 160.00, savings: 32.50 },
                { id: 'pkg-dc-10h', name: '10x Half Days', type: 'daycare', creditType: 'halfDay', credits: 10, price: 300.00, savings: 85.00 },
                { id: 'pkg-rh-5-30', name: '5x Rehab 30min', type: 'rehab', creditType: 'rehab30', credits: 5, price: 308.00, savings: 42.00 },
                { id: 'pkg-rh-5-60', name: '5x Rehab 1hr', type: 'rehab', creditType: 'rehab60', credits: 5, price: 550.00, savings: 75.00 },
                { id: 'pkg-new-client', name: 'New Client Special', type: 'daycare', creditType: 'fullDay', credits: 5, price: 185.00, savings: 67.50, newClientOnly: true }
            ];
        },
        
        // =========== UTILITIES ===========
        
        /**
         * Reset all data to defaults
         */
        resetDemo: function() {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(DB_PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            // Re-initialize with defaults
            ['dogs', 'bookings', 'credits', 'transactions'].forEach(name => initCollection(name));
            console.log('[DEMO] Database reset to defaults');
        },
        
        /**
         * Get all dogs (admin)
         */
        getAllDogs: async function() {
            await delay();
            return getCollection('dogs');
        }
    };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockDatabase;
}
