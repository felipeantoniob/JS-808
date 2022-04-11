/// <reference types="cypress" />

describe('drum machine app', () => {
  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        cy.spy(win.HTMLAudioElement.prototype, 'play')
      },
    })
  })

  it('has a heading of DRUM MACHINE', () => {
    cy.get('[data-cy=title]').contains('DRUM MACHINE')
  })

  it('has 16 drum pads', () => {
    cy.get('[data-cy=drum-pads]').children().should('have.length', 16)
  })

  it('has a default volume of 50%', () => {
    cy.get('input[type=range]').should('have.value', '0.5')
  })

  it('can adjust the volume slider', () => {
    cy.get('input[type=range]').invoke('val', 1).trigger('change')
    cy.get('input[type=range]').should('have.value', '1')
  })

  it('drum pad should play audio file', () => {
    // cy.visit('/', {
    //   onBeforeLoad: (win) => {
    //     cy.spy(win.HTMLAudioElement.prototype, 'play')
    //   },
    // })

    cy.window().then((win) => {
      expect(win.HTMLAudioElement.prototype.play).not.called
    })

    cy.get('[data-cy=KeyA]').click()
    cy.window().then((win) => {
      expect(win.HTMLAudioElement.prototype.play).called
    })
  })
})
