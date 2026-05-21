// Update Times
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('notchTime').textContent = hours + ':' + minutes;
    document.getElementById('lockTime').textContent = hours + ':' + minutes;
}

// Initialize time and update every minute
updateTime();
setInterval(updateTime, 60000);

// App Management
let isLocked = true;
let currentApp = null;

function toggleLockUnlock() {
    isLocked = !isLocked;
    const lockScreen = document.getElementById('lockScreen');
    const homeScreen = document.getElementById('homeScreen');
    const lockBtnText = document.getElementById('lockBtnText');
    
    if (isLocked) {
        lockScreen.style.display = 'flex';
        homeScreen.style.display = 'none';
        document.querySelectorAll('.app-view').forEach(app => app.style.display = 'none');
        lockBtnText.textContent = 'Unlock';
        currentApp = null;
    } else {
        lockScreen.style.display = 'none';
        homeScreen.style.display = 'flex';
        lockBtnText.textContent = 'Lock';
    }
}

function openApp(appName) {
    if (isLocked) return;
    
    // Hide all apps and home screen
    document.getElementById('homeScreen').style.display = 'none';
    document.querySelectorAll('.app-view').forEach(app => app.style.display = 'none');
    
    // Show selected app
    const appId = appName + 'App';
    const appElement = document.getElementById(appId);
    if (appElement) {
        appElement.style.display = 'flex';
        currentApp = appName;
    }
}

function closeApp() {
    if (currentApp) {
        document.getElementById(currentApp + 'App').style.display = 'none';
        document.getElementById('homeScreen').style.display = 'flex';
        currentApp = null;
    }
}

function goHome() {
    if (isLocked) return;
    
    document.querySelectorAll('.app-view').forEach(app => app.style.display = 'none');
    document.getElementById('homeScreen').style.display = 'flex';
    currentApp = null;
}

// Control Center
function toggleControlCenter() {
    const controlCenter = document.getElementById('controlCenter');
    controlCenter.classList.toggle('show');
}

// Notification Center
let notificationCenterEl = null;
let notificationCenterOpen = false;

function openNotificationCenter() {
    if (isLocked) return; // keep it locked like a simplified iOS behavior
    notificationCenterEl = document.getElementById('notificationCenter');
    if (!notificationCenterEl) return;
    notificationCenterOpen = true;
    notificationCenterEl.classList.add('show');
}

function closeNotificationCenter() {
    if (!notificationCenterEl) notificationCenterEl = document.getElementById('notificationCenter');
    if (!notificationCenterEl) return;
    notificationCenterOpen = false;
    notificationCenterEl.classList.remove('show');
}

function toggleNotificationCenter() {
    if (notificationCenterOpen) closeNotificationCenter();
    else openNotificationCenter();
}


// Swipe to close (simplified for mouse)
document.addEventListener('mouseup', function(e) {
    const controlCenter = document.getElementById('controlCenter');
    if (e.target !== controlCenter && !controlCenter.contains(e.target)) {
        if (controlCenter.classList.contains('show')) {
            const phoneFrame = document.querySelector('.iphone-frame-full');
            if (!phoneFrame.contains(e.target) || e.target.classList.contains('phone-buttons')) {
                controlCenter.classList.remove('show');
            }
        }
    }
});

// Click outside app to close (iOS-like behavior)
document.addEventListener('click', function(e) {
    if (e.target.id === 'phoneScreen' && currentApp) {
        closeApp();
    }
});

// Battery Animation
function updateBattery() {
    const battery = Math.floor(Math.random() * 20) + 80;
    document.getElementById('batteryPercent').textContent = battery + '%';
}

// Initialize Battery
updateBattery();

// Quick Settings Interactions
document.querySelectorAll('.control-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.opacity = '0.6';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});

// Brightness Slider
const brightnessSlider = document.querySelector('.brightness-slider input');
if (brightnessSlider) {
    brightnessSlider.addEventListener('input', function() {
        const brightness = this.value;
        const phoneFrame = document.querySelector('.iphone-frame-full');
        phoneFrame.style.filter = 'brightness(' + (brightness / 50) + ')';
    });
}

// App Icon Animations
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.9)';
    });
    
    item.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
});

// Simulate Notifications
function showNotification(message) {
    console.log('Notification:', message);
}

// Lock Screen Gesture (tap to unlock)
const lockScreen = document.getElementById('lockScreen');
if (lockScreen) {
    lockScreen.addEventListener('dblclick', toggleLockUnlock);
}

// Status Bar Updates
function updateStatus() {
    const now = new Date();
    const hours = now.getHours();
    
    // Update signal strength indicator
    const signalIcon = document.querySelector('.status-left i:first-child');
    if (signalIcon) {
        const signal = Math.floor(Math.random() * 5) + 1;
        signalIcon.className = 'fas fa-signal-' + (signal === 5 ? '' : 'alt ') + 'level-' + signal;
    }
}

setInterval(updateStatus, 5000);

// App Interactions
const cameraBtn = document.querySelector('.camera-btn');
if (cameraBtn) {
    cameraBtn.addEventListener('click', function() {
        this.style.transform = 'scale(0.8)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// Message Input Simulation
const safariInput = document.querySelector('.safari-input');
if (safariInput) {
    safariInput.addEventListener('focus', function() {
        this.placeholder = 'Type to search...';
    });
    
    safariInput.addEventListener('blur', function() {
        this.placeholder = 'Search or enter website';
    });
}

// Photos Tap Animation
document.querySelectorAll('.photo-item').forEach(photo => {
    photo.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Music Controls
const musicPlayBtn = document.querySelector('.music-controls i');
if (musicPlayBtn) {
    musicPlayBtn.addEventListener('click', function() {
        if (this.classList.contains('fa-play')) {
            this.classList.remove('fa-play');
            this.classList.add('fa-pause');
        } else {
            this.classList.remove('fa-pause');
            this.classList.add('fa-play');
        }
    });
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (currentApp) {
            closeApp();
        } else if (document.getElementById('controlCenter').classList.contains('show')) {
            toggleControlCenter();
        } else if (!isLocked) {
            toggleLockUnlock();
        }
    }
    
    if (e.key === ' ') {
        if (!isLocked && currentApp) {
            closeApp();
        }
    }
});

// Settings Item Interactions
document.querySelectorAll('.settings-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.background = '#f0f0f0';
        setTimeout(() => {
            this.style.background = 'transparent';
        }, 200);
    });
});

// Contact Tap Animation
document.querySelectorAll('.phone-call-item, .message-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.background = '#e8e8e8';
        setTimeout(() => {
            this.style.background = '';
        }, 200);
    });
});

// Calendar Date Click
const calendarDay = document.querySelector('.calendar-day');
if (calendarDay) {
    calendarDay.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

// Initialize App on Load
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    updateStatus();
    
    // Set up date
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dateStr = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate();
    document.getElementById('lockDate').textContent = dateStr;
    
    console.log('iPhone 14 Full UI - Ready!');
});

// Prevent accidental selection
document.addEventListener('selectstart', (e) => {
    if (e.target.closest('.iphone-frame-full')) {
        e.preventDefault();
    }
});

// Double tap to zoom (disabled for phone UI)
document.addEventListener('dblclick', (e) => {
    if (e.target.closest('.iphone-frame-full')) {
        e.preventDefault();
    }
});

// Performance: Remove animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0s');
}

console.log('iPhone 14 - Full UI JavaScript Loaded');

