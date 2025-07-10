// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Check if user is logged in (simulated)
function checkAuth() {
    // In a real app, this would check localStorage or make an API call
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Update UI based on auth status
function updateAuthUI() {
    const loginBtn = document.querySelector('a[href="login.html"]');
    const registerBtn = document.querySelector('a[href="register.html"]');
    const dashboardLink = document.querySelector('a[href="dashboard.html"]');
    
    if (checkAuth()) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (dashboardLink) dashboardLink.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (dashboardLink) dashboardLink.style.display = 'none';
    }
}

// Initialize auth UI
document.addEventListener('DOMContentLoaded', updateAuthUI);

// Simulated API calls
async function fetchData(endpoint) {
    try {
        // In a real app, this would be a fetch/axios call
        console.log(`Fetching data from ${endpoint}`);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Return mock data based on endpoint
        switch(endpoint) {
            case '/api/announcements/latest':
                return [
                    {
                        id: 1,
                        title: 'Fall Semester Registration',
                        content: 'Registration for the fall semester will begin on August 1st. Please check your student portal for your registration time slot.',
                        createdAt: '2023-07-20'
                    },
                    {
                        id: 2,
                        title: 'Campus Maintenance',
                        content: 'There will be scheduled maintenance in the library building this weekend. Please plan accordingly.',
                        createdAt: '2023-07-18'
                    },
                    {
                        id: 3,
                        title: 'New Student Orientation',
                        content: 'Orientation for new students will be held on August 15th. Attendance is mandatory for all incoming freshmen.',
                        createdAt: '2023-07-15'
                    }
                ];
            case '/api/events/featured':
                return [
                    {
                        id: 1,
                        title: 'Annual Science Fair',
                        description: 'Join us for our annual science fair showcasing student projects from all science departments.',
                        startDate: '2023-09-10T10:00:00',
                        endDate: '2023-09-10T16:00:00',
                        location: 'Science Building Auditorium',
                        category: 'academic',
                        department: 'science',
                        audience: 'students,faculty,public',
                        imageUrl: 'images/science-fair.jpg',
                        rsvpCount: 45
                    },
                    {
                        id: 2,
                        title: 'Basketball Tournament Finals',
                        description: 'Come cheer for your favorite team at the inter-department basketball tournament finals!',
                        startDate: '2023-08-25T18:00:00',
                        endDate: '2023-08-25T21:00:00',
                        location: 'University Gymnasium',
                        category: 'sports',
                        department: 'sports',
                        audience: 'students,faculty,staff,public',
                        rsvpCount: 120
                    },
                    {
                        id: 3,
                        title: 'Guest Lecture: AI in Healthcare',
                        description: 'Dr. Sarah Johnson from TechMed will discuss the latest advancements in AI applications for healthcare.',
                        startDate: '2023-09-05T14:00:00',
                        endDate: '2023-09-05T16:00:00',
                        location: 'Engineering Building Room 205',
                        category: 'academic',
                        department: 'engineering,medicine',
                        audience: 'students,faculty',
                        imageUrl: 'images/ai-lecture.jpg',
                        rsvpCount: 78
                    }
                ];
            default:
                throw new Error('Endpoint not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format time
function formatTime(dateString) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
}