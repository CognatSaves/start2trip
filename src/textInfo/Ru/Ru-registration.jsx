const registration = {
    lang: 'RUS',
    forgotPassword: {
        success: "Спасибо! Информация для смены пароля выслана на Ваш email.",
        passwordRepair: 'Восстановление пароля',
        placeholder: 'Введите адрес Вашей почты',
        forgotPasswordText: "Здесь вы можете восстановить ваш пароль",
        sendEmail: "Отправить на почту",
        goodAnswer: 'Отправлено, проверьте почту',
        wrongAnswer: 'Неверная почта',
        preSendText: 'На Вашу почту будет выслана ссылка для восстановления пароля.'
    },
    resetPassword: {
        newPasswordText: "Введите новый пароль для вашего аккаунта",
        firstPlaceholder: "Пароль",
        secondPlaceholder: "Повторите пароль",
        passwordChangeGood: "Пароль вашего аккаунта перезаписан",
        passwordChangeBad: 'Пароль вашего аккаунта перезаписать не удалось',
        errorLazy: 'Нет изменений',
        errorMatch: "Не совпадают пароли",
        sendRequest: 'Отправить данные'
    },
    customerCancel: {
        headerText: "Укажите, если это не приведёт к коллапсу вашей жизнедеятельности, причину отказа от поездки.",
        answerVariants: ['Нашёл дешевле.', 'Поменялись планы', 'Ничего из вышеперечисленного'],
        headerText: "Вы точно уверены что хотите отменить заказ?",
        ok: "Да",
        cancel: "Нет",
        error: "Произошла ошибка поездка уже была отменена или поездка не была создана. \n Попробуйте ещё раз или свяжитесь с нами.",
        success: "Вы успешно отменили поездку!",
        goHome: "На главную"
    }
}
export default registration;