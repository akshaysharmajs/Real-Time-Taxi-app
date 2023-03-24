
const logIn = () => {
    const { username, password } = Cypress.env('credentials');
  
    // Capture HTTP requests.
    cy.intercept('POST', 'log_in', {
      statusCode: 200,
      body: {
        'access': 'ACCESS_TOKEN',
        'refresh': 'REFRESH_TOKEN'
      }
    }).as('logIn');
  
    // Log into the app.
    cy.visit('/#/log-in');
    cy.get('input#username').type(username);
    cy.get('input#password').type(password, { log: false });
    cy.get('button').contains('Log in').click();
    cy.wait('@logIn');
  };


  describe('Authentication', function () {
    it('Can log in.', function () {
      logIn();
      cy.hash().should('eq', '#/');
      cy.get('button').contains('Log out');
    });
  
    it('Cannot visit the login page when logged in.', function () {
      logIn();
      cy.visit('/#/log-in');
      cy.hash().should('eq', '#/');
    });
  
    it('Cannot see links when logged in.', function () {
      logIn();
      cy.get('[data-cy="signUp"]').should('not.exist');
      cy.get('[data-cy="logIn"]').should('not.exist');
    });
  
    // not changed.
    it('Can sign up.', function () {
      // Hidden for clarity.
    });
  
    it('Cannot visit the sign up page when logged in.', function () {
      logIn();
      cy.visit('/#/sign-up');
      cy.hash().should('eq', '#/');
    });

    it('Shows an alert on login error.', function () {
        const { username, password } = Cypress.env('credentials');
        cy.intercept('POST', 'log_in', {
          statusCode: 400,
          body: {
            __all__: [
              'Please enter a correct username and password. ' +
              'Note that both fields may be case-sensitive.'
            ]
          }
        }).as('logIn');
        cy.visit('/#/log-in');
        cy.get('input#username').type(username);
        cy.get('input#password').type(password, { log: false });
        cy.get('button').contains('Log in').click();
        cy.wait('@logIn');
        cy.get('div.alert').contains(
          'Please enter a correct username and password. ' +
          'Note that both fields may be case-sensitive.'
        );
        cy.hash().should('eq', '#/log-in');
      });

      it('Can log out.', function () {
        logIn();
        cy.get('[data-cy="logOut"]').click().should(() => {
          expect(window.localStorage.getItem('taxi.auth')).to.be.null;
        });
        cy.get('[data-cy="logOut"]').should('not.exist');
      });
      
  });
  