document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm.querySelector('button[name="submit-form"]');
    
    // Обработчик клика по кнопке
    submitBtn.addEventListener('click', async function(e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы
        
        // Проверяем валидность формы
        if (!contactForm.checkValidity()) {
            // Если форма не валидна, показываем сообщения об ошибках
            contactForm.reportValidity();
            return;
        }
        
        // Проверяем чекбокс
        const checkbox = document.getElementById('checkbox');
        if (!checkbox.checked) {
            alert('Please agree to save your information');
            return;
        }
        
        // Собираем данные формы
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('username'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            agree: checkbox.checked
        };
        
        try {
            // Показываем loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Отправляем на сервер
            const response = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Успешная отправка
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Error: ' + result.message);
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Network error. Please try again.');
        } finally {
            // Восстанавливаем кнопку
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
});