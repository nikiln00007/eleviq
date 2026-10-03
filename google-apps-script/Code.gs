/**
 * Eleviq - Google Sheets RSVP / Contact Form Integration
 * Google Apps Script Web App Endpoint
 *
 * Security & Features:
 * 1. Server-side validation and sanitization
 * 2. Protection against CSV/Spreadsheet Formula Injection (OWASP standard)
 * 3. Concurrency lock to prevent duplicate/corrupted row appends
 * 4. Automatic header initialization & dynamic column matching
 * 5. Server-generated timestamp
 * 6. Safe JSON responses with CORS support
 */

// Configuration: Optional target sheet/tab name. If blank, the active/first sheet is used.
var SHEET_NAME = 'RSVPs';

/**
 * Handle HTTP GET requests (Health check / testing)
 */
function doGet(e) {
  return createJsonResponse({
    status: 'ok',
    service: 'Eleviq RSVP Service',
    message: 'Backend endpoint is active and ready to accept POST requests.'
  });
}

/**
 * Handle HTTP POST requests (Form submissions)
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  // Wait up to 10 seconds for concurrent requests
  try {
    var hasLock = lock.tryLock(10000);
    if (!hasLock) {
      return createJsonResponse({
        success: false,
        error: 'Server is busy processing another request. Please try again in a moment.'
      });
    }

    // 1. Verify and parse request payload
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        error: 'Invalid request: No payload received.'
      });
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        error: 'Malformed JSON payload.'
      });
    }

    // 2. Validate input fields server-side
    var validationError = validatePayload(payload);
    if (validationError) {
      return createJsonResponse({
        success: false,
        error: validationError
      });
    }

    // 3. Sanitize and prepare data (Formula injection prevention + length trimming)
    var sanitized = {
      timestamp: new Date().toISOString(),
      name: sanitizeString(payload.name, 100),
      email: sanitizeString(payload.email, 120),
      phone: sanitizeString(payload.phone, 30),
      company: sanitizeString(payload.company, 100),
      service: sanitizeString(payload.service || payload.event, 100),
      event: sanitizeString(payload.event || payload.service, 100),
      budget: sanitizeString(payload.budget, 50),
      timeline: sanitizeString(payload.timeline, 50),
      guests: sanitizeString(payload.guests, 20),
      message: sanitizeString(payload.description || payload.message, 2000),
      description: sanitizeString(payload.description || payload.message, 2000)
    };

    // 4. Access Google Spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      return createJsonResponse({
        success: false,
        error: 'Internal configuration error: Spreadsheet not bound to script.'
      });
    }

    var sheet = SHEET_NAME ? spreadsheet.getSheetByName(SHEET_NAME) : null;
    if (!sheet) {
      sheet = spreadsheet.getActiveSheet();
      if (SHEET_NAME && sheet.getName() === 'Sheet1') {
        sheet.setName(SHEET_NAME);
      }
    }

    // 5. Initialize or inspect headers
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();

    var defaultHeaders = [
      'Timestamp',
      'Name',
      'Email',
      'Phone',
      'Company',
      'Service / Event',
      'Budget',
      'Timeline',
      'Guests',
      'Message'
    ];

    if (lastRow === 0 || lastCol === 0) {
      // Sheet is empty - add default header row
      sheet.appendRow(defaultHeaders);
      formatHeaderRow(sheet, defaultHeaders.length);
      lastRow = 1;
      lastCol = defaultHeaders.length;
    }

    // Read current headers
    var headers = sheet.getRange(1, 1, 1, Math.max(lastCol, 1)).getValues()[0];

    // 6. Map payload values according to existing headers
    var rowData = headers.map(function(header) {
      var h = String(header).trim().toLowerCase();

      if (h.indexOf('time') !== -1 || h.indexOf('date') !== -1) {
        return sanitized.timestamp;
      }
      if (h === 'name' || h.indexOf('full name') !== -1) {
        return sanitized.name;
      }
      if (h.indexOf('email') !== -1) {
        return sanitized.email;
      }
      if (h.indexOf('phone') !== -1) {
        return sanitized.phone;
      }
      if (h.indexOf('company') !== -1) {
        return sanitized.company;
      }
      if (h.indexOf('event') !== -1) {
        return sanitized.event;
      }
      if (h.indexOf('service') !== -1) {
        return sanitized.service;
      }
      if (h.indexOf('budget') !== -1) {
        return sanitized.budget;
      }
      if (h.indexOf('timeline') !== -1) {
        return sanitized.timeline;
      }
      if (h.indexOf('guest') !== -1) {
        return sanitized.guests;
      }
      if (h.indexOf('message') !== -1 || h.indexOf('description') !== -1 || h.indexOf('note') !== -1) {
        return sanitized.message;
      }
      return '';
    });

    // If headers didn't match any columns (fallback)
    var hasMappedValues = rowData.some(function(v) { return v !== ''; });
    if (!hasMappedValues) {
      rowData = [
        sanitized.timestamp,
        sanitized.name,
        sanitized.email,
        sanitized.phone,
        sanitized.company,
        sanitized.service,
        sanitized.budget,
        sanitized.timeline,
        sanitized.guests,
        sanitized.message
      ];
    }

    // 7. Append row to sheet
    sheet.appendRow(rowData);

    return createJsonResponse({
      success: true,
      message: 'RSVP recorded successfully.'
    });

  } catch (err) {
    // Log internally in Apps Script execution log without leaking to client
    console.error('Submission error:', err.toString());
    return createJsonResponse({
      success: false,
      error: 'An unexpected error occurred while saving your RSVP. Please try again.'
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Validates the incoming payload
 */
function validatePayload(data) {
  if (!data || typeof data !== 'object') {
    return 'Invalid data format.';
  }

  var name = String(data.name || '').trim();
  if (!name) {
    return 'Name is required.';
  }
  if (name.length > 100) {
    return 'Name must not exceed 100 characters.';
  }

  var email = String(data.email || '').trim();
  if (!email) {
    return 'Email is required.';
  }
  if (email.length > 120) {
    return 'Email must not exceed 120 characters.';
  }
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email address format.';
  }

  var description = String(data.description || data.message || '').trim();
  if (!description) {
    return 'Project description or message is required.';
  }
  if (description.length > 2000) {
    return 'Message must not exceed 2000 characters.';
  }

  return null;
}

/**
 * Sanitizes string input to prevent Spreadsheet Formula Injection (CSV injection).
 * If a value starts with =, +, -, @, \t, or \r, prepends a single quote (').
 */
function sanitizeString(val, maxLength) {
  if (val === null || val === undefined) return '';
  var str = String(val).trim();
  if (maxLength && str.length > maxLength) {
    str = str.substring(0, maxLength);
  }
  // Formula injection defense: prepend single quote so spreadsheet treats it as text
  if (/^[\=\+\-\@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

/**
 * Sets bold styling and subtle background on header row
 */
function formatHeaderRow(sheet, numCols) {
  try {
    var range = sheet.getRange(1, 1, 1, numCols);
    range.setFontWeight('bold');
    range.setBackground('#F3F4F6');
    sheet.setFrozenRows(1);
  } catch (e) {
    // Non-critical formatting error
  }
}

/**
 * Creates a JSON response with appropriate headers
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
