describe('Todo App E2E Testing', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/todos*', {
            statusCode: 200,
            body: [
                { id: 1, title: 'Tugas dari API Palsu', completed: false }
            ]
        }).as('fetchTodos');

        cy.visit('/');

        cy.wait('@fetchTodos');
    });

    it('menambahkan tugas baru', () => {
        const todoBaru = 'Belajar End-to-End Testing';

        cy.get('input[placeholder="Tambah tugas baru"]').type(`${todoBaru}{enter}`);

        cy.contains(todoBaru).should('be.visible');
    });

    it('mencentang tugas menjadi selesai', () => {
        cy.contains('Tugas dari API Palsu')
            .parent()
            .find('button').first()
            .click();

        cy.contains('Tugas dari API Palsu').should('have.class', 'line-through');
    });

    it('menghapus tugas', () => {
        cy.contains('Tugas dari API Palsu')
            .parent()
            .find('button').last()
            .click();

        cy.contains('Tugas dari API Palsu').should('not.exist');
    });

    it('seharusnya berfungsi dengan baik di layar HP (Mobile)', () => {
        cy.viewport('iphone-x');

        cy.get('input[placeholder="Tambah tugas baru"]').should('be.visible').type('Tugas Mobile{enter}');
        cy.contains('Tugas Mobile').should('be.visible');
    });
});