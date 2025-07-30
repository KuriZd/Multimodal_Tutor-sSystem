import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../pages/register';

jest.mock('../scripts/servicesApiRegister', () => ({
    store: jest.fn(() => Promise.resolve({ message: 'Mocked success' })),
}));

import { store } from '../scripts/servicesApiRegister';

describe('Register component', () => {
    test('envía los datos correctamente al hacer submit', async () => {
        window.alert = jest.fn(); // 👈 mockeamos alert()

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText(/CURP/i), {
            target: { value: 'GOCJ000101HMSRRL01' },
        });

        fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), {
            target: { value: 'password123' },
        });

        fireEvent.change(screen.getByDisplayValue('Administrador'), {
            target: { value: 'P' },
        });

        fireEvent.click(screen.getByText(/Registrarse/i));

        await waitFor(() => {
            expect(store).toHaveBeenCalledWith(
                'GOCJ000101HMSRRL01',
                'password123',
                'P'
            );
            expect(window.alert).toHaveBeenCalledWith('Usuario registrado con éxito!');
        });
    });
});


