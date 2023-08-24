const convertFirebaseErrorCodeToMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-exists':
      return 'Girdiğiniz email adresi başka bir hesap tarafından kullanılmaktadır. Lütfen hesabınıza giriş yapın veya başka bir email adresi ile kayıt olunuz.';
    case 'auth/invalid-email':
      return 'Girdiğiniz email adresi veya şifre geçersiz. Lütfen geçerli bir email adresi ve şifre giriniz.';
    case 'auth/wrong-password':
      return 'Girdiğiniz email adresi veya şifre geçersiz. Lütfen geçerli bir email adresi ve şifre giriniz.';
    case 'auth/invalid-password':
      return 'Girdiğiniz email adresi veya şifre geçersiz. Lütfen geçerli bir email adresi ve şifre giriniz.';
    case 'auth/user-not-found':
      return 'Girdiğiniz email adresi veya şifre geçersiz. Lütfen geçerli bir email adresi ve şifre giriniz.';
    case 'auth/too-many-requests':
      return 'Çok fazla giriş denemesi yaptınız. Lütfen daha sonra tekrar deneyiniz.';
    case 'auth/user-disabled':
      return 'Hesabınız devre dışı bırakılmıştır. Lütfen destek ile iletişime geçiniz.';
    case 'auth/network-request-failed':
      return 'İşleminiz başarısız oldu. Lütfen internet bağlantınızı kontrol ediniz.';
    case 'auth/email-already-in-use':
      return 'Girdiğiniz email adresi başka bir hesap tarafından kullanılmaktadır. Lütfen hesabınıza giriş yapın veya başka bir email adresi ile kayıt olunuz.';
    default:
      return 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.';
  }
};

export { convertFirebaseErrorCodeToMessage };
