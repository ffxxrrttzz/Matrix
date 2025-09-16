const express = require('express');
const cors = require('cors');
const app = express();


const port = 3000;

// Middleware для обработки данных форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
// Обработчик POST запроса для формы контактов
app.post('/contact', (req, res) => {
    const { name, email, subject, message, agree } = req.body;
    
    console.log('📧 New contact form submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Message:', message);
    console.log('Agreed to terms:', agree);
    
    res.json({
        success: true,
        message: 'Message received successfully!',
        timestamp: new Date().toISOString()
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
});