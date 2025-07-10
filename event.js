document.addEventListener('DOMContentLoaded', async function() {
    // Get DOM elements
    const eventsList = document.querySelector('.events-list');
    const searchForm = document.getElementById('search-form');
    const categoryFilter = document.getElementById('category-filter');
    const departmentFilter = document.getElementById('department-filter');
    const audienceFilter = document.getElementById('audience-filter');
    const startDateFilter = document.getElementById('start-date-filter');
    const endDateFilter = document.getElementById('end-date-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    // Current filters
    let currentFilters = {
        category: '',
        department: '',
        audience: '',
        startDate: '',
        endDate: '',
        searchQuery: ''
    };
    
    // Load events with current filters
    async function loadEvents() {
        try {
            eventsList.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i> Loading events...
                </div>
            `;
            
            // In a real app, this would be an API call with filters
            const events = await fetchData('/api/events/featured');
            
            if (events.length === 0) {
                eventsList.innerHTML = `
                    <div class="no-events">
                        <h3>No events found matching your criteria</h3>
                        <p>Try adjusting your filters or check back later for new events.</p>
                    </div>
                `;
                return;
            }
            
            // Render events
            eventsList.innerHTML = events.map(event => `
                <div class="event-item">
                    <div class="event-date">
                        <span class="event-day">${new Date(event.startDate).getDate()}</span>
                        <span class="event-month">
                            ${new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                        </span>
                    </div>
                    <div class="event-info">
                        <h3><a href="event-detail.html?id=${event.id}">${event.title}</a></h3>
                        <div class="event-meta">
                            <span class="event-category">${event.category}</span>
                            <span class="event-department">${event.department}</span>
                            <span class="event-audience">${event.audience.split(',')[0]}</span>
                        </div>
                        <p class="event-time">
                            <i class="far fa-clock"></i> ${formatTime(event.startDate)} - ${formatTime(event.endDate)}
                        </p>
                        <p class="event-location">
                            <i class="fas fa-map-marker-alt"></i> ${event.location}
                        </p>
                        <p class="event-description">
                            ${event.description.substring(0, 150)}...
                        </p>
                        <div class="event-actions">
                            <a href="event-detail.html?id=${event.id}" class="btn btn-sm btn-primary">
                                View Details
                            </a>
                            <span class="event-rsvp">
                                ${event.rsvpCount} attending
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading events:', error);
            eventsList.innerHTML = `
                <div class="error">
                    Error loading events. Please try again later.
                </div>
            `;
        }
    }
    
    // Handle search form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        currentFilters.searchQuery = document.getElementById('search-query').value;
        loadEvents();
    });
    
    // Handle filter changes
    categoryFilter.addEventListener('change', function() {
        currentFilters.category = this.value;
        loadEvents();
    });
    
    departmentFilter.addEventListener('change', function() {
        currentFilters.department = this.value;
        loadEvents();
    });
    
    audienceFilter.addEventListener('change', function() {
        currentFilters.audience = this.value;
        loadEvents();
    });
    
    startDateFilter.addEventListener('change', function() {
        currentFilters.startDate = this.value;
        loadEvents();
    });
    
    endDateFilter.addEventListener('change', function() {
        currentFilters.endDate = this.value;
        loadEvents();
    });
    
    // Clear all filters
    clearFiltersBtn.addEventListener('click', function() {
        categoryFilter.value = '';
        departmentFilter.value = '';
        audienceFilter.value = '';
        startDateFilter.value = '';
        endDateFilter.value = '';
        document.getElementById('search-query').value = '';
        
        currentFilters = {
            category: '',
            department: '',
            audience: '',
            startDate: '',
            endDate: '',
            searchQuery: ''
        };
        
        loadEvents();
    });
    
    // Initial load
    loadEvents();
});