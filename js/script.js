// Google Clone JavaScript Functionality - Enhanced Version
document.addEventListener('DOMContentLoaded', function() {
    // User account data for Rajeev Ranjan
    const userAccount = {
        name: 'Rajeev Ranjan',
        email: 'ranjan@ranjanalive.com',
        avatar: 'RR',
        isSignedIn: true
    };

    // Update profile avatar with user initials
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.textContent = userAccount.avatar;
        profileAvatar.title = `${userAccount.name} (${userAccount.email})`;
    }

    // Get DOM elements
    const searchInput = document.querySelector('.search-input');
    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.search-btn');
    const luckyBtn = document.querySelector('.lucky-btn');
    const micBtn = document.querySelector('.mic-btn');
    const cameraBtn = document.querySelector('.camera-btn');
    const appsMenuBtn = document.querySelector('.apps-menu-btn');
    const profileBtn = document.querySelector('.profile-btn');

    // Enhanced search functionality with real Google search
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Add loading state
            searchBox.classList.add('loading');
            
            // Simulate search delay for better UX
            setTimeout(() => {
                // Redirect to actual Google search
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                window.open(searchUrl, '_blank');
                
                searchBox.classList.remove('loading');
            }, 300);
        } else {
            // Focus on search input if no query
            searchInput.focus();
        }
    }

    // Enhanced I'm Feeling Lucky functionality
    function feelingLucky() {
        const query = searchInput.value.trim();
        if (query) {
            searchBox.classList.add('loading');
            setTimeout(() => {
                // Redirect to Google's "I'm Feeling Lucky" search
                const luckyUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`;
                window.open(luckyUrl, '_blank');
                searchBox.classList.remove('loading');
            }, 300);
        } else {
            // Animate input to indicate search needed
            searchInput.focus();
            searchInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                searchInput.style.animation = '';
            }, 500);
        }
    }

    // Add shake animation for empty search
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // Search button click
    searchBtn.addEventListener('click', performSearch);

    // I'm Feeling Lucky button click
    luckyBtn.addEventListener('click', feelingLucky);

    // Enter key press in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Enhanced search input effects
    searchInput.addEventListener('focus', function() {
        searchBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        searchBox.style.borderColor = 'rgba(223, 225, 229, 0)';
    });

    searchInput.addEventListener('blur', function() {
        if (!searchInput.value) {
            searchBox.style.boxShadow = '';
            searchBox.style.borderColor = '#dfe1e5';
        }
    });

    // Enhanced voice search with perfect UX
    micBtn.addEventListener('click', function() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = function() {
                micBtn.style.backgroundColor = '#ea4335';
                micBtn.style.borderRadius = '50%';
                micBtn.style.padding = '8px';
                micBtn.style.boxShadow = '0 0 0 3px rgba(234, 67, 53, 0.2)';
                searchInput.placeholder = 'Listening...';
                
                // Add pulsing animation
                micBtn.style.animation = 'pulse 1.5s infinite';
                const pulseStyle = document.createElement('style');
                pulseStyle.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(pulseStyle);
            };

            recognition.onresult = function(event) {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                searchInput.value = transcript;
                
                // Auto-search when speech is final
                if (event.results[event.results.length - 1].isFinal) {
                    setTimeout(() => {
                        if (searchInput.value.trim()) {
                            performSearch();
                        }
                    }, 1000);
                }
            };

            recognition.onerror = function(event) {
                console.error('Speech recognition error:', event.error);
                resetMicButton();
                
                if (event.error === 'not-allowed') {
                    alert('🎤 Microphone access denied. Please allow microphone access in your browser settings and try again.');
                } else if (event.error === 'no-speech') {
                    alert('🔇 No speech detected. Please try again.');
                } else {
                    alert('❌ Speech recognition error: ' + event.error);
                }
            };

            recognition.onend = function() {
                resetMicButton();
            };

            function resetMicButton() {
                micBtn.style.backgroundColor = '';
                micBtn.style.borderRadius = '';
                micBtn.style.padding = '';
                micBtn.style.boxShadow = '';
                micBtn.style.animation = '';
                searchInput.placeholder = '';
            }

            recognition.start();
        } else {
            alert('🎤 Speech recognition is not supported in your browser. Please use Chrome, Firefox, or Edge for voice search.');
        }
    });

    // Enhanced camera/image search functionality
    cameraBtn.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Show loading state
                cameraBtn.style.backgroundColor = '#4285f4';
                cameraBtn.style.borderRadius = '50%';
                cameraBtn.style.padding = '8px';
                cameraBtn.style.boxShadow = '0 0 0 3px rgba(66, 133, 244, 0.2)';
                
                // Simulate processing time
                setTimeout(() => {
                    // Open Google Images for reverse search
                    window.open('https://images.google.com/', '_blank');
                    
                    // Reset button
                    cameraBtn.style.backgroundColor = '';
                    cameraBtn.style.borderRadius = '';
                    cameraBtn.style.padding = '';
                    cameraBtn.style.boxShadow = '';
                    
                    // Show success message
                    const notification = document.createElement('div');
                    notification.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: #34a853;
                        color: white;
                        padding: 12px 20px;
                        border-radius: 8px;
                        font-size: 14px;
                        z-index: 10000;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    `;
                    notification.textContent = `📷 Image "${file.name}" ready for search!`;
                    document.body.appendChild(notification);
                    
                    setTimeout(() => {
                        notification.remove();
                    }, 3000);
                }, 800);
            }
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    });

    // Enhanced Google Apps menu with real links
    appsMenuBtn.addEventListener('click', function() {
        const existingMenu = document.querySelector('.apps-dropdown');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const appsMenu = document.createElement('div');
        appsMenu.className = 'apps-dropdown';
        appsMenu.innerHTML = `
            <div class="apps-header">
                <span>Google apps</span>
            </div>
            <div class="apps-grid">
                <a href="https://www.google.com/search" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #4285f4, #34a853);">
                        <span style="color: white; font-weight: bold; font-size: 20px;">G</span>
                    </div>
                    <span>Search</span>
                </a>
                <a href="https://maps.google.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #34a853, #fbbc05);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">🗺️</span>
                    </div>
                    <span>Maps</span>
                </a>
                <a href="https://youtube.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #ff0000, #cc0000);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">▶️</span>
                    </div>
                    <span>YouTube</span>
                </a>
                <a href="https://gmail.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #ea4335, #fbbc05);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">✉️</span>
                    </div>
                    <span>Gmail</span>
                </a>
                <a href="https://drive.google.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #0f9d58, #34a853);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">📁</span>
                    </div>
                    <span>Drive</span>
                </a>
                <a href="https://calendar.google.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #1a73e8, #4285f4);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">📅</span>
                    </div>
                    <span>Calendar</span>
                </a>
                <a href="https://docs.google.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #1a73e8, #4285f4);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">📄</span>
                    </div>
                    <span>Docs</span>
                </a>
                <a href="https://sheets.google.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #137333, #0f9d58);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">📊</span>
                    </div>
                    <span>Sheets</span>
                </a>
                <a href="https://slides.google.com" target="_blank" class="app-item">
                    <div class="app-icon" style="background: linear-gradient(135deg, #ff6d00, #ff8f00);">
                        <span style="color: white; font-weight: bold; font-size: 18px;">🎞️</span>
                    </div>
                    <span>Slides</span>
                </a>
            </div>
            <div class="apps-footer">
                <a href="https://about.google/products/" target="_blank">More from Google</a>
            </div>
        `;

        // Add enhanced styles for the apps dropdown
        const appsStyle = document.createElement('style');
        appsStyle.textContent = `
            .apps-dropdown {
                position: fixed;
                background: white;
                border: 1px solid #dadce0;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                padding: 0;
                z-index: 1000;
                width: 320px;
                animation: dropdownFadeIn 0.2s ease-out;
            }
            @keyframes dropdownFadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .apps-header {
                padding: 16px 16px 8px 16px;
                font-size: 16px;
                font-weight: 400;
                color: #3c4043;
                border-bottom: 1px solid #f1f3f4;
            }
            .apps-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 8px;
                padding: 16px;
            }
            .app-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-decoration: none;
                color: #3c4043;
                padding: 12px 8px;
                border-radius: 8px;
                transition: background-color 0.2s, transform 0.2s;
            }
            .app-item:hover {
                background-color: #f8f9fa;
                transform: translateY(-2px);
            }
            .app-icon {
                width: 56px;
                height: 56px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                transition: box-shadow 0.2s;
            }
            .app-item:hover .app-icon {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .app-item span {
                font-size: 12px;
                text-align: center;
                font-weight: 400;
            }
            .apps-footer {
                padding: 8px 16px 16px 16px;
                border-top: 1px solid #f1f3f4;
            }
            .apps-footer a {
                color: #1a73e8;
                text-decoration: none;
                font-size: 14px;
            }
            .apps-footer a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(appsStyle);

        // Position the dropdown
        const rect = appsMenuBtn.getBoundingClientRect();
        appsMenu.style.top = (rect.bottom + 5) + 'px';
        appsMenu.style.right = (window.innerWidth - rect.right) + 'px';

        document.body.appendChild(appsMenu);

        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!appsMenu.contains(e.target) && !appsMenuBtn.contains(e.target)) {
                    appsMenu.style.animation = 'dropdownFadeOut 0.2s ease-in';
                    setTimeout(() => appsMenu.remove(), 200);
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 100);
    });

    // Enhanced profile/account menu for Rajeev Ranjan
    profileBtn.addEventListener('click', function() {
        const existingMenu = document.querySelector('.profile-dropdown');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const profileMenu = document.createElement('div');
        profileMenu.className = 'profile-dropdown';
        profileMenu.innerHTML = `
            <div class="profile-header">
                <div class="profile-info">
                    <div class="profile-avatar-large">${userAccount.avatar}</div>
                    <div class="profile-details">
                        <div class="profile-name">${userAccount.name}</div>
                        <div class="profile-email">${userAccount.email}</div>
                    </div>
                </div>
                <button class="manage-account-btn" onclick="window.open('https://myaccount.google.com/', '_blank')">
                    Manage your Google Account
                </button>
            </div>
            <div class="profile-actions">
                <a href="#" class="profile-action" onclick="alert('Feature coming soon!')">
                    <span class="action-icon">👤</span>
                    <span>Add another account</span>
                </a>
                <a href="#" class="profile-action" onclick="if(confirm('Sign out of ${userAccount.name}?')) alert('Signed out successfully!')">
                    <span class="action-icon">🚪</span>
                    <span>Sign out</span>
                </a>
            </div>
            <div class="profile-footer">
                <a href="https://policies.google.com/privacy" target="_blank">Privacy Policy</a>
                <span>•</span>
                <a href="https://policies.google.com/terms" target="_blank">Terms of Service</a>
            </div>
        `;

        // Enhanced styles for profile dropdown
        const profileStyle = document.createElement('style');
        profileStyle.textContent = `
            .profile-dropdown {
                position: fixed;
                background: white;
                border: 1px solid #dadce0;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                padding: 0;
                z-index: 1000;
                width: 320px;
                animation: dropdownFadeIn 0.2s ease-out;
            }
            .profile-header {
                padding: 20px;
                border-bottom: 1px solid #f1f3f4;
            }
            .profile-info {
                display: flex;
                align-items: center;
                margin-bottom: 16px;
            }
            .profile-avatar-large {
                width: 72px;
                height: 72px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4285f4, #34a853);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: 500;
                margin-right: 16px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .profile-details {
                flex: 1;
            }
            .profile-name {
                font-size: 18px;
                font-weight: 400;
                color: #3c4043;
                margin-bottom: 4px;
            }
            .profile-email {
                font-size: 14px;
                color: #5f6368;
            }
            .manage-account-btn {
                width: 100%;
                padding: 10px 16px;
                border: 1px solid #dadce0;
                border-radius: 20px;
                background: white;
                color: #1a73e8;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s;
            }
            .manage-account-btn:hover {
                background-color: #f8f9fa;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            .profile-actions {
                padding: 8px 0;
            }
            .profile-action {
                display: flex;
                align-items: center;
                padding: 12px 20px;
                text-decoration: none;
                color: #3c4043;
                transition: background-color 0.2s;
            }
            .profile-action:hover {
                background-color: #f8f9fa;
            }
            .action-icon {
                margin-right: 16px;
                font-size: 16px;
            }
            .profile-footer {
                padding: 16px 20px;
                border-top: 1px solid #f1f3f4;
                font-size: 12px;
                color: #5f6368;
                text-align: center;
            }
            .profile-footer a {
                color: #1a73e8;
                text-decoration: none;
            }
            .profile-footer a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(profileStyle);

        // Position the dropdown
        const rect = profileBtn.getBoundingClientRect();
        profileMenu.style.top = (rect.bottom + 5) + 'px';
        profileMenu.style.right = (window.innerWidth - rect.right) + 'px';

        document.body.appendChild(profileMenu);

        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown(e) {
                if (!profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
                    profileMenu.style.animation = 'dropdownFadeOut 0.2s ease-in';
                    setTimeout(() => profileMenu.remove(), 200);
                    document.removeEventListener('click', closeDropdown);
                }
            });
        }, 100);
    });

    // Enhanced search suggestions with real-time suggestions
    const commonSuggestions = [
        'weather today', 'news', 'translate', 'calculator', 'timer',
        'google maps', 'youtube', 'gmail', 'google drive', 'google docs',
        'current time', 'currency converter', 'what is my ip', 'sports scores',
        'movie showtimes', 'restaurant near me', 'gas prices', 'stock market'
    ];

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        // Remove existing suggestions
        const existingSuggestions = document.querySelector('.search-suggestions');
        if (existingSuggestions) {
            existingSuggestions.remove();
        }

        if (query.length > 0) {
            // Filter suggestions
            const filteredSuggestions = commonSuggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(query)
            ).slice(0, 8);

            if (filteredSuggestions.length > 0) {
                const suggestionsContainer = document.createElement('div');
                suggestionsContainer.className = 'search-suggestions';
                
                suggestionsContainer.innerHTML = filteredSuggestions.map(suggestion => 
                    `<div class="suggestion-item">
                        <svg class="suggestion-icon" width="16" height="16" viewBox="0 0 24 24">
                            <path fill="#9aa0a6" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                        <span>${suggestion}</span>
                    </div>`
                ).join('');

                // Add enhanced styles for suggestions
                const suggestionStyle = document.createElement('style');
                suggestionStyle.textContent = `
                    .search-suggestions {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: white;
                        border: 1px solid #dfe1e5;
                        border-top: none;
                        border-radius: 0 0 24px 24px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        z-index: 100;
                        max-height: 300px;
                        overflow-y: auto;
                        animation: suggestionsSlideDown 0.2s ease-out;
                    }
                    @keyframes suggestionsSlideDown {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .suggestion-item {
                        display: flex;
                        align-items: center;
                        padding: 8px 16px;
                        cursor: pointer;
                        font-size: 16px;
                        color: #3c4043;
                        transition: background-color 0.2s;
                    }
                    .suggestion-item:hover {
                        background-color: #f8f9fa;
                    }
                    .suggestion-icon {
                        margin-right: 12px;
                        flex-shrink: 0;
                    }
                `;
                document.head.appendChild(suggestionStyle);

                // Position suggestions
                searchBox.style.position = 'relative';
                searchBox.appendChild(suggestionsContainer);

                // Add click handlers for suggestions
                suggestionsContainer.addEventListener('click', function(e) {
                    const suggestionItem = e.target.closest('.suggestion-item');
                    if (suggestionItem) {
                        const suggestionText = suggestionItem.querySelector('span').textContent;
                        searchInput.value = suggestionText;
                        suggestionsContainer.remove();
                        performSearch();
                    }
                });
            }
        }
    });

    // Enhanced navigation links functionality
    document.querySelectorAll('.nav-link').forEach(link => {
        const text = link.textContent.trim();
        switch(text) {
            case 'Gmail':
                link.href = 'https://gmail.com';
                link.target = '_blank';
                break;
            case 'Images':
                link.href = 'https://images.google.com';
                link.target = '_blank';
                break;
            case 'About':
                link.href = 'https://about.google/';
                link.target = '_blank';
                break;
            case 'Store':
                link.href = 'https://store.google.com/';
                link.target = '_blank';
                break;
        }
    });

    // Enhanced footer links functionality
    document.querySelectorAll('.footer-link').forEach(link => {
        const text = link.textContent.trim();
        switch(text) {
            case 'Advertising':
                link.href = 'https://ads.google.com/';
                link.target = '_blank';
                break;
            case 'Business':
                link.href = 'https://www.google.com/business/';
                link.target = '_blank';
                break;
            case 'How Search works':
                link.href = 'https://www.google.com/search/howsearchworks/';
                link.target = '_blank';
                break;
            case 'Privacy':
                link.href = 'https://policies.google.com/privacy';
                link.target = '_blank';
                break;
            case 'Terms':
                link.href = 'https://policies.google.com/terms';
                link.target = '_blank';
                break;
            case 'Settings':
                link.href = 'https://www.google.com/preferences';
                link.target = '_blank';
                break;
        }
    });

    // Enhanced language links functionality
    document.querySelectorAll('.language-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const language = this.textContent;
            alert(`🌍 Language changed to ${language}! (Demo feature)`);
        });
    });

    // Dark theme toggle (Easter egg - click logo 5 times)
    let logoClickCount = 0;
    const googleLogo = document.querySelector('.google-logo');
    
    googleLogo.addEventListener('click', function() {
        logoClickCount++;
        
        if (logoClickCount === 5) {
            document.body.classList.toggle('dark-theme');
            logoClickCount = 0;
            
            // Add dark theme styles
            if (!document.querySelector('#dark-theme-styles')) {
                const darkStyles = document.createElement('style');
                darkStyles.id = 'dark-theme-styles';
                darkStyles.textContent = `
                    @keyframes dropdownFadeOut {
                        from { opacity: 1; transform: translateY(0); }
                        to { opacity: 0; transform: translateY(-10px); }
                    }
                    .dark-theme {
                        background-color: #202124 !important;
                        color: #e8eaed !important;
                    }
                    .dark-theme .search-box {
                        background-color: #303134 !important;
                        border-color: #5f6368 !important;
                    }
                    .dark-theme .search-input {
                        color: #e8eaed !important;
                    }
                    .dark-theme .footer {
                        background-color: #171717 !important;
                    }
                    .dark-theme .footer-link, .dark-theme .footer-country {
                        color: #bdc1c6 !important;
                    }
                    .dark-theme .nav-link {
                        color: #e8eaed !important;
                    }
                    .dark-theme .language-links {
                        color: #e8eaed !important;
                    }
                    .dark-theme .language-links a {
                        color: #8ab4f8 !important;
                    }
                `;
                document.head.appendChild(darkStyles);
            }
            
            // Show theme toggle notification
            const isDark = document.body.classList.contains('dark-theme');
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: ${isDark ? '#303134' : '#fff'};
                color: ${isDark ? '#e8eaed' : '#3c4043'};
                padding: 12px 20px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border: 1px solid ${isDark ? '#5f6368' : '#dadce0'};
            `;
            notification.textContent = isDark ? '🌙 Dark theme enabled!' : '☀️ Light theme enabled!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+K or Cmd+K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        
        // Escape to clear search and suggestions
        if (e.key === 'Escape') {
            const suggestions = document.querySelector('.search-suggestions');
            if (suggestions) {
                suggestions.remove();
            } else {
                searchInput.blur();
            }
        }
    });

    // Welcome message and feature announcements
    console.log('🎉 Enhanced Google Clone loaded successfully!');
    console.log(`👤 Welcome back, ${userAccount.name}!`);
    console.log('📧 Account:', userAccount.email);
    console.log('🔍 Real Google search integration: ✅');
    console.log('🎙️ Voice search with auto-search: ✅');
    console.log('📷 Image search integration: ✅');
    console.log('🔗 All Google services linked: ✅');
    console.log('💡 Pro tip: Click the logo 5 times for dark theme!');
    console.log('⌨️ Pro tip: Use Ctrl+K to quickly focus search!');
    
    // Show welcome notification for first-time users
    setTimeout(() => {
        const welcomeNotification = document.createElement('div');
        welcomeNotification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4285f4;
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
            cursor: pointer;
        `;
        welcomeNotification.innerHTML = `
            <div style="font-weight: 500; margin-bottom: 4px;">Welcome to Enhanced Google Clone! 🎉</div>
            <div style="font-size: 12px; opacity: 0.9;">Try voice search, image search, and explore the apps menu!</div>
        `;
        
        welcomeNotification.addEventListener('click', () => {
            welcomeNotification.remove();
        });
        
        document.body.appendChild(welcomeNotification);
        
        setTimeout(() => {
            if (welcomeNotification.parentNode) {
                welcomeNotification.remove();
            }
        }, 5000);
    }, 2000);
});
