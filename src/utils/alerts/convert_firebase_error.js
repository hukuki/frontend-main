const convertFirebaseErrorCodeToMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-exists':
            return "Girdiğiniz email adresi zaten kayıtlı. Lütfen başka bir email adresi giriniz."
        case "auth/invalid-email":
            return "Girdiğiniz email adresi geçersiz. Lütfen geçerli bir email adresi giriniz."
        case "auth/wrong-password":
            return "Girdiğiniz şifre geçersiz. Lütfen geçerli bir şifre giriniz."
        case "auth/invalid-password":
            return "Girdiğiniz şifre geçersiz. Lütfen geçerli bir şifre giriniz."
        case "auth/user-not-found":
            return "Girdiğiniz email adresi ile kayıtlı bir kullanıcı bulunamadı. Lütfen kayıt olunuz."
        case "auth/too-many-requests":
            return "Çok fazla giriş denemesi yaptınız. Lütfen daha sonra tekrar deneyiniz."
        case "auth/user-disabled":
            return "Hesabınız devre dışı bırakılmıştır. Lütfen destek ile iletişime geçiniz."
        case "auth/network-request-failed":
            return "İnternet bağlantınızı kontrol ediniz."
        case "auth/email-already-in-use":
            return "Girdiğiniz email adresi zaten kayıtlı. Lütfen başka bir email adresi giriniz."
        default:
            return "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."

    }
}

export { convertFirebaseErrorCodeToMessage }