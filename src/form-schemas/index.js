import * as yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[!.,@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

// Password rules forced by the RegEx:
//  At least one digit
//  At least one lowercase letter
//  At least one uppercase letter
//  At least one special character
//  At least 8, at most 32 characters long

export const RegistrationSchema = yup.object().shape({
  firstname: yup.string().min(2, 'İsim en az 2 harf içermelidir').required('Lütfen geçerli bir isim giriniz.'),
  lastname: yup.string().min(2, 'Soyisim en az 2 harf içermelidir').required('Lütfen geçerli bir soyisim giriniz.'),
  username: yup.string().min(3, 'Kullanıcı adı en az 3 harf içermelidir').required('Lütfen geçerli bir kullanıcı adı giriniz.'),
  email: yup.string().email('Lütfen geçerli bir e-posta adresi giriniz.').required('Lütfen geçerli bir e-posta adresi giriniz'),
  password: yup
    .string()
    .min(8, 'Şifreniz en az 8 karakter içermelidir.')
    .matches(passwordRegex, {
      message: 'Şifreniz en az 1 sayı, en az 1 küçük karakter, en az 1 büyük karater ve en az 1 özel karakterden oluşmalıdır',
    })
    .max(32, 'Şifreniz 32 karakterden daha uzun olmamalıdır.')
    .required('Lütfen geçerli bir şifre giriniz.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler uyuşmamaktadır.')
    .required('Lütfen şifrenizi tekrar giriniz.'),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Lütfen geçerli bir e-posta adresi giriniz.').required('Lütfen e-postanızı giriniz.'),
  password: yup.string().required('Lütfen şifrenizi giriniz'),
});

export const SpaceSchema = yup.object().shape({
  name: yup.string().required('Lütfen bir proje ismi giriniz'),
  description: yup.string().required(),
});

export const FeedbackSchema = yup.object().shape({
  firstname: yup.string().required('Lütfen isminizi giriniz.'),
  lastname: yup.string().required('Lütfen soyisminizi giriniz.'),
  email: yup.string().email('Lütfen geçerli bir email adresi giriniz.').required('Lütfen geçerli bir email adresi giriniz'),
  message: yup
    .string()
    .min(100, 'Lütfen 100 karakterden daha fazla bir mesaj giriniz.')
    .max(1000, 'Lütfen en fazla 1000 karakterden oluşan bir mesaj giriniz.')
    .required('Lütfen mesajınızı girmeyi unutmayın.'),
});
