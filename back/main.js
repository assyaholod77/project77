// main.js
class MentorMatchApp {
    constructor() {
        this.currentUser = null;
        this.sessions = [];
        this.init();
    }

    init() {
        this.initEventListeners();
        this.initCharts();
        this.loadMockData();
        this.initMap();
    }

    initEventListeners() {
        // Регистрация
        document.getElementById('register').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Выход из системы
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Поиск и сортировка
        document.getElementById('searchSessions').addEventListener('input', (e) => {
            this.filterSessions(e.target.value);
        });

        document.getElementById('sortSessions').addEventListener('change', (e) => {
            this.sortSessions(e.target.value);
        });

        // Drag & Drop для карточек менторов
        this.initDragAndDrop();
    }

    async handleRegister() {
        const email = document.getElementById('row_mail').value;
        const password = document.getElementById('row_password').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.currentUser = data.data;
                this.showDashboard();
                this.showNotification('Регистрация успешна!', 'success');
            } else {
                this.showNotification(data.error, 'error');
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            this.showNotification('Ошибка соединения', 'error');
        }
    }

    showDashboard() {
        document.querySelector('.block3').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        this.updateDashboard();
    }

    updateDashboard() {
        this.updateStats();
        this.updateCharts();
        this.updateSessionsTable();
    }

    updateStats() {
        // Обновление статистики
        document.getElementById('totalSessions').textContent = this.sessions.length;
        document.getElementById('userRating').textContent = this.calculateAverageRating();
        document.getElementById('totalHours').textContent = this.calculateTotalHours();
    }

    updateCharts() {
        // Обновление графиков
        this.updateSessionsChart();
        this.updateProgressChart();
    }

    initCharts() {
        // Инициализация Chart.js
        this.sessionsChart = new Chart(document.getElementById('sessionsChart'), {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [{
                    label: 'Сессии в месяц',
                    data: [2, 3, 1, 4, 2, 3],
                    borderColor: '#e5315b',
                    backgroundColor: 'rgba(229, 49, 91, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        this.progressChart = new Chart(document.getElementById('progressChart'), {
            type: 'doughnut',
            data: {
                labels: ['JavaScript', 'CSS', 'Node.js', 'React'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: [
                        '#e5315b',
                        '#6a1628',
                        '#ff6b95',
                        '#ff9eb5'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    updateSessionsChart() {
        // Логика обновления графика сессий
    }

    updateProgressChart() {
        // Логика обновления графика прогресса
    }

    updateSessionsTable() {
        const tbody = document.getElementById('sessionsTableBody');
        tbody.innerHTML = this.sessions.map(session => `
            <tr class="fade-in-up">
                <td>${session.date}</td>
                <td>${session.mentor}</td>
                <td>${session.topic}</td>
                <td>${session.duration}ч</td>
                <td>${'★'.repeat(session.rating)}${'☆'.repeat(5-session.rating)}</td>
                <td>
                    <button class="btn-edit" onclick="app.editSession(${session.id})">✏️</button>
                    <button class="btn-delete" onclick="app.deleteSession(${session.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    filterSessions(query) {
        const filtered = this.sessions.filter(session => 
            session.mentor.toLowerCase().includes(query.toLowerCase()) ||
            session.topic.toLowerCase().includes(query.toLowerCase())
        );
        this.displayFilteredSessions(filtered);
    }

    sortSessions(criteria) {
        const sorted = [...this.sessions].sort((a, b) => {
            switch(criteria) {
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'rating-desc':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        this.displayFilteredSessions(sorted);
    }

    displayFilteredSessions(sessions) {
        const tbody = document.getElementById('sessionsTableBody');
        tbody.innerHTML = sessions.map(session => `
            <tr>
                <td>${session.date}</td>
                <td>${session.mentor}</td>
                <td>${session.topic}</td>
                <td>${session.duration}ч</td>
                <td>${'★'.repeat(session.rating)}</td>
                <td>
                    <button class="btn-edit" onclick="app.editSession(${session.id})">✏️</button>
                    <button class="btn-delete" onclick="app.deleteSession(${session.id})">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    initMap() {
        // Инициализация Яндекс Карт
        if (typeof ymaps !== 'undefined') {
            ymaps.ready(() => {
                this.map = new ymaps.Map('mentorsMap', {
                    center: [55.76, 37.64],
                    zoom: 10
                });

                // Добавление меток менторов
                this.addMentorMarkers();
            });
        }
    }

    addMentorMarkers() {
        const mentors = [
            { coords: [55.75, 37.60], name: 'Дмитрий', specialty: 'JavaScript' },
            { coords: [55.74, 37.65], name: 'Ярослав', specialty: 'C++' },
            { coords: [55.77, 37.62], name: 'Энн', specialty: 'Frontend' }
        ];

        mentors.forEach(mentor => {
            const marker = new ymaps.Placemark(mentor.coords, {
                balloonContent: `
                    <strong>${mentor.name}</strong><br>
                    Специальность: ${mentor.specialty}
                `
            }, {
                preset: 'islands#icon',
                iconColor: '#e5315b'
            });

            this.map.geoObjects.add(marker);
        });
    }

    initDragAndDrop() {
        const mentorCards = document.querySelectorAll('.mentor_cart');
        
        mentorCards.forEach(card => {
            card.setAttribute('draggable', 'true');
            
            card.addEventListener('dragstart', (e) => {
                e.target.classList.add('dragging');
                e.dataTransfer.setData('text/plain', e.target.dataset.mentorId);
            });
            
            card.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });

        // Зона для перетаскивания (можно добавить в дашборд)
        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.innerHTML = '<p>Перетащите ментора сюда для добавления в избранное</p>';
        document.querySelector('.dashboard-content').prepend(dropZone);

        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const mentorId = e.dataTransfer.getData('text/plain');
            this.addToFavorites(mentorId);
        });
    }

    addToFavorites(mentorId) {
        this.showNotification(`Ментор добавлен в избранное!`, 'success');
    }

    loadMockData() {
        // Загрузка тестовых данных
        this.sessions = [
            { id: 1, date: '2024-01-15', mentor: 'Дмитрий', topic: 'JavaScript Basics', duration: 2, rating: 5 },
            { id: 2, date: '2024-01-10', mentor: 'Ярослав', topic: 'C++ Advanced', duration: 1.5, rating: 4 },
            { id: 3, date: '2024-01-05', mentor: 'Энн', topic: 'CSS Grid', duration: 2, rating: 5 }
        ];
    }

    calculateAverageRating() {
        if (this.sessions.length === 0) return 0;
        return (this.sessions.reduce((sum, session) => sum + session.rating, 0) / this.sessions.length).toFixed(1);
    }

    calculateTotalHours() {
        return this.sessions.reduce((sum, session) => sum + session.duration, 0);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            zIndex: '10000',
            transition: 'all 0.3s ease'
        });

        notification.style.background = type === 'success' ? '#4CAF50' : '#f44336';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    handleLogout() {
        this.currentUser = null;
        document.getElementById('dashboard').style.display = 'none';
        document.querySelector('.block3').style.display = 'block';
        this.showNotification('Вы вышли из системы', 'info');
    }
}

// Инициализация приложения
const app = new MentorMatchApp();