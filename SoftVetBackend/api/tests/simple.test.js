// Test simple para verificar que Jest funciona
describe('Test simple de Jest', () => {
    test('debería sumar correctamente', () => {
        expect(2 + 2).toBe(4);
    });

    test('debería manejar strings correctamente', () => {
        expect('Hola Mundo').toContain('Mundo');
    });

    test('debería manejar arrays correctamente', () => {
        const array = [1, 2, 3, 4, 5];
        expect(array).toHaveLength(5);
        expect(array).toContain(3);
    });

    test('debería manejar objetos correctamente', () => {
        const obj = { nombre: 'Juan', edad: 30 };
        expect(obj.nombre).toBe('Juan');
        expect(obj.edad).toBe(30);
    });
}); 