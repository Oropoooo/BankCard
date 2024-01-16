// Функция для автозаполнения имени в карточке
function updateCardHolderName() {
    const cardHolderNameInput = document.getElementById('cardholdername');
    const cardHolderNameSpan = document.getElementById('card-holder-name');
    const nameErrorMsg = document.getElementById('name-error-msg');
    const nameWarningMsg = document.getElementById('name-warning-msg');

    const value = cardHolderNameInput.value.trim();
    if (value.length > 0) {
        const formattedValue = value.length > 20 ? value.substring(0, 20).toUpperCase() : value.toUpperCase();
        cardHolderNameSpan.textContent = formattedValue;
        nameErrorMsg.style.display = 'none';
        nameWarningMsg.style.display = 'none';
    } else {
        cardHolderNameSpan.textContent = 'NAME SURNAME';
        nameErrorMsg.style.display = 'none';
        nameWarningMsg.style.display = 'block';
    }
}

// Функция для обработки ошибок в поле имени
function handleNameError(value) {
    const nameErrorMsg = document.getElementById('name-error-msg');
    const nameWarningMsg = document.getElementById('name-warning-msg');

    if (!/^[A-Za-z\s]+$/.test(value)) {
        nameErrorMsg.style.display = 'block';
        nameWarningMsg.style.display = 'none';
    } else {
        nameErrorMsg.style.display = 'none';
        nameWarningMsg.style.display = 'none';
    }
}

// Функция для обработки ошибок в полях CARD NUMBER, Exp. Date (MM/YY) и CARD CVC
function handleInputErrors(inputElement, errorMsgElement, isValidRegex, errorMsg) {
    const inputValue = inputElement.value.trim();
    const isValid = isValidRegex.test(inputValue);

    if (!isValid) {
        errorMsgElement.style.display = 'block';
    } else {
        errorMsgElement.style.display = 'none';
    }

    return isValid;
}

// Функция для автозаполнения номера карты в карточке в реальном времени
function updateCardNumber() {
    const cardNumberInput = document.getElementById('Cardnumber');
    const cardNumberSpan = document.getElementById('card-number');
    const numberErrorMsg = document.getElementById('number-error-msg');
    const numberWarningMsg = document.getElementById('number-warning-msg');

    const value = cardNumberInput.value.trim().replace(/\s/g, ''); // Удаляем пробелы из номера карты
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    if (/^\d{0,16}$/.test(value)) {
        cardNumberSpan.textContent = formattedValue || '0000 0000 0000 0000';
        numberErrorMsg.style.display = 'none';
        numberWarningMsg.style.display = 'none';
    } else {
        cardNumberSpan.textContent = '0000 0000 0000 0000';
        numberErrorMsg.style.display = 'block';
        numberWarningMsg.style.display = 'none';
    }
}

// Ограничение ввода для имени
document.getElementById('cardholdername').addEventListener('input', function (event) {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^A-Za-z\s]/g, ''); // Разрешаем только буквы и пробелы

    if (sanitizedValue.length > 20) {
        event.target.value = sanitizedValue.slice(0, 20); // Ограничиваем ввод 20 символами
    } else {
        event.target.value = sanitizedValue;
    }

    updateCardHolderName(); // Обновляем данные на карте после изменения имени
    handleNameError(sanitizedValue); // Обрабатываем ошибки в поле имени
});

// Добавление отступов каждые 4 цифры для номера карты в реальном времени
document.getElementById('Cardnumber').addEventListener('input', function (event) {
    const inputElement = event.target;
    const errorMsgElement = document.getElementById('number-error-msg');
    const isValidRegex = /^\d*$/;

    if (handleInputErrors(inputElement, errorMsgElement, isValidRegex, 'Wrong format, number only')) {
        const sanitizedValue = inputElement.value.replace(/\s/g, '');
        inputElement.value = sanitizedValue.replace(/^\d{4} \d{4} \d{4} \d{4}$/);
        updateCardNumber(); // Обновляем данные на карте после изменения номера карты
    }
});
// Добавлены привязки для других полей и обновление данных на карте
document.getElementById('Cardmonth').addEventListener('input', function (event) {
    const inputElement = event.target;
    const errorMsgElement = document.getElementById('date-error-msg');
    const isValidRegex = /^\d*$/;

    if (handleInputErrors(inputElement, errorMsgElement, isValidRegex, 'Wrong format, number only')) {
        inputElement.value = inputElement.value.replace(/\D/g, '').slice(0, 2);
        updateCardDetails();
    }
});

document.getElementById('Cardyear').addEventListener('input', function (event) {
    const inputElement = event.target;
    const errorMsgElement = document.getElementById('date-error-msg');
    const isValidRegex = /^\d*$/;

    if (handleInputErrors(inputElement, errorMsgElement, isValidRegex, 'Wrong format, number only')) {
        inputElement.value = inputElement.value.replace(/\D/g, '').slice(0, 2);
        updateCardDetails();
    }
});

document.getElementById('CVC').addEventListener('input', function (event) {
    const inputElement = event.target;
    const errorMsgElement = document.getElementById('cvc-error-msg');
    const isValidRegex = /^\d*$/;

    if (handleInputErrors(inputElement, errorMsgElement, isValidRegex, 'Wrong format, number only')) {
        inputElement.value = inputElement.value.replace(/\D/g, '').slice(0, 3);
        updateCardDetails();
    }
});

// Функция для обновления даты и CVC на карте
function updateCardDetails() {
    const cardDateInput = document.getElementById('Cardmonth');
    const cardYearInput = document.getElementById('Cardyear');
    const cardCVCInput = document.getElementById('CVC');
    const cardDateSpan = document.getElementById('card-date');
    const cardCVCspan = document.getElementById('card-cvc');

    const dateValue = cardDateInput.value.trim();
    const yearValue = cardYearInput.value.trim();
    const cvcValue = cardCVCInput.value.trim();

    cardDateSpan.textContent = dateValue.length > 0 ? (dateValue.length > 1 ? dateValue.substring(0, 2) : '0' + dateValue[0]) + '/' + (yearValue.length > 0 ? (yearValue.length > 1 ? yearValue.substring(0, 2) : '0' + yearValue[0]) : 'YY') : '00/00';
    cardCVCspan.textContent = cvcValue.length > 0 ? cvcValue : '000';
}

// Инициализация обновления данных на карте
updateCardHolderName();
updateCardNumber();
updateCardDetails();

document.getElementById('confirm').addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращает отправку формы

    const formElement = document.querySelector('form');
    const confirmationElement = document.querySelector('.confirmation');

    formElement.style.display = 'none';
    confirmationElement.style.display = 'block';
});

