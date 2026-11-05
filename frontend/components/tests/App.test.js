// 👇 YOUR WORK STARTS ON LINE 19
import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../../backend/mock-server'
import App from '../App'

describe('Stranger Things App', () => {
  let user
  afterEach(() => { server.resetHandlers() })
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(() => {
    render(<App />)
    user = userEvent.setup()
  })
  test('App mounts without crashing', () => {
    // 👉 TASK: print the simulated DOM using screen.debug
    screen.debug()
  })
  test('App renders the correct texts', async () => {
    // 👉 TASK: click on the button that displays "Press to Get Show Data"
    const button = screen.getByText(/Press to Get Show Data/i)
    await user.click(button)
    
    // 👉 TASK: create a waitFor and await for the following to be true:
    //    - The text "Press to Get Show Data" is no longer in the DOM
    //    - The text "Stranger Things" exists in the DOM
    //    - The text "A love letter to the '80s classics that captivated a generation" exists in the DOM
    //    - The text "Select A Season" exists in the DOM
    // ❗ You will need { exact: false } to select the longer text
    await waitFor(() => {
      expect(screen.queryByText(/Press to Get Show Data/i)).not.toBeInTheDocument()
      expect(screen.getByText('Stranger Things')).toBeInTheDocument()
      expect(screen.getByText('Select A Season')).toBeInTheDocument()
      expect(screen.getByText(`A love letter to the '80s classics that captivated a generation`, { exact: false })).toBeInTheDocument()
    })
   
    // 👉 TASK: select Season 2 from the dropdown
    // ❗ Don't forget user actions need the await keyword
    // ❗ Use the selectOptions user action
    // ❗ Grab the select element using querySelector
    const dropdown = document.querySelector('#seasons')
    await user.selectOptions(dropdown, '1')
    
    // 👉 TASK: create the following assertions:
    //    - The text "Season 2, Episode 1" exists in the DOM
    //    - The text "Chapter One: MADMAX" exists in the DOM
    //    - The text "One year after the events with the Upside Down and the Demogorgon" exists in the DOM
    // ❗ You will need { exact: false } to select the longer text
    expect(screen.getByText("Season 2, Episode 1")).toBeInTheDocument()
    expect(screen.getByText("Chapter One: MADMAX")).toBeInTheDocument()
    expect(screen.getByText("One year after the events with the Upside Down and the Demogorgon", { exact: false })).toBeInTheDocument()
  })
})
