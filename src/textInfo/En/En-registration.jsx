const registration = {
        lang: 'ENG',
        forgotPassword: {
                success: "Thank you! Information for changing the password has been sent to your email.",
                passwordRepair: 'Reset your password',
                placeholder: 'Enter your email',
                forgotPasswordText: "You can reset your password here",
                sendEmail: "Reset a password",
                goodAnswer: 'Sent, check your email',
                wrongAnswer: 'Invalid email',
                preSendText: 'A link to reset your password will be sent to your email'
        },
        resetPassword: {
                newPasswordText: "Enter a new password for your account",
                firstPlaceholder: "Password",
                secondPlaceholder: "Retype Password",
                passwordChangeGood: "Your account password has been changed",
                passwordChangeBad: 'Failed to rewrite your account password',
                errorLazy: 'No changes',
                errorMatch: "Passwords do not match",
                sendRequest: 'Send data'
        },
        customerCancel: {
                headerText: "Вы точно уверены что хотите отменить заказ?",
                ok: "Да",
                cancel: "Нет",
                error: "Произошла ошибка поездка уже была отменена или поездка не была создана. \n Попробуйте ещё раз или свяжитесь с нами.",
                success: "Вы успешно отменили поездку!"
        }
}
export default registration;
