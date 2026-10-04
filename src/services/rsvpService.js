/**
 * Eleviq RSVP / Contact Form Service
 * Communicates securely with the Google Apps Script Web App endpoint.
 */

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzKflvZYxnwr8CrKXh2aqfeJmXjAAAJBODWB0eVKHXr_HTZFHw-6NRfiofHJqoKhSpPzA/exec'

// Reasonable length limits
export const FIELD_LIMITS = {
  name: 100,
  company: 100,
  email: 120,
  phone: 30,
  service: 100,
  budget: 50,
  timeline: 50,
  description: 2000,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate form input on client side
 */
export function validateForm(form) {
  const errors = {}

  const name = (form.name || '').trim()
  if (!name) {
    errors.name = 'Full name is required'
  } else if (name.length > FIELD_LIMITS.name) {
    errors.name = `Full name must be under ${FIELD_LIMITS.name} characters`
  }

  const email = (form.email || '').trim()
  if (!email) {
    errors.email = 'Email is required'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address'
  } else if (email.length > FIELD_LIMITS.email) {
    errors.email = `Email must be under ${FIELD_LIMITS.email} characters`
  }

  if (!form.service) {
    errors.service = 'Please select a service'
  }

  const description = (form.description || '').trim()
  if (!description) {
    errors.description = 'Project description is required'
  } else if (description.length > FIELD_LIMITS.description) {
    errors.description = `Description must be under ${FIELD_LIMITS.description} characters`
  }

  if (form.phone && form.phone.trim().length > FIELD_LIMITS.phone) {
    errors.phone = `Phone number must be under ${FIELD_LIMITS.phone} characters`
  }

  if (form.company && form.company.trim().length > FIELD_LIMITS.company) {
    errors.company = `Company name must be under ${FIELD_LIMITS.company} characters`
  }

  return errors
}

/**
 * Sanitizes input strings before sending
 */
function sanitizeInput(val) {
  if (typeof val !== 'string') return ''
  return val.trim()
}

/**
 * Submits the RSVP/Inquiry data to Google Apps Script
 */
export async function submitRsvp(formData) {
  if (!SCRIPT_URL) {
    throw new Error('Submission failed. Please try again later.')
  }

  const payload = {
    name: sanitizeInput(formData.name),
    company: sanitizeInput(formData.company),
    email: sanitizeInput(formData.email),
    phone: sanitizeInput(formData.phone),
    service: sanitizeInput(formData.service),
    event: sanitizeInput(formData.service), // alias for event column
    budget: sanitizeInput(formData.budget),
    timeline: sanitizeInput(formData.timeline),
    description: sanitizeInput(formData.description),
    message: sanitizeInput(formData.description), // alias for message column
  }

  // 20-second timeout to accommodate Google Apps Script cold starts
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      // Using text/plain prevents the browser from sending a CORS preflight OPTIONS request,
      // which Google Apps Script web apps do not support.
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error('Submission failed. Please try again later.')
    }

    const result = await response.json()

    if (result && result.success) {
      return result
    } else {
      throw new Error('Submission failed. Please try again later.')
    }
  } catch (err) {
    clearTimeout(timeoutId)

    if (err.name === 'AbortError') {
      throw new Error('Submission timed out. Please check your connection and try again.')
    }

    // Network errors (e.g. offline, CORS blocked, DNS failure)
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error('Submission failed. Please check your connection and try again.')
    }

    throw err
  }
}
