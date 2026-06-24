const signInBtn = document.querySelector('#toggleSignIn');
const signUpBtn = document.querySelector('#toggleSignUp');

const signUpForm = document.querySelector('#sign-up-container');
const signInForm = document.querySelector('#sign-in-container');

const changeForm = (form1, form2) => {
  form1.classList.toggle('hide');
  form2.classList.toggle('hide');
}

signInBtn.addEventListener('click', () => {
  changeForm(signUpForm, signInForm);
});

signUpBtn.addEventListener('click', () => {
  changeForm(signUpForm, signInForm);
});