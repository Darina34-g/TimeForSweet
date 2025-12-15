
document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.querySelector('.autorize form');
    const loginInput = document.getElementById('text');
    const passwordInput = document.getElementById('password');
    
    if (authForm) {
        authForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const login = loginInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!validateLogin(login)) {
                showAuthError('Логин должен содержать только буквы и быть не более 10 символов');
                loginInput.focus();
                return;
            }
            
            if (!validatePassword(password)) {
                showAuthError('Пароль должен быть от 6 до 10 символов');
                passwordInput.focus();
                return;
            }
            
            showAuthSuccess('Вход выполнен успешно!');
            
            setTimeout(() => { this.submit(); }, 1000);
        });
    }
    
    function validateLogin(login) {
        if (login.length === 0) return false;
        
        const loginRegex = /^[a-zA-Zа-яА-ЯёЁ]{1,10}$/;
        return loginRegex.test(login);
    }
    
    function validatePassword(password) {
        return password.length >= 6 && password.length <= 10;
    }
    
    function showAuthError(message) {
        if (typeof showSweetAlert === 'function') {
            showSweetAlert('Ошибка авторизации', message);
        } else {
            alert('Ошибка: ' + message);
        }
    }
    
    function showAuthSuccess(message) {
        if (typeof showSweetAlert === 'function') {
            showSweetAlert('Успешно!', message);
        } else {
            alert('Успех: ' + message);
        }
    }
    
    if (loginInput) {
        loginInput.addEventListener('input', function() {
            const value = this.value;
            
            const lettersOnly = value.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, '');
            this.value = lettersOnly;
            
            if (this.value.length > 10) {
                this.value = this.value.substring(0, 10);
            }
        });
        
        loginInput.addEventListener('focus', function() {
            if (!this.hasAttribute('data-title-shown')) {
                showAuthError('Логин: только буквы, до 10 символов');
                this.setAttribute('data-title-shown', 'true');
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const value = this.value;
            
            if (value.length > 10) {
                this.value = value.substring(0, 10);
                showAuthError('Максимум 10 символов для пароля');
            }
        });
        
        passwordInput.addEventListener('focus', function() {
            if (!this.hasAttribute('data-title-shown')) {
                showAuthError('Пароль: от 6 до 10 символов');
                this.setAttribute('data-title-shown', 'true');
            }
        });
    }
});