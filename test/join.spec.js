import join from '../src/components/join';
import { createAccount } from '../src/lib/index';

jest.mock('../src/lib/index');

const navigateToMock = jest.fn();
const joinElement = join(navigateToMock);

describe('función Join', () => {
  beforeEach(() => {
    createAccount.mockClear();
  });

  test('Al hacer click tiene que ir a la pagina /login', () => {
    const btnReturn = joinElement.querySelector('.button-return');
    btnReturn.click();
    expect(navigateToMock).toHaveBeenCalledWith('/');
  });

  const joinForm = joinElement.querySelector('form');
  const emailInput = joinForm.querySelector('input[type="email"]');
  const passwordInput = joinForm.querySelector('input[type="password"]');
  const modalMessage = joinElement.querySelector('p');

  emailInput.value = 'test@example.com';
  passwordInput.value = '123456';

  test('Deberia llamar la función createAccount con dos parametros', async () => {
    createAccount.mockResolvedValue();
    joinForm.submit();
    expect(createAccount).toHaveBeenCalledWith('test@example.com', '123456');
    expect(modalMessage.textContent).toBe('Ingrese a tu correo para verificar tu cuenta.');
  });

  test('Debe mostrar mensaje de error en caso de fallo de creación de cuenta', async () => {
    createAccount.mockRejectedValue();
    joinForm.submit();
    expect(createAccount).toHaveBeenCalledWith('test@example.com', '123456');
    await new Promise((reject) => {
      setTimeout(() => reject(), 0);
    });
    expect(modalMessage.textContent).toBe('Ya existe una cuenta para ese correo electrónico o el correo es inválido.');
  });

  test('Al hacer click tiene que ir al login', () => {
    const close = joinElement.querySelector('span');
    close.click();
    expect(navigateToMock).toHaveBeenCalledWith('/login');
  });
});