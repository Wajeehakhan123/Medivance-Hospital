import { AppointmentRequest } from '../types';

export function printAppointmentReceipt(request: AppointmentRequest) {
  const formattedDate = new Date(
    request.preferredDate + 'T00:00:00'
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const receiptHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Appointment Receipt - ${request.referenceNumber}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    body {
      background: #ffffff;
      color: #1e293b;
      padding: 30px;
      line-height: 1.5;
    }
    .receipt-container {
      max-width: 680px;
      margin: 0 auto;
      border: 2px solid #0284c7;
      border-radius: 12px;
      padding: 28px;
      background: #ffffff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 18px;
      margin-bottom: 20px;
    }
    .logo-section h1 {
      font-size: 22px;
      font-weight: 800;
      color: #0369a1;
      letter-spacing: -0.5px;
    }
    .logo-section p {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
    }
    .badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      border: 1px solid #bae6fd;
    }
    .reference-box {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ref-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #64748b;
      font-weight: 600;
    }
    .ref-number {
      font-size: 18px;
      font-family: monospace;
      font-weight: 700;
      color: #0f172a;
      margin-top: 2px;
    }
    .status-tag {
      background: #fef3c7;
      color: #92400e;
      border: 1px solid #fde68a;
      padding: 4px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
    }
    .section-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      font-weight: 700;
      color: #475569;
      margin-top: 18px;
      margin-bottom: 8px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 4px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px 20px;
    }
    .field-label {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
    }
    .field-value {
      font-size: 13px;
      font-weight: 600;
      color: #0f172a;
      margin-top: 2px;
    }
    .full-width {
      grid-column: 1 / -1;
    }
    .instructions {
      margin-top: 22px;
      background: #fefce8;
      border: 1px solid #fef08a;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 11px;
      color: #854d0e;
      line-height: 1.5;
    }
    .instructions strong {
      color: #713f12;
    }
    .footer {
      margin-top: 24px;
      padding-top: 14px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 10px;
      color: #94a3b8;
    }
    .hospital-stamp {
      border: 1.5px dashed #0284c7;
      padding: 6px 12px;
      border-radius: 6px;
      color: #0369a1;
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
    }
    @media print {
      body {
        padding: 0;
      }
      .receipt-container {
        border: 1px solid #94a3b8;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="header">
      <div class="logo-section">
        <h1>MEDIVANCE HEALTH</h1>
        <p>Multi-Specialty Medical Center & Telehealth Services</p>
      </div>
      <div class="badge">OPD Booking Voucher</div>
    </div>

    <div class="reference-box">
      <div>
        <div class="ref-label">Booking Reference Number</div>
        <div class="ref-number">${request.referenceNumber}</div>
      </div>
      <div class="status-tag">${request.status || 'Pending Confirmation'}</div>
    </div>

    <div class="section-title">Patient Profile</div>
    <div class="grid">
      <div>
        <div class="field-label">Full Name</div>
        <div class="field-value">${request.fullName}</div>
      </div>
      <div>
        <div class="field-label">Contact Phone</div>
        <div class="field-value">${request.phone}</div>
      </div>
      <div>
        <div class="field-label">Email Address</div>
        <div class="field-value">${request.email}</div>
      </div>
      <div>
        <div class="field-label">Date of Birth & Gender</div>
        <div class="field-value">${request.dob || 'Not specified'} (${request.gender || 'N/A'})</div>
      </div>
    </div>

    <div class="section-title">Appointment Details</div>
    <div class="grid">
      <div>
        <div class="field-label">Clinical Department</div>
        <div class="field-value">${request.departmentName}</div>
      </div>
      <div>
        <div class="field-label">Consulting Physician</div>
        <div class="field-value">${request.doctorName}</div>
      </div>
      <div>
        <div class="field-label">Requested Date</div>
        <div class="field-value">${formattedDate}</div>
      </div>
      <div>
        <div class="field-label">Preferred Time Slot</div>
        <div class="field-value">${request.preferredTime}</div>
      </div>
      <div>
        <div class="field-label">Consultation Mode</div>
        <div class="field-value">${request.appointmentType}</div>
      </div>
      <div>
        <div class="field-label">Database Record</div>
        <div class="field-value">Synced to Supabase Backend</div>
      </div>
      <div class="full-width">
        <div class="field-label">Primary Reason for Consultation</div>
        <div class="field-value">${request.reasonForVisit}</div>
      </div>
      ${request.additionalMessage ? `
      <div class="full-width">
        <div class="field-label">Additional Patient Notes</div>
        <div class="field-value" style="font-weight: 400; font-style: italic;">${request.additionalMessage}</div>
      </div>` : ''}
    </div>

    <div class="instructions">
      <strong>Important OPD Patient Guidelines:</strong><br />
      1. Please arrive 15 minutes before your scheduled appointment time to complete biometric check-in.<br />
      2. Bring a valid government photo ID and your active health insurance card.<br />
      3. If your visit is virtual, your secure video link will be sent via SMS to ${request.phone} prior to the appointment.<br />
      4. For assistance or rescheduling, call the OPD Coordinator desk at <strong>(555) 019-2834</strong>.
    </div>

    <div class="footer">
      <div>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Medivance Health Center • 742 Evergreen Medical Parkway, Healthcare City</p>
      </div>
      <div class="hospital-stamp">
        VERIFIED OPD SLIP
      </div>
    </div>
  </div>
</body>
</html>`;

  // Create an invisible iframe for seamless and reliable printing
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(receiptHtml);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (e) {
          console.warn('Iframe print failed, falling back to window.print', e);
          fallbackPrint(receiptHtml);
        } finally {
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 3000);
        }
      }, 350);
      return;
    }
  } catch (err) {
    console.warn('Direct iframe write error', err);
  }

  // Fallback if iframe fails
  fallbackPrint(receiptHtml);
}

function fallbackPrint(htmlContent: string) {
  const printWindow = window.open('', '_blank', 'width=800,height=700');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  } else {
    // If popup is blocked by browser, call window.print
    window.print();
  }
}

export function downloadAppointmentReceipt(request: AppointmentRequest) {
  const text = `=====================================================
MEDIVANCE HEALTH & MEDICAL CENTER
Official Appointment Confirmation Receipt
=====================================================

REFERENCE NUMBER  : ${request.referenceNumber}
STATUS            : ${request.status || 'Pending Confirmation'}
SUBMITTED ON      : ${new Date(request.createdAt).toLocaleString()}

--- PATIENT INFORMATION ---
Full Name         : ${request.fullName}
Phone Number      : ${request.phone}
Email Address     : ${request.email}
Date of Birth     : ${request.dob || 'N/A'}
Gender            : ${request.gender || 'N/A'}

--- APPOINTMENT DETAILS ---
Department        : ${request.departmentName}
Physician         : ${request.doctorName}
Scheduled Date    : ${request.preferredDate}
Preferred Time    : ${request.preferredTime}
Consultation Mode : ${request.appointmentType}
Database Status   : Synced to Supabase PostgreSQL Backend

--- CLINICAL NOTES ---
Reason for Visit  : ${request.reasonForVisit}
${request.additionalMessage ? `Notes             : ${request.additionalMessage}\n` : ''}
--- OPD INSTRUCTIONS ---
1. Please arrive 15 minutes before your scheduled appointment.
2. Present this reference number (${request.referenceNumber}) at the reception counter.
3. Bring valid government photo identification and insurance documents.
4. OPD Help Desk: (555) 019-2834 | Emergency 24/7: (555) 911-CARE

=====================================================
Medivance Medical Center • 742 Evergreen Medical Pkwy
=====================================================`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Medivance-Receipt-${request.referenceNumber}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
