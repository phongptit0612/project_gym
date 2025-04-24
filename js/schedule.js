// Schedule Management System
class ScheduleManager {
    constructor() {
        this.schedules = [];
        this.bookings = [];
    }

    // Add a new schedule
    addSchedule(schedule) {
        this.schedules.push(schedule);
        this.saveToLocalStorage();
    }

    // Remove a schedule
    removeSchedule(scheduleId) {
        this.schedules = this.schedules.filter(s => s.id !== scheduleId);
        this.saveToLocalStorage();
    }

    // Book a class
    bookClass(scheduleId, userId) {
        const schedule = this.schedules.find(s => s.id === scheduleId);
        if (schedule && schedule.availableSpots > 0) {
            const booking = {
                id: Date.now(),
                scheduleId,
                userId,
                bookingDate: new Date(),
                status: 'confirmed'
            };
            this.bookings.push(booking);
            schedule.availableSpots--;
            this.saveToLocalStorage();
            return booking;
        }
        return null;
    }

    // Cancel a booking
    cancelBooking(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            const schedule = this.schedules.find(s => s.id === booking.scheduleId);
            if (schedule) {
                schedule.availableSpots++;
            }
            this.bookings = this.bookings.filter(b => b.id !== bookingId);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    // Get all schedules
    getAllSchedules() {
        return this.schedules;
    }

    // Get user's bookings
    getUserBookings(userId) {
        return this.bookings.filter(b => b.userId === userId);
    }

    // Save data to localStorage
    saveToLocalStorage() {
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }

    // Load data from localStorage
    loadFromLocalStorage() {
        const savedSchedules = localStorage.getItem('schedules');
        const savedBookings = localStorage.getItem('bookings');
        
        if (savedSchedules) {
            this.schedules = JSON.parse(savedSchedules);
        }
        if (savedBookings) {
            this.bookings = JSON.parse(savedBookings);
        }
    }
}

// Initialize schedule manager
const scheduleManager = new ScheduleManager();
scheduleManager.loadFromLocalStorage();

// Export the schedule manager
window.scheduleManager = scheduleManager; 