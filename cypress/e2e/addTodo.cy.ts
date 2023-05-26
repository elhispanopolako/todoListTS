let taskName = 'task'
import { Task } from '../../src/index'
const date = new Date()
let tasks: Task[] = [
  {
    "id": "1f743313-7030-4a3d-aaa9-edf46693b901",
    "title": `${taskName}0`,
    "completed": false,
    "createdAt": date
  },
  {
    "id": "399fec37-9f56-4be9-9aeb-363c0007988f",
    "title": `${taskName}1`,
    "completed": false,
    "createdAt": date
  },
  {
    "id": "59b4b081-bb83-46d9-b0df-e63c295f46e5",
    "title": `${taskName}2`,
    "completed": false,
    "createdAt": date
  },
  {
    "id": "cf1b7642-a354-43c3-92f2-57de9bfbdf5b",
    "title": `${taskName}3`,
    "completed": false,
    "createdAt": date
  },
  {
    "id": "cc33868a-0c84-4fcc-9fa6-f741188541fe",
    "title": `${taskName}4`,
    "completed": false,
    "createdAt": date
  }
]
describe('Add todo tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should add one todo', () => {
    cy.get('h1').should('be.visible')
    cy.get('#new-task-title').type(taskName)
    cy.contains('Add').click()
    cy.get('label').should('have.text', taskName)
  })
  it('Should added 5 todo be visible after reload the page', () => {
    for (let i = 0; i < 5; i++) {
      cy.get('#new-task-title').type(taskName + i)
      cy.contains('Add').click()
      cy.get('li').eq(i).should('have.text', taskName + i)
    }
    cy.reload()
    cy.get('li').should('have.length', 5)
  })
  it('Should remove all added tasks with cookies todos', () => {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
    cy.reload()
    cy.get('li').should('have.length', tasks.length)
    cy.get('#clearAll').click()
    cy.reload()
    cy.get('li').should('not.exist')
  })
  it('should checked the completed tasks', () => {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
    cy.reload()
    cy.get('li').should('have.length', tasks.length)
    cy.get('label').eq(0).click()
    cy.reload()
    cy.get('li').eq(0).should('have.class', 'completed')
    cy.get('li.completed').should('have.css', 'text-decoration', 'line-through solid rgb(182, 182, 182)')
  })
})