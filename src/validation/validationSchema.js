import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no mínimo 3 caracteres')
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas não coincidem')
      .required('Confirmação de senha é obrigatória'),
  });

export default validationSchema;
