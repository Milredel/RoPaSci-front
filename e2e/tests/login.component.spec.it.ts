import { AutomationTest } from '../automation.test';

describe('Login E2E - Selector', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('http://localhost:4200/#/login');
  });

  it('should open alert error if form is empty', () => {
    AutomationTest.get('button').click();

    AutomationTest.contains('h2.swal2-title', 'Erreur');
    AutomationTest.contains('div.swal2-content', 'Le formulaire de connexion est invalide, veuillez corriger les erreurs svp.');
  });

  it('should mark field as required', () => {
    AutomationTest.get('input[id="username"]').focus();
    AutomationTest.get('input[id="password"]').focus();

    AutomationTest.get('button').click();

    AutomationTest.get('val-errors[controlname="username"]').find('div').contains('Ce champs est requis.');
    AutomationTest.get('val-errors[controlname="password"]').find('div').contains('Ce champs est requis.');
  });

  it('should open error alert if credentials are invalid', () => {
    cy.intercept({method: 'POST', url: '/auth/login'}, {statusCode: 401, message: 'Unauthorized'});

    AutomationTest.type('input[id="username"]', 'julien');
    AutomationTest.type('input[id="password"]', 'wrong_password');

    AutomationTest.get('button').click();

    AutomationTest.contains('h2.swal2-title', 'Erreur');
    AutomationTest.contains('div.swal2-content', 'Le couple identifiant/mot de passe ne correspond pas.');
  });

  it('should open success alert if credentials are valid', () => {
    cy.intercept({method: 'POST', url: '/auth/login'}, {statusCode: 201, body: {access_token: 'some jwt'}});

    AutomationTest.type('input[id="username"]', 'julien');
    AutomationTest.type('input[id="password"]', 'correct_password');

    AutomationTest.get('button').click();

    AutomationTest.contains('h2.swal2-title', 'Félicitations');
    AutomationTest.contains('div.swal2-content', 'Connexion à votre espace personnel réussie.');
  });
});
