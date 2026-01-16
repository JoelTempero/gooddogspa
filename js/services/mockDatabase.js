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
            // Joel Tempero's dog - FIRST
            { id: 'dog-001', ownerId: 'demo-user-001', name: 'Sidon', breed: 'Golden Retriever', age: 1.5, weight: 38, gender: 'male', colour: 'Golden', vaccinated: true, desexed: true, microchipped: true, vetName: 'Wigram Vet', vetPhone: '03 929 0987', medicalNotes: 'Healthy pup, no issues.', behaviourNotes: 'Very friendly, loves other dogs and people. Good recall. Enjoys swimming and fetch.', emergencyContact: 'Joel Tempero - 0204 023 9009', photo: 'https://tempero.nz/assets/images/slideshow10-ff574a56.jpg?v=4a5a960a', assessmentPassed: true, assessmentDate: '2024-08-20', size: 'large', createdAt: '2024-08-15T10:00:00Z' },
            
            // Sarah Mitchell's dogs
            { id: 'dog-002', ownerId: 'user-002', name: 'Bella', breed: 'Labrador', age: 3, weight: 28, gender: 'female', colour: 'Chocolate', vaccinated: true, desexed: true, microchipped: true, vetName: 'Wigram Vet', vetPhone: '03 929 0987', medicalNotes: 'Mild hip dysplasia - benefits from hydrotherapy.', behaviourNotes: 'Very social, loves water.', emergencyContact: 'Sarah Mitchell - 027 555 1234', photo: null, assessmentPassed: true, assessmentDate: '2024-07-15', size: 'large', createdAt: '2024-07-10T09:00:00Z' },
            { id: 'dog-003', ownerId: 'user-002', name: 'Max', breed: 'French Bulldog', age: 4, weight: 12, gender: 'male', colour: 'Fawn', vaccinated: true, desexed: false, microchipped: true, vetName: 'Wigram Vet', vetPhone: '03 929 0987', medicalNotes: 'Brachycephalic - monitor in warm weather.', behaviourNotes: 'Prefers small dogs. Monday daycare only.', emergencyContact: 'Sarah Mitchell - 027 555 1234', photo: null, assessmentPassed: true, assessmentDate: '2024-09-25', size: 'small', createdAt: '2024-09-22T09:00:00Z' },
            
            // Mike Johnson's dogs
            { id: 'dog-004', ownerId: 'user-003', name: 'Charlie', breed: 'Border Collie', age: 2, weight: 20, gender: 'male', colour: 'Black & White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Riccarton Vet', vetPhone: '03 348 9728', medicalNotes: 'High energy, no health issues.', behaviourNotes: 'Very active, needs stimulation.', emergencyContact: 'Mike Johnson - 021 888 7777', photo: null, assessmentPassed: true, assessmentDate: '2024-10-01', size: 'medium', createdAt: '2024-09-28T14:00:00Z' },
            { id: 'dog-005', ownerId: 'user-003', name: 'Luna', breed: 'Cavapoo', age: 1, weight: 7, gender: 'female', colour: 'Apricot', vaccinated: true, desexed: true, microchipped: true, vetName: 'Riccarton Vet', vetPhone: '03 348 9728', medicalNotes: 'None.', behaviourNotes: 'Sweet natured, bit shy at first.', emergencyContact: 'Mike Johnson - 021 888 7777', photo: null, assessmentPassed: true, assessmentDate: '2024-10-05', size: 'small', createdAt: '2024-10-02T11:00:00Z' },
            
            // Emma Williams' dog
            { id: 'dog-006', ownerId: 'user-004', name: 'Cooper', breed: 'Australian Shepherd', age: 4, weight: 25, gender: 'male', colour: 'Blue Merle', vaccinated: true, desexed: true, microchipped: true, vetName: 'Wigram Vet', vetPhone: '03 929 0987', medicalNotes: 'ACL surgery recovery - hydro recommended.', behaviourNotes: 'Friendly but can be protective.', emergencyContact: 'Emma Williams - 022 333 4444', photo: null, assessmentPassed: true, assessmentDate: '2024-06-15', size: 'medium', createdAt: '2024-06-10T10:00:00Z' },
            
            // David Brown's dogs
            { id: 'dog-007', ownerId: 'user-005', name: 'Rocky', breed: 'Rottweiler', age: 5, weight: 45, gender: 'male', colour: 'Black & Tan', vaccinated: true, desexed: true, microchipped: true, vetName: 'Papanui Vet', vetPhone: '03 352 1234', medicalNotes: 'Joint supplements recommended.', behaviourNotes: 'Gentle giant, great with all dogs.', emergencyContact: 'David Brown - 027 111 2222', photo: null, assessmentPassed: true, assessmentDate: '2024-05-25', size: 'large', createdAt: '2024-05-22T10:00:00Z' },
            
            // Lisa Taylor's dog
            { id: 'dog-008', ownerId: 'user-006', name: 'Daisy', breed: 'Cocker Spaniel', age: 3, weight: 14, gender: 'female', colour: 'Golden', vaccinated: true, desexed: true, microchipped: true, vetName: 'Merivale Vet', vetPhone: '03 355 5678', medicalNotes: 'Ear infections - keep ears dry.', behaviourNotes: 'Very playful, loves fetch.', emergencyContact: 'Lisa Taylor - 021 333 4444', photo: null, assessmentPassed: true, assessmentDate: '2024-08-18', size: 'medium', createdAt: '2024-08-15T11:00:00Z' },
            
            // James Wilson's dogs
            { id: 'dog-009', ownerId: 'user-007', name: 'Zeus', breed: 'German Shepherd', age: 4, weight: 38, gender: 'male', colour: 'Black & Tan', vaccinated: true, desexed: true, microchipped: true, vetName: 'Fendalton Vet', vetPhone: '03 351 2345', medicalNotes: 'None.', behaviourNotes: 'Well trained, excellent recall.', emergencyContact: 'James Wilson - 022 555 6666', photo: null, assessmentPassed: true, assessmentDate: '2024-04-20', size: 'large', createdAt: '2024-04-18T14:30:00Z' },
            { id: 'dog-010', ownerId: 'user-007', name: 'Athena', breed: 'German Shepherd', age: 3, weight: 32, gender: 'female', colour: 'Sable', vaccinated: true, desexed: true, microchipped: true, vetName: 'Fendalton Vet', vetPhone: '03 351 2345', medicalNotes: 'None.', behaviourNotes: 'Playful, bonds well with Zeus.', emergencyContact: 'James Wilson - 022 555 6666', photo: null, assessmentPassed: true, assessmentDate: '2024-04-20', size: 'large', createdAt: '2024-04-18T14:30:00Z' },
            
            // Rachel Davis' dog
            { id: 'dog-011', ownerId: 'user-008', name: 'Coco', breed: 'Poodle', age: 2, weight: 5, gender: 'female', colour: 'White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Halswell Vet', vetPhone: '03 322 1234', medicalNotes: 'None.', behaviourNotes: 'Small breed friendly only.', emergencyContact: 'Rachel Davis - 027 777 8888', photo: null, assessmentPassed: true, assessmentDate: '2024-07-28', size: 'small', createdAt: '2024-07-25T10:00:00Z' },
            
            // Chris Martin's dog
            { id: 'dog-012', ownerId: 'user-009', name: 'Duke', breed: 'Boxer', age: 3, weight: 30, gender: 'male', colour: 'Brindle', vaccinated: true, desexed: true, microchipped: true, vetName: 'Burnside Vet', vetPhone: '03 358 9012', medicalNotes: 'None.', behaviourNotes: 'High energy, loves to play.', emergencyContact: 'Chris Martin - 021 999 0000', photo: null, assessmentPassed: true, assessmentDate: '2024-03-15', size: 'large', createdAt: '2024-03-12T16:00:00Z' },
            
            // Amanda White's dogs
            { id: 'dog-013', ownerId: 'user-010', name: 'Milo', breed: 'Beagle', age: 4, weight: 12, gender: 'male', colour: 'Tricolour', vaccinated: true, desexed: true, microchipped: true, vetName: 'Cashmere Vet', vetPhone: '03 332 5678', medicalNotes: 'Prone to weight gain - monitor food.', behaviourNotes: 'Follows his nose, good with all dogs.', emergencyContact: 'Amanda White - 022 111 3333', photo: null, assessmentPassed: true, assessmentDate: '2024-09-10', size: 'medium', createdAt: '2024-09-08T08:30:00Z' },
            { id: 'dog-014', ownerId: 'user-010', name: 'Penny', breed: 'Beagle', age: 3, weight: 10, gender: 'female', colour: 'Lemon', vaccinated: true, desexed: true, microchipped: true, vetName: 'Cashmere Vet', vetPhone: '03 332 5678', medicalNotes: 'None.', behaviourNotes: 'Milo sister, very bonded.', emergencyContact: 'Amanda White - 022 111 3333', photo: null, assessmentPassed: true, assessmentDate: '2024-09-10', size: 'medium', createdAt: '2024-09-08T08:30:00Z' },
            
            // Tom Harris' dog
            { id: 'dog-015', ownerId: 'user-011', name: 'Archie', breed: 'Schnauzer', age: 5, weight: 8, gender: 'male', colour: 'Salt & Pepper', vaccinated: true, desexed: true, microchipped: true, vetName: 'St Albans Vet', vetPhone: '03 356 7890', medicalNotes: 'Regular grooming needed.', behaviourNotes: 'Confident, good with all sizes.', emergencyContact: 'Tom Harris - 027 444 5555', photo: null, assessmentPassed: true, assessmentDate: '2024-07-01', size: 'small', createdAt: '2024-06-28T13:00:00Z' },
            
            // Nicole Clark's dog
            { id: 'dog-016', ownerId: 'user-012', name: 'Ruby', breed: 'Cavalier King Charles', age: 2, weight: 6, gender: 'female', colour: 'Blenheim', vaccinated: true, desexed: true, microchipped: true, vetName: 'Addington Vet', vetPhone: '03 338 1234', medicalNotes: 'Heart murmur - monitored annually.', behaviourNotes: 'Very gentle, loves cuddles.', emergencyContact: 'Nicole Clark - 021 666 7777', photo: null, assessmentPassed: true, assessmentDate: '2024-09-02', size: 'small', createdAt: '2024-08-30T15:00:00Z' },
            
            // Ben Anderson's dogs
            { id: 'dog-017', ownerId: 'user-013', name: 'Tank', breed: 'Bullmastiff', age: 4, weight: 55, gender: 'male', colour: 'Fawn', vaccinated: true, desexed: true, microchipped: true, vetName: 'Sockburn Vet', vetPhone: '03 341 2345', medicalNotes: 'Joint care supplements.', behaviourNotes: 'Gentle despite size, calm.', emergencyContact: 'Ben Anderson - 022 888 9999', photo: null, assessmentPassed: true, assessmentDate: '2024-05-18', size: 'large', createdAt: '2024-05-15T11:00:00Z' },
            
            // Kate Robinson's dog
            { id: 'dog-018', ownerId: 'user-014', name: 'Willow', breed: 'Whippet', age: 3, weight: 12, gender: 'female', colour: 'Fawn', vaccinated: true, desexed: true, microchipped: true, vetName: 'Spreydon Vet', vetPhone: '03 337 5678', medicalNotes: 'None.', behaviourNotes: 'Fast runner, loves zoomies.', emergencyContact: 'Kate Robinson - 027 222 3333', photo: null, assessmentPassed: true, assessmentDate: '2024-07-05', size: 'medium', createdAt: '2024-07-02T09:45:00Z' },
            
            // Peter Lee's dog
            { id: 'dog-019', ownerId: 'user-015', name: 'Buster', breed: 'Jack Russell', age: 6, weight: 7, gender: 'male', colour: 'White & Tan', vaccinated: true, desexed: true, microchipped: true, vetName: 'Sydenham Vet', vetPhone: '03 366 9012', medicalNotes: 'None.', behaviourNotes: 'Energetic, loves balls.', emergencyContact: 'Peter Lee - 021 444 5556', photo: null, assessmentPassed: true, assessmentDate: '2024-04-28', size: 'small', createdAt: '2024-04-25T14:30:00Z' },
            
            // Jenny Thompson's dogs
            { id: 'dog-020', ownerId: 'user-016', name: 'Rosie', breed: 'Shih Tzu', age: 4, weight: 6, gender: 'female', colour: 'Gold & White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Linwood Vet', vetPhone: '03 381 2345', medicalNotes: 'Eye drops daily.', behaviourNotes: 'Small breed only, bit nervous.', emergencyContact: 'Jenny Thompson - 022 666 7778', photo: null, assessmentPassed: true, assessmentDate: '2024-09-22', size: 'small', createdAt: '2024-09-18T10:00:00Z' },
            { id: 'dog-021', ownerId: 'user-016', name: 'Teddy', breed: 'Maltese', age: 2, weight: 4, gender: 'male', colour: 'White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Linwood Vet', vetPhone: '03 381 2345', medicalNotes: 'None.', behaviourNotes: 'Playful, good with Rosie.', emergencyContact: 'Jenny Thompson - 022 666 7778', photo: null, assessmentPassed: true, assessmentDate: '2024-09-22', size: 'small', createdAt: '2024-09-18T10:00:00Z' },
            
            // Mark Scott's dog
            { id: 'dog-022', ownerId: 'user-017', name: 'Scout', breed: 'Vizsla', age: 2, weight: 25, gender: 'male', colour: 'Rust', vaccinated: true, desexed: true, microchipped: true, vetName: 'Avonhead Vet', vetPhone: '03 358 5678', medicalNotes: 'None.', behaviourNotes: 'Very active, needs exercise.', emergencyContact: 'Mark Scott - 027 888 9990', photo: null, assessmentPassed: true, assessmentDate: '2024-06-15', size: 'large', createdAt: '2024-06-12T16:15:00Z' },
            
            // Helen King's dog
            { id: 'dog-023', ownerId: 'user-018', name: 'Ginger', breed: 'Irish Setter', age: 5, weight: 28, gender: 'female', colour: 'Red', vaccinated: true, desexed: true, microchipped: true, vetName: 'Bishopdale Vet', vetPhone: '03 359 9012', medicalNotes: 'None.', behaviourNotes: 'Friendly, loves everyone.', emergencyContact: 'Helen King - 021 111 2223', photo: null, assessmentPassed: true, assessmentDate: '2024-08-08', size: 'large', createdAt: '2024-08-05T12:30:00Z' },
            
            // Steve Wright's dogs
            { id: 'dog-024', ownerId: 'user-019', name: 'Bruno', breed: 'Doberman', age: 3, weight: 40, gender: 'male', colour: 'Black & Rust', vaccinated: true, desexed: true, microchipped: true, vetName: 'Bryndwr Vet', vetPhone: '03 351 2346', medicalNotes: 'None.', behaviourNotes: 'Well trained, obedient.', emergencyContact: 'Steve Wright - 022 333 4445', photo: null, assessmentPassed: true, assessmentDate: '2024-04-01', size: 'large', createdAt: '2024-03-28T08:00:00Z' },
            
            // Olivia Green's dog
            { id: 'dog-025', ownerId: 'user-020', name: 'Poppy', breed: 'Cockapoo', age: 1, weight: 8, gender: 'female', colour: 'Cream', vaccinated: true, desexed: true, microchipped: true, vetName: 'Casebrook Vet', vetPhone: '03 359 3456', medicalNotes: 'None.', behaviourNotes: 'Puppy energy, very social.', emergencyContact: 'Olivia Green - 027 555 6667', photo: null, assessmentPassed: true, assessmentDate: '2024-07-20', size: 'small', createdAt: '2024-07-15T11:45:00Z' },
            
            // Daniel Baker's dog
            { id: 'dog-026', ownerId: 'user-021', name: 'Rex', breed: 'Weimaraner', age: 4, weight: 35, gender: 'male', colour: 'Silver', vaccinated: true, desexed: true, microchipped: true, vetName: 'Northwood Vet', vetPhone: '03 323 5678', medicalNotes: 'Separation anxiety - working on it.', behaviourNotes: 'Loves daycare, high energy.', emergencyContact: 'Daniel Baker - 021 777 8889', photo: null, assessmentPassed: true, assessmentDate: '2024-05-08', size: 'large', createdAt: '2024-05-02T15:00:00Z' },
            
            // Michelle Hill's dog
            { id: 'dog-027', ownerId: 'user-022', name: 'Lola', breed: 'Pug', age: 3, weight: 8, gender: 'female', colour: 'Black', vaccinated: true, desexed: true, microchipped: true, vetName: 'Belfast Vet', vetPhone: '03 323 9012', medicalNotes: 'Brachycephalic - monitor heat.', behaviourNotes: 'Small breed only, loves naps.', emergencyContact: 'Michelle Hill - 022 999 0001', photo: null, assessmentPassed: true, assessmentDate: '2024-10-01', size: 'small', createdAt: '2024-09-28T09:30:00Z' },
            
            // Andrew Moore's dogs
            { id: 'dog-028', ownerId: 'user-023', name: 'Finn', breed: 'Husky', age: 3, weight: 25, gender: 'male', colour: 'Grey & White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Redwood Vet', vetPhone: '03 354 2345', medicalNotes: 'Needs shade in summer.', behaviourNotes: 'Vocal, loves to run.', emergencyContact: 'Andrew Moore - 027 111 2224', photo: null, assessmentPassed: true, assessmentDate: '2024-04-12', size: 'large', createdAt: '2024-04-08T13:15:00Z' },
            { id: 'dog-029', ownerId: 'user-023', name: 'Nova', breed: 'Husky', age: 2, weight: 22, gender: 'female', colour: 'Black & White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Redwood Vet', vetPhone: '03 354 2345', medicalNotes: 'Needs shade in summer.', behaviourNotes: 'Finn sister, very bonded.', emergencyContact: 'Andrew Moore - 027 111 2224', photo: null, assessmentPassed: true, assessmentDate: '2024-04-12', size: 'large', createdAt: '2024-04-08T13:15:00Z' },
            
            // Sophie Young's dog
            { id: 'dog-030', ownerId: 'user-024', name: 'Chester', breed: 'Corgi', age: 4, weight: 13, gender: 'male', colour: 'Red & White', vaccinated: true, desexed: true, microchipped: true, vetName: 'Northcote Vet', vetPhone: '03 352 5678', medicalNotes: 'Watch weight, back issues possible.', behaviourNotes: 'Confident, herds other dogs!', emergencyContact: 'Sophie Young - 021 333 4446', photo: null, assessmentPassed: true, assessmentDate: '2024-08-25', size: 'small', createdAt: '2024-08-20T10:45:00Z' },
            
            // Ryan Allen's dog
            { id: 'dog-031', ownerId: 'user-025', name: 'Ziggy', breed: 'Dachshund', age: 5, weight: 9, gender: 'male', colour: 'Black & Tan', vaccinated: true, desexed: true, microchipped: true, vetName: 'Mairehau Vet', vetPhone: '03 385 9012', medicalNotes: 'Back care - no jumping.', behaviourNotes: 'Loves tunnels, small breed only.', emergencyContact: 'Ryan Allen - 022 555 6668', photo: null, assessmentPassed: true, assessmentDate: '2024-06-25', size: 'small', createdAt: '2024-06-22T14:00:00Z' },
            
            // Megan Hall's dogs
            { id: 'dog-032', ownerId: 'user-026', name: 'Shadow', breed: 'Kelpie', age: 3, weight: 18, gender: 'male', colour: 'Black', vaccinated: true, desexed: true, microchipped: true, vetName: 'Shirley Vet', vetPhone: '03 385 2345', medicalNotes: 'None.', behaviourNotes: 'Working dog energy, needs jobs.', emergencyContact: 'Megan Hall - 027 777 8890', photo: null, assessmentPassed: true, assessmentDate: '2024-06-02', size: 'medium', createdAt: '2024-05-30T11:30:00Z' },
            
            // Paul Walker's dog
            { id: 'dog-033', ownerId: 'user-027', name: 'Thor', breed: 'Great Dane', age: 2, weight: 60, gender: 'male', colour: 'Harlequin', vaccinated: true, desexed: true, microchipped: true, vetName: 'Richmond Vet', vetPhone: '03 389 5678', medicalNotes: 'Joint supplements recommended.', behaviourNotes: 'Gentle giant, thinks he small.', emergencyContact: 'Paul Walker - 021 999 0002', photo: null, assessmentPassed: true, assessmentDate: '2024-08-01', size: 'large', createdAt: '2024-07-28T08:15:00Z' },
            
            // Anna Turner's dogs
            { id: 'dog-034', ownerId: 'user-028', name: 'Pepper', breed: 'Border Terrier', age: 6, weight: 7, gender: 'female', colour: 'Grizzle', vaccinated: true, desexed: true, microchipped: true, vetName: 'Dallington Vet', vetPhone: '03 389 9012', medicalNotes: 'Arthritis - on medication.', behaviourNotes: 'Feisty but friendly.', emergencyContact: 'Anna Turner - 022 111 2225', photo: null, assessmentPassed: true, assessmentDate: '2024-04-18', size: 'small', createdAt: '2024-04-15T16:30:00Z' },
            
            // Jason Cooper's dog
            { id: 'dog-035', ownerId: 'user-029', name: 'Diesel', breed: 'Staffy', age: 4, weight: 22, gender: 'male', colour: 'Blue', vaccinated: true, desexed: true, microchipped: true, vetName: 'Aranui Vet', vetPhone: '03 388 2345', medicalNotes: 'None.', behaviourNotes: 'Super friendly, loves pats.', emergencyContact: 'Jason Cooper - 027 333 4447', photo: null, assessmentPassed: true, assessmentDate: '2024-09-15', size: 'medium', createdAt: '2024-09-10T12:00:00Z' },
            
            // Claire Evans' dog
            { id: 'dog-036', ownerId: 'user-030', name: 'Honey', breed: 'Goldendoodle', age: 2, weight: 25, gender: 'female', colour: 'Apricot', vaccinated: true, desexed: true, microchipped: true, vetName: 'Bromley Vet', vetPhone: '03 388 5678', medicalNotes: 'None.', behaviourNotes: 'Loves everyone, great temperament.', emergencyContact: 'Claire Evans - 021 555 6669', photo: null, assessmentPassed: true, assessmentDate: '2024-06-08', size: 'large', createdAt: '2024-06-05T09:45:00Z' }
        ],
        
        bookings: [], // Will be populated dynamically
        
        credits: {
            'demo-user-001': { fullDay: 7, halfDay: 3, threeHour: 2, rehab30: 2, rehab60: 1 },
            'user-002': { fullDay: 12, halfDay: 5, threeHour: 0, rehab30: 3, rehab60: 0 },
            'user-003': { fullDay: 3, halfDay: 2, threeHour: 4, rehab30: 0, rehab60: 0 },
            'user-004': { fullDay: 0, halfDay: 0, threeHour: 0, rehab30: 8, rehab60: 2 },
            'user-005': { fullDay: 15, halfDay: 0, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-006': { fullDay: 8, halfDay: 4, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-007': { fullDay: 20, halfDay: 0, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-008': { fullDay: 5, halfDay: 0, threeHour: 3, rehab30: 0, rehab60: 0 },
            'user-009': { fullDay: 10, halfDay: 5, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-010': { fullDay: 6, halfDay: 2, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-011': { fullDay: 4, halfDay: 0, threeHour: 2, rehab30: 0, rehab60: 0 },
            'user-012': { fullDay: 3, halfDay: 5, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-013': { fullDay: 18, halfDay: 0, threeHour: 0, rehab30: 5, rehab60: 0 },
            'user-014': { fullDay: 7, halfDay: 3, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-015': { fullDay: 2, halfDay: 0, threeHour: 5, rehab30: 0, rehab60: 0 },
            'user-016': { fullDay: 0, halfDay: 8, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-017': { fullDay: 12, halfDay: 0, threeHour: 0, rehab30: 3, rehab60: 1 },
            'user-018': { fullDay: 9, halfDay: 2, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-019': { fullDay: 14, halfDay: 0, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-020': { fullDay: 5, halfDay: 3, threeHour: 2, rehab30: 0, rehab60: 0 },
            'user-021': { fullDay: 11, halfDay: 0, threeHour: 0, rehab30: 2, rehab60: 0 },
            'user-022': { fullDay: 0, halfDay: 6, threeHour: 4, rehab30: 0, rehab60: 0 },
            'user-023': { fullDay: 16, halfDay: 0, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-024': { fullDay: 4, halfDay: 2, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-025': { fullDay: 0, halfDay: 5, threeHour: 3, rehab30: 0, rehab60: 0 },
            'user-026': { fullDay: 8, halfDay: 0, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-027': { fullDay: 13, halfDay: 0, threeHour: 0, rehab30: 4, rehab60: 2 },
            'user-028': { fullDay: 2, halfDay: 3, threeHour: 0, rehab30: 5, rehab60: 0 },
            'user-029': { fullDay: 6, halfDay: 2, threeHour: 0, rehab30: 0, rehab60: 0 },
            'user-030': { fullDay: 10, halfDay: 4, threeHour: 0, rehab30: 0, rehab60: 0 }
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
