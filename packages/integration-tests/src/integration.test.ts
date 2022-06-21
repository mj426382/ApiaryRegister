import { expect, test } from '@playwright/test'
import 'dotenv/config'
import { createRandomName } from './utils'

const FRONTEND_URL = process.env.FRONTEND_URL

test.describe('Integration tests', () => {
    test('can switch page', async ({ page }) => {
        await page.goto(FRONTEND_URL)

        await page.click('xpath=//button[contains(text(), "Add")]')
        expect(page.url()).toBe(`${FRONTEND_URL}add`)

        await page.click('xpath=//button[contains(text(), "Home")]')
        expect(page.url()).toBe(`${FRONTEND_URL}`)
    })

    test('can add apiary', async ({ page }) => {
        await page.goto(FRONTEND_URL)
        const apiaryName = createRandomName()

        await page.click('xpath=//button[contains(text(), "Add")]')
        await page.fill('xpath=//*[@id="outlined-basic-label"]', apiaryName)
        
        await page.click('xpath=//*[@id="root"]/button')
        await page.isVisible(`xpath=//div[contains(string(), "Apiary ${apiaryName} was added")]`)

        await page.click('xpath=//button[contains(text(), "Home")]')
        await page.isVisible(`xpath=//div[contains(string(), "${apiaryName}")]`)
    })
})
