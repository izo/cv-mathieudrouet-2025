import type { APIRoute } from 'astro';
import { AuditSystem, formatAuditReport, exportAuditToJSON, createAuditSummary } from '../../utils/auditSystem';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const format = url.searchParams.get('format') || 'json';
    const download = url.searchParams.get('download') === 'true';
    
    // Run audit
    const auditSystem = new AuditSystem();
    const auditResult = await auditSystem.runAudit();
    
    let content: string;
    let contentType: string;
    let filename: string;
    
    const timestamp = new Date().toISOString().split('T')[0];
    
    switch (format.toLowerCase()) {
      case 'json':
        content = exportAuditToJSON(auditResult);
        contentType = 'application/json';
        filename = `audit-report-${timestamp}.json`;
        break;
        
      case 'markdown':
      case 'md':
        content = formatAuditReport(auditResult);
        contentType = 'text/markdown';
        filename = `audit-report-${timestamp}.md`;
        break;
        
      case 'csv':
        content = exportAuditToCSV(auditResult);
        contentType = 'text/csv';
        filename = `audit-report-${timestamp}.csv`;
        break;
        
      case 'summary':
        content = createAuditSummary(auditResult);
        contentType = 'text/plain';
        filename = `audit-summary-${timestamp}.txt`;
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid format. Supported: json, markdown, csv, summary' }),
          { 
            status: 400, 
            headers: { 'Content-Type': 'application/json' }
          }
        );
    }
    
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    };
    
    if (download) {
      headers['Content-Disposition'] = `attachment; filename="${filename}"`;
    }
    
    return new Response(content, {
      status: 200,
      headers
    });
    
  } catch (error) {
    console.error('Export error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate audit report',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

/**
 * Export audit result to CSV format
 */
function exportAuditToCSV(auditResult: any): string {
  const rows: string[] = [];
  
  // Header
  rows.push('Category,Check,Score,Status,Details,Suggestion');
  
  // Data rows
  auditResult.categories.forEach((category: any) => {
    category.checks.forEach((check: any) => {
      const row = [
        category.name,
        check.name,
        check.score,
        check.status,
        `"${check.details.replace(/"/g, '""')}"`,
        `"${(check.suggestion || '').replace(/"/g, '""')}"`
      ];
      rows.push(row.join(','));
    });
  });
  
  return rows.join('\n');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { schedule = false, webhook = null } = body;
    
    // Run audit
    const auditSystem = new AuditSystem();
    const auditResult = await auditSystem.runAudit();
    
    // If webhook provided, send results
    if (webhook) {
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: auditResult.timestamp,
            score: auditResult.overallScore,
            grade: auditResult.overallGrade,
            riskLevel: auditResult.riskAssessment.overall,
            categories: auditResult.categories.map(cat => ({
              name: cat.name,
              score: cat.score,
              status: cat.status
            })),
            recommendations: auditResult.recommendations.length,
            url: new URL(request.url).origin + '/audit'
          })
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Audit completed successfully',
        score: auditResult.overallScore,
        grade: auditResult.overallGrade,
        timestamp: auditResult.timestamp,
        recommendations: auditResult.recommendations.length
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('Audit API error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to run audit',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};