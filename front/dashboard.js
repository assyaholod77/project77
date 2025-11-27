class Dashboard {
    constructor() {
        this.userData = null;
        this.reviews = [];
        this.sessions = [];
        this.charts = {};
        this.init();
    }

    init() {
        console.log('🚀 Dashboard initializing...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        console.log('📊 Initializing application...');
        
        this.loadUserData();
        this.initEventListeners();
        this.loadReviews();
        this.loadSessions();
        
        // Ждем немного перед созданием графиков
        setTimeout(() => {
            this.initCharts();
        }, 100);
        
        this.initAnimations();
        
        console.log('✅ Dashboard initialized successfully');
    }

    loadUserData() {
        this.userData = {
            id: 1,
            name: 'Иван Иванов',
            email: 'ivan@example.com',
            joinDate: '2024-01-15'
        };
        
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = this.userData.name;
        }
    }

    initCharts() {
        console.log('🎨 Initializing charts...');
        
        this.createSessionsChart();
        this.createTopicsChart();
        this.createProgressChart();
        this.createMentorsChart();
        
        console.log('📈 Charts initialization complete');
    }

    createSessionsChart() {
        const canvas = document.getElementById('sessionsChart');
        if (!canvas) {
            console.error('❌ sessionsChart canvas not found!');
            return;
        }

        console.log('📈 Creating sessions chart...');
        
        try {
            this.charts.sessions = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                    datasets: [{
                        label: 'Количество сессий',
                        data: [12, 19, 8, 15, 12, 18],
                        borderColor: '#e5315b',
                        backgroundColor: 'rgba(229, 49, 91, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#e5315b',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Динамика сессий по месяцам'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 5
                            }
                        }
                    }
                }
            });
            console.log('✅ Sessions chart created successfully');
        } catch (error) {
            console.error('❌ Error creating sessions chart:', error);
        }
    }

    createTopicsChart() {
        const canvas = document.getElementById('topicsChart');
        if (!canvas) {
            console.error('❌ topicsChart canvas not found!');
            return;
        }

        console.log('📊 Creating topics chart...');
        
        try {
            this.charts.topics = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: ['JavaScript', 'React', 'Node.js', 'CSS', 'Базы данных'],
                    datasets: [{
                        data: [35, 25, 15, 15, 10],
                        backgroundColor: [
                            '#e5315b',
                            '#007bff', 
                            '#28a745',
                            '#ffc107',
                            '#6f42c1'
                        ],
                        borderWidth: 3,
                        borderColor: '#fff',
                        hoverOffset: 15
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 15,
                                usePointStyle: true
                            }
                        },
                        title: {
                            display: true,
                            text: 'Распределение по темам (%)'
                        }
                    },
                    cutout: '50%'
                }
            });
            console.log('✅ Topics chart created successfully');
        } catch (error) {
            console.error('❌ Error creating topics chart:', error);
        }
    }

    createProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) {
            console.error('❌ progressChart canvas not found!');
            return;
        }

        console.log('📊 Creating progress chart...');
        
        try {
            this.charts.progress = new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Базы данных'],
                    datasets: [{
                        label: 'Уровень владения (%)',
                        data: [90, 75, 60, 45, 30],
                        backgroundColor: [
                            'rgba(229, 49, 91, 0.8)',
                            'rgba(229, 49, 91, 0.7)',
                            'rgba(229, 49, 91, 0.6)',
                            'rgba(229, 49, 91, 0.5)',
                            'rgba(229, 49, 91, 0.4)'
                        ],
                        borderColor: '#e5315b',
                        borderWidth: 2,
                        borderRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Прогресс обучения'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
            console.log('✅ Progress chart created successfully');
        } catch (error) {
            console.error('❌ Error creating progress chart:', error);
        }
    }

    createMentorsChart() {
        const canvas = document.getElementById('mentorsChart');
        if (!canvas) {
            console.error('❌ mentorsChart canvas not found!');
            return;
        }

        console.log('📊 Creating mentors chart...');
        
        try {
            this.charts.mentors = new Chart(canvas, {
                type: 'radar',
                data: {
                    labels: ['Объяснение', 'Поддержка', 'Опыт', 'Гибкость', 'Результаты'],
                    datasets: [
                        {
                            label: 'Дмитрий',
                            data: [4.8, 4.5, 4.9, 4.7, 4.8],
                            backgroundColor: 'rgba(229, 49, 91, 0.2)',
                            borderColor: '#e5315b',
                            borderWidth: 2,
                            pointBackgroundColor: '#e5315b'
                        },
                        {
                            label: 'Ярослав',
                            data: [4.5, 4.3, 4.8, 4.4, 4.6],
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            borderColor: '#007bff',
                            borderWidth: 2,
                            pointBackgroundColor: '#007bff'
                        },
                        {
                            label: 'Энн',
                            data: [4.9, 4.8, 4.7, 4.9, 4.9],
                            backgroundColor: 'rgba(40, 167, 69, 0.2)',
                            borderColor: '#28a745',
                            borderWidth: 2,
                            pointBackgroundColor: '#28a745'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Сравнение менторов'
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 5,
                            ticks: {
                                stepSize: 1,
                                callback: function(value) {
                                    return value + '★';
                                }
                            }
                        }
                    }
                }
            });
            console.log('✅ Mentors chart created successfully');
        } catch (error) {
            console.error('❌ Error creating mentors chart:', error);
        }
    }

    initEventListeners() {
        // Выход
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Добавление отзыва
        const addReviewBtn = document.getElementById('addReviewBtn');
        if (addReviewBtn) {
            addReviewBtn.addEventListener('click', () => this.openReviewModal());
        }

        // Закрытие модального окна
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeReviewModal());
        }

        // Отмена отзыва
        const cancelReview = document.getElementById('cancelReview');
        if (cancelReview) {
            cancelReview.addEventListener('click', () => this.closeReviewModal());
        }

        // Форма отзыва
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReview();
            });
        }

        // Поиск отзывов
        const searchReviews = document.getElementById('searchReviews');
        if (searchReviews) {
            searchReviews.addEventListener('input', (e) => {
                this.filterReviews(e.target.value);
            });
        }

        // Сортировка отзывов
        const sortReviews = document.getElementById('sortReviews');
        if (sortReviews) {
            sortReviews.addEventListener('change', (e) => {
                this.sortReviews(e.target.value);
            });
        }
    }

    openReviewModal() {
        const modal = document.getElementById('reviewModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    closeReviewModal() {
        const modal = document.getElementById('reviewModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    submitReview() {
        const title = document.getElementById('reviewTitle')?.value;
        const text = document.getElementById('reviewText')?.value;
        
        if (!title || !text) {
            alert('Заполните все поля!');
            return;
        }

        const newReview = {
            id: Date.now(),
            mentor_name: 'Новый ментор',
            rating: 5,
            title: title,
            text: text,
            date: new Date().toISOString().split('T')[0]
        };

        this.reviews.unshift(newReview);
        this.renderReviews();
        this.closeReviewModal();
        this.showNotification('Отзыв успешно добавлен!', 'success');
    }

    loadReviews() {
        this.reviews = [
            {
                id: 1,
                mentor_name: 'Дмитрий (JavaScript)',
                rating: 5,
                title: 'Отличный ментор!',
                text: 'Дмитрий прекрасно объясняет сложные концепции JavaScript. Очень рекомендую для начинающих и продолжающих.',
                date: '2024-01-20'
            },
            {
                id: 2,
                mentor_name: 'Ярослав (C++)',
                rating: 4,
                title: 'Полезные сессии по C++',
                text: 'Ярослав помог разобраться с продвинутыми темами C++. Немного сложно для новичков, но очень информативно.',
                date: '2024-01-15'
            },
            {
                id: 3,
                mentor_name: 'Энн (Frontend)',
                rating: 5,
                title: 'Лучший фронтенд-ментор',
                text: 'Энн не только отличный разработчик, но и прекрасный преподаватель. Научила меня многим современным подходам во фронтенде.',
                date: '2024-01-10'
            }
        ];
        this.renderReviews();
    }

    renderReviews() {
        const grid = document.getElementById('reviewsGrid');
        if (!grid) return;
        
        grid.innerHTML = this.reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div>
                        <div class="review-mentor">${review.mentor_name}</div>
                        <div class="review-date">${this.formatDate(review.date)}</div>
                    </div>
                    <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
                <div class="review-title">${review.title}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-actions">
                    <button class="btn-edit" onclick="dashboard.editReview(${review.id})">Редактировать</button>
                    <button class="btn-delete" onclick="dashboard.deleteReview(${review.id})">Удалить</button>
                </div>
            </div>
        `).join('');
    }

    filterReviews(query) {
        const filtered = this.reviews.filter(review =>
            review.title.toLowerCase().includes(query.toLowerCase()) ||
            review.text.toLowerCase().includes(query.toLowerCase()) ||
            review.mentor_name.toLowerCase().includes(query.toLowerCase())
        );
        this.displayFilteredReviews(filtered);
    }

    sortReviews(criteria) {
        const sorted = [...this.reviews].sort((a, b) => {
            switch(criteria) {
                case 'newest': return new Date(b.date) - new Date(a.date);
                case 'oldest': return new Date(a.date) - new Date(b.date);
                case 'rating-high': return b.rating - a.rating;
                case 'rating-low': return a.rating - b.rating;
                default: return 0;
            }
        });
        this.displayFilteredReviews(sorted);
    }

    displayFilteredReviews(reviews) {
        const grid = document.getElementById('reviewsGrid');
        if (!grid) return;
        
        grid.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div>
                        <div class="review-mentor">${review.mentor_name}</div>
                        <div class="review-date">${this.formatDate(review.date)}</div>
                    </div>
                    <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                </div>
                <div class="review-title">${review.title}</div>
                <div class="review-text">${review.text}</div>
                <div class="review-actions">
                    <button class="btn-edit" onclick="dashboard.editReview(${review.id})">Редактировать</button>
                    <button class="btn-delete" onclick="dashboard.deleteReview(${review.id})">Удалить</button>
                </div>
            </div>
        `).join('');
    }

    editReview(reviewId) {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
            alert(`Редактирование отзыва: ${review.title}`);
        }
    }

    deleteReview(reviewId) {
        if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            this.reviews = this.reviews.filter(review => review.id !== reviewId);
            this.renderReviews();
            this.showNotification('Отзыв удален', 'success');
        }
    }

    loadSessions() {
        this.sessions = [
            { id: 1, date: '2024-01-20', mentor: 'Дмитрий', topic: 'JavaScript Advanced', duration: 2, rating: 5 },
            { id: 2, date: '2024-01-18', mentor: 'Ярослав', topic: 'C++ Memory Management', duration: 1.5, rating: 4 },
            { id: 3, date: '2024-01-15', mentor: 'Энн', topic: 'React Hooks', duration: 2, rating: 5 },
            { id: 4, date: '2024-01-12', mentor: 'Дмитрий', topic: 'Node.js Basics', duration: 1, rating: 5 }
        ];
        this.renderSessions();
        this.updateStats();
    }

    renderSessions() {
        const tbody = document.getElementById('sessionsTable');
        if (!tbody) return;
        
        tbody.innerHTML = this.sessions.map(session => `
            <tr>
                <td>${this.formatDate(session.date)}</td>
                <td>${session.mentor}</td>
                <td>${session.topic}</td>
                <td>${session.duration} ч</td>
                <td>${'★'.repeat(session.rating)}${'☆'.repeat(5 - session.rating)}</td>
                <td>
                    <button class="btn-edit" onclick="dashboard.editSession(${session.id})">✏️</button>
                    <button class="btn-delete" onclick="dashboard.deleteSession(${session.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    updateStats() {
        const totalSessions = this.sessions.length;
        const totalHours = this.sessions.reduce((sum, session) => sum + session.duration, 0);
        const avgRating = this.sessions.length > 0 
            ? (this.sessions.reduce((sum, session) => sum + session.rating, 0) / this.sessions.length).toFixed(1)
            : 0;
        
        const uniqueMentors = new Set(this.sessions.map(s => s.mentor)).size;

        document.getElementById('totalSessions').textContent = totalSessions;
        document.getElementById('totalHours').textContent = totalHours.toFixed(1);
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('mentorsCount').textContent = uniqueMentors;
    }

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }

    logout() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            window.location.href = 'index.html';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initAnimations() {
        const elements = document.querySelectorAll('.stat-card, .chart-card, .review-card');
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Инициализация приложения
console.log('🔧 Starting dashboard application...');
window.dashboard = new Dashboard();