import { IRoute, IRouteArgument } from './route.interface.test';

export class AutomationTest {
  static contains(selector: string, value: string) {
    cy.get(selector).contains(value);
  }

  static firstContains(selector: string, value: string) {
    cy.get(selector).first().contains(value);
  }

  static get(selector: string): any {
    return cy.get(selector);
  }

  static click(selector: string, options?: any) {
    cy.get(selector).click(options);
  }

  static clickFirst(selector: string, options?: any) {
    cy.get(selector).first().click(options);
  }

  static clickLast(selector: string, options?: any) {
    cy.get(selector).last().click(options);
  }

  static visit(url: string) {
    cy.visit(url);
  }

  static assertEqual(expression: any, value: any) {
    assert.equal(expression, value);
  }

  static type(selector: string, typed: string) {
    cy.get(selector).type(typed);
  }

  static createServer() {
    cy.server();
  }

  static createRoute(route: IRoute) {
    cy.route({
      method: route.method,
      url: route.url,
    }).as(route.name);
  }

  static waitRouteByName(name: string) {
    return cy.wait('@' + name);
  }

  static clearCookies() {
    cy.clearCookies();
  }

  static select(selector: string, value: string) {
    cy.get(selector).select(value);
  }

  static waitAndCheckRoute(routeName: string, args: IRouteArgument[]) {
    const route = this.waitRouteByName(routeName)
      .its('url');
    for ( const argument of args) {
      route.should(argument.assertion, argument.value ?
        (argument.name + '=' + argument.value) :
        argument.name);
    }
  }

  static compareTranslation(htmlTag: string, translations: {key: string, value: string}[]) {
    this.get(htmlTag).invoke('attr', 'translations').then((translationsJSON: string) => {
      const t = JSON.parse(translationsJSON);
      for (const translation of translations) {
        this.assertEqual(t[translation.key], translation.value);
      }
    });
  }

  static checkSelectedValue(selector: string, value: string) {
    this.get(selector).should('have.value', value);
  }

  static checkExists(selector: string) {
    this.get(selector).should('exist');
  }

  static checkNotExists(selector: string) {
    this.get(selector).should('not.exist');
  }
}
