// Добавьте эти маршруты:

// Сессии
app.get('/api/users/:id/sessions', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const sessions = await db.getUserSessions(userId);
        res.json({
            success: true,
            data: sessions
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.post('/api/sessions', async (req, res) => {
    try {
        const { user_id, mentor_id, topic, duration, rating, session_date } = req.body;
        const result = await db.createSession({
            user_id: parseInt(user_id),
            mentor_id: parseInt(mentor_id),
            topic,
            duration: parseFloat(duration),
            rating: rating ? parseInt(rating) : null,
            session_date
        });
        res.status(201).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.put('/api/sessions/:id', async (req, res) => {
    try {
        const sessionId = parseInt(req.params.id);
        const { topic, duration, rating } = req.body;
        const result = await db.updateSession(sessionId, {
            topic,
            duration: parseFloat(duration),
            rating: parseInt(rating)
        });
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

app.delete('/api/sessions/:id', async (req, res) => {
    try {
        const sessionId = parseInt(req.params.id);
        const result = await db.deleteSession(sessionId);
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});