const puppeteer = require('puppeteer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  let browser = null;

  try {
    // Launch Puppeteer with optimized settings for Netlify
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    
    // Get the site URL from environment or use the current site
    const siteUrl = process.env.URL || 'https://cv-mathieudrouet-fixed.windsurf.build';
    
    // Navigate to the CV page
    await page.goto(`${siteUrl}?pdf=true`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for content to load
    await page.waitForSelector('main', { timeout: 10000 });
    
    // Add PDF-specific styles
    await page.addStyleTag({
      content: `
        /* PDF-specific styles */
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        /* Hide elements not needed in PDF */
        footer,
        .no-pdf,
        button,
        [onclick],
        .glass-card footer {
          display: none !important;
        }
        
        /* Optimize layout for PDF */
        .glass-card {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }
        
        /* Ensure proper page breaks */
        .cv-section {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        /* Optimize typography for print */
        body {
          font-size: 12px !important;
          line-height: 1.4 !important;
        }
        
        h1 { font-size: 24px !important; }
        h2 { font-size: 18px !important; }
        h3 { font-size: 16px !important; }
        
        /* Ensure logos and icons are visible */
        img, iconify-icon {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        /* Optimize spacing for PDF */
        .container {
          max-width: none !important;
          padding: 20px !important;
        }
      `
    });

    // Generate PDF with high quality settings
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: `
        <div style="font-size: 10px; color: #666; width: 100%; text-align: center; margin: 0 15mm;">
          <span>Mathieu Drouet - CV Professionnel - Page <span class="pageNumber"></span> sur <span class="totalPages"></span></span>
        </div>
      `
    });

    // Return PDF as base64
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV-Mathieu-Drouet.pdf"',
        'Cache-Control': 'no-cache'
      },
      body: pdf.toString('base64'),
      isBase64Encoded: true
    };

  } catch (error) {
    console.error('PDF generation error:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Failed to generate PDF',
        message: error.message
      })
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
