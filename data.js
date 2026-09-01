/* Monthly sparkline trends for KPI cards (Jan–Aug 2026) */
window.KPI_TRENDS = {
  collections:    [521, 488, 575, 614, 534, 646, 590, 496],
  outstanding:    [62.8, 61.4, 59.7, 58.9, 59.3, 58.1, 57.4, 56.2],
  collectionRate: [68.2, 69.1, 70.4, 71.8, 70.9, 72.1, 71.7, 71.4],
  ptpSuccess:     [59.2, 60.4, 62.1, 64.8, 63.2, 65.9, 64.1, 64.8]
};

/* Case status breakdown for donut chart */
window.CASE_STATUS = {
  labels: ['Resolved / Paid', 'PTP Committed', 'Under Discussion', 'NPA Risk'],
  data:   [41, 24, 19, 16],
  colors: ['#16A34A', '#2563EB', '#D97706', '#DC2626']
};

window.KPI_DATA = {
  totalCollectionsDone: 1358,
  totalOutstanding: '56.2',
  avgCollectionRate: 71.4,
  ptpSuccessRate: 64.8,
  collectionsDoneChange: +6.2,
  outstandingChange: -3.7,
  collectionRateChange: +1.9,
  ptpSuccessChange: +2.6
};

window.DPD_BUCKETS = [
  {
    id: 'dpd-0-30', label: '0–30 DPD', range: '0-30',
    customers: 618, outstanding: '₹11.4 Cr', outstandingRaw: 11.4,
    slippageRisk: 12, resolutionRate: 84,
    color: '#16A34A', bgColor: '#DCFCE7', textColor: '#166534'
  },
  {
    id: 'dpd-30-60', label: '30–60 DPD', range: '30-60',
    customers: 374, outstanding: '₹16.8 Cr', outstandingRaw: 16.8,
    slippageRisk: 37, resolutionRate: 61,
    color: '#D97706', bgColor: '#FEF3C7', textColor: '#92400E'
  },
  {
    id: 'dpd-60-90', label: '60–90 DPD', range: '60-90',
    customers: 261, outstanding: '₹14.2 Cr', outstandingRaw: 14.2,
    slippageRisk: 59, resolutionRate: 38,
    color: '#EA580C', bgColor: '#FED7AA', textColor: '#7C2D12'
  },
  {
    id: 'dpd-90-plus', label: '90+ DPD', range: '90+',
    customers: 173, outstanding: '₹9.6 Cr', outstandingRaw: 9.6,
    slippageRisk: 82, resolutionRate: 17,
    color: '#DC2626', bgColor: '#FEE2E2', textColor: '#7F1D1D'
  },
  {
    id: 'dpd-settlement', label: 'Settlement', range: 'settlement',
    customers: 62, outstanding: '₹4.2 Cr', outstandingRaw: 4.2,
    slippageRisk: 21, resolutionRate: 38,
    color: '#7C3AED', bgColor: '#EDE9FE', textColor: '#4C1D95'
  }
];

window.MONTHLY_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

window.MONTHLY_COLLECTIONS = {
  labels: window.MONTHLY_LABELS,
  datasets: [
    { label: '0–30 DPD',   data: [224, 208, 241, 258, 233, 267, 249, 214], color: '#16A34A' },
    { label: '30–60 DPD',  data: [148, 136, 162, 176, 151, 183, 168, 141], color: '#D97706' },
    { label: '60–90 DPD',  data: [91,  84,  99,  114,  94,  119, 104,  88], color: '#EA580C' },
    { label: '90+ DPD',    data: [44,  48,  56,  51,   43,  58,  53,  39],  color: '#DC2626' },
    { label: 'Settlement', data: [14,  12,  17,  15,   13,  19,  16,  14],  color: '#7C3AED' }
  ]
};

window.SLIPPAGE_TREND = {
  labels: window.MONTHLY_LABELS,
  datasets: [
    { label: '0–30 DPD',   data: [10, 11,  9, 12, 11, 13, 12, 12], color: '#16A34A' },
    { label: '30–60 DPD',  data: [29, 32, 31, 36, 34, 38, 36, 37], color: '#D97706' },
    { label: '60–90 DPD',  data: [53, 56, 55, 60, 57, 61, 59, 59], color: '#EA580C' },
    { label: '90+ DPD',    data: [76, 79, 78, 83, 81, 84, 82, 82], color: '#DC2626' },
    { label: 'Settlement', data: [23, 22, 21, 25, 22, 24, 22, 21], color: '#7C3AED' }
  ]
};

window.CUSTOMERS = [
  {
    id: 1, name: 'Rajesh Kumar', initials: 'RK', avatarBg: '#1E40AF',
    loanId: 'KBL-PL-20240312', loanType: 'Personal Loan',
    dpd: '0-30', dpdDays: 18, propensity: 'Green', propensityScore: 82,
    ptpStatus: 'PTP Given', ptpDate: '28 Aug 2026', ptpAmount: '₹45,000',
    phone: '+91 98765 43210', outstandingAmount: '₹1,24,500',
    interactions: [
      {
        date: '21 Aug 2026', channel: 'Outbound Call', agent: 'Neha Sharma',
        duration: '4m 32s', outcome: 'PTP Received', icon: 'phone',
        notes: 'Customer agreed to pay ₹45,000 by 28 Aug. Said salary gets credited on the 25th and will transfer immediately after.'
      },
      {
        date: '18 Aug 2026', channel: 'WhatsApp', agent: 'System',
        duration: '—', outcome: 'Message Delivered', icon: 'chat',
        notes: 'Reminder sent for overdue EMI. Customer read the message within 10 minutes.'
      },
      {
        date: '15 Aug 2026', channel: 'Outbound Call', agent: 'Rahul Mehta',
        duration: '1m 12s', outcome: 'No Answer', icon: 'phone',
        notes: 'Call went to voicemail. SMS follow-up sent immediately after.'
      }
    ],
    aiSummary: 'Rajesh Kumar is a cooperative borrower with a consistent on-time payment history over a 2-year tenure. The current delay appears to be a short-term cash flow issue due to a delayed salary. He proactively engaged on the call, committed to settling ₹45,000 by 28th August, and the timeline aligns with his stated salary credit date of the 25th. Interaction tone is positive and there are no prior broken promises.',
    scoreReasons: [
      'Committed to PTP with a specific date and exact amount',
      'Proactively engaged on calls — no avoidance behavior observed',
      'First-ever delay in a 2-year loan tenure',
      'PTP date (28 Aug) aligns realistically with salary credit (25 Aug)',
      'No history of broken PTPs — high reliability score'
    ],
    fieldAction: {
      priority: 'Low',
      channel: 'Call',
      nextDate: '28 Aug 2026',
      bestTime: '10:00 AM – 12:00 PM',
      action: 'PTP follow-up — confirm ₹45,000 payment receipt on commitment date.',
      script: 'Good morning, this is [agent] from Kotak Bank. Calling to confirm the payment of ₹45,000 you committed to today. Would you like me to send a UPI link or NEFT details? Once received we\'ll update your account immediately.'
    }
  },
  {
    id: 2, name: 'Priya Sharma', initials: 'PS', avatarBg: '#7C3AED',
    loanId: 'KBL-HL-20230815', loanType: 'Home Loan',
    dpd: '30-60', dpdDays: 42, propensity: 'Amber', propensityScore: 54,
    ptpStatus: 'No PTP', ptpDate: null, ptpAmount: null,
    phone: '+91 87654 32109', outstandingAmount: '₹2,87,300',
    interactions: [
      {
        date: '22 Aug 2026', channel: 'Outbound Call', agent: 'Suresh Pillai',
        duration: '7m 42s', outcome: 'Medical Docs Received — Moratorium Requested', icon: 'phone',
        notes: 'Confirmed receipt of hospital documentation. Customer submitted Apollo Hospital Pune discharge summary + itemised bills (₹1,84,000). She is requesting a 60-day moratorium under medical hardship provisions. Case escalated to credit review team. Customer was cooperative and engaged throughout.'
      },
      {
        date: '15 Aug 2026', channel: 'WhatsApp', agent: 'System',
        duration: '—', outcome: 'Hospital Documents Submitted', icon: 'chat',
        notes: 'Customer submitted discharge summary and itemised medical bills via WhatsApp. Documents cover a cardiac procedure performed on 28 Jul 2026 at Apollo Hospital, Pune. Bills verified and forwarded to the credit review team for hardship assessment.'
      },
      {
        date: '10 Aug 2026', channel: 'Outbound Call', agent: 'Neha Sharma',
        duration: '9m 18s', outcome: 'Medical Hardship Disclosed — Cooperative', icon: 'phone',
        notes: 'Customer disclosed hospitalisation for a cardiac procedure on 28 Jul 2026. Said she is still in recovery and managing significant medical expenses running into lakhs. Offered to submit hospital documentation and requested temporary payment relief. Tone was distressed but cooperative — no evasion.'
      },
      {
        date: '08 Aug 2026', channel: 'Email', agent: 'System',
        duration: '—', outcome: 'Opened — No Action at Time', icon: 'email',
        notes: 'Default notice email sent. Customer opened the email but took no action — likely due to ongoing hospitalisation and recovery at the time.'
      }
    ],
    aiSummary: 'Priya Sharma\'s payment delay is directly attributable to a documented medical emergency — a cardiac procedure at Apollo Hospital, Pune on 28 July 2026. She has proactively submitted a discharge summary and itemised hospital bills totalling ₹1,84,000, demonstrating transparency and good faith. She is formally requesting a 60-day moratorium under the bank\'s medical hardship provision, and the case has been escalated to the credit review team. Her willingness to engage, submit documentation, and work through official channels indicates genuine repayment intent. Resolution is conditional on the credit team approving the moratorium. No evasion or avoidance behavior observed throughout.',
    scoreReasons: [
      'Documented medical emergency — cardiac procedure with verified Apollo Hospital records',
      'Proactively submitted discharge summary and ₹1,84,000 hospital bills — high transparency',
      'Engaging through formal channels for moratorium — structured and cooperative approach',
      'No prior defaults in a 3-year home loan tenure before this medical event',
      'Resolution timeline depends on internal credit team approval — moderate short-term risk'
    ],
    fieldAction: {
      priority: 'Hold',
      channel: 'Internal',
      nextDate: '01 Sep 2026',
      bestTime: '—',
      action: 'Pause all collection outreach — moratorium request under credit team review.',
      script: 'Do not call or message for collection until the credit review concludes. If customer calls in, inform her the moratorium request is being reviewed and she will receive a response within 3 working days. Maintain an empathetic, supportive tone given the documented medical hardship. Escalate to branch manager if review is not resolved by 1 Sep 2026.'
    }
  },
  {
    id: 3, name: 'Amit Patel', initials: 'AP', avatarBg: '#0369A1',
    loanId: 'KBL-AL-20230501', loanType: 'Auto Loan',
    dpd: '60-90', dpdDays: 67, propensity: 'Amber', propensityScore: 47,
    ptpStatus: 'PTP Given', ptpDate: '05 Sep 2026', ptpAmount: '₹62,000',
    phone: '+91 76543 21098', outstandingAmount: '₹1,86,400',
    interactions: [
      {
        date: '22 Aug 2026', channel: 'Outbound Call', agent: 'Rahul Mehta',
        duration: '8m 44s', outcome: 'PTP Received', icon: 'phone',
        notes: 'Self-employed customer facing seasonal slowdown. Committed to ₹62,000 by 5 Sep after receivables clear. Tone was genuine and apologetic.'
      },
      {
        date: '10 Aug 2026', channel: 'Outbound Call', agent: 'Suresh Pillai',
        duration: '3m 22s', outcome: 'Promise to Call Back', icon: 'phone',
        notes: 'Customer said he was in a meeting. Promised to call back in 2 days — did not follow through.'
      },
      {
        date: '29 Jul 2026', channel: 'Field Visit', agent: 'Vijay Kumar',
        duration: '20 min', outcome: 'Contact Made', icon: 'visit',
        notes: 'Met at residence. Acknowledged the overdue. Said business is slow but recovering. Did not appear evasive.'
      },
      {
        date: '15 Jul 2026', channel: 'Outbound Call', agent: 'Neha Sharma',
        duration: '0m 45s', outcome: 'Busy / Disengaged', icon: 'phone',
        notes: 'Customer said he was busy and ended the call quickly. No useful information gathered.'
      }
    ],
    aiSummary: 'Amit Patel is a self-employed business owner experiencing a temporary cash crunch due to seasonal business slowdown. He has demonstrated willingness to engage across channels and committed to ₹62,000 by 5 September — contingent on receivables clearing, which introduces execution risk. The field visit confirmed he is not absconding and has genuine intent. The PTP date is 13 days away and reliant on external cash flow.',
    scoreReasons: [
      'PTP given but contingent on business receivables — moderate reliability',
      'Engaged across calls and field visits — not evading contact',
      'Self-employed income makes collection timeline less predictable',
      'One missed call-back reduces reliability score slightly',
      'Previous payments were regular before this 67-day delay'
    ],
    fieldAction: {
      priority: 'Medium',
      channel: 'WhatsApp + Call',
      nextDate: '03 Sep 2026',
      bestTime: '6:00 PM – 8:00 PM',
      action: 'Pre-PTP WhatsApp reminder on 3 Sep, follow-up call on 5 Sep to confirm payment.',
      script: 'Send WhatsApp on 3 Sep: "Dear Amit, a friendly reminder for your payment commitment of ₹62,000 due on 5 Sep. Please ensure your account is ready. Call us if you need any assistance." Follow up with a call on 5 Sep morning. If receivables haven\'t cleared, negotiate a short 7-day extension rather than letting the account slip further.'
    }
  },
  {
    id: 4, name: 'Sunita Verma', initials: 'SV', avatarBg: '#991B1B',
    loanId: 'KBL-CC-20220110', loanType: 'Credit Card',
    dpd: '90+', dpdDays: 112, propensity: 'Red', propensityScore: 21,
    ptpStatus: 'Broken PTP', ptpDate: 'Was 10 Aug 2026', ptpAmount: '₹38,000',
    phone: '+91 65432 10987', outstandingAmount: '₹3,42,800',
    interactions: [
      {
        date: '19 Aug 2026', channel: 'Outbound Call', agent: 'Rahul Mehta',
        duration: '5m 08s', outcome: 'Broken PTP Discussion', icon: 'phone',
        notes: 'Did not pay by promised date. Now citing a medical emergency. Cannot provide documentation. Tone was evasive and deflective.'
      },
      {
        date: '10 Aug 2026', channel: 'Outbound Call', agent: 'Suresh Pillai',
        duration: '0m 30s', outcome: 'No Response — PTP Broken', icon: 'phone',
        notes: 'PTP date. Called 3 times — voicemail each time. Payment not received.'
      },
      {
        date: '01 Aug 2026', channel: 'Outbound Call', agent: 'Neha Sharma',
        duration: '7m 12s', outcome: 'PTP Confirmed (Later Broken)', icon: 'phone',
        notes: 'Customer committed to ₹38,000 by 10 Aug. Was very specific about date and amount. Sounded confident.'
      },
      {
        date: '18 Jul 2026', channel: 'Legal Notice', agent: 'Legal Team',
        duration: '—', outcome: 'Notice Sent', icon: 'legal',
        notes: 'Section 25 notice sent to registered address. Delivery confirmed by courier.'
      },
      {
        date: '05 Jul 2026', channel: 'Field Visit', agent: 'Vijay Kumar',
        duration: '—', outcome: 'Not at Registered Address', icon: 'visit',
        notes: 'Customer not found. Neighbours report she moved 2 months ago. No forwarding address available.'
      }
    ],
    aiSummary: 'Sunita Verma presents a high-risk profile: broken PTP, possible address change, 112 days past due on a credit card account, and a legal notice already served. She committed to ₹38,000 by 10 August with high confidence but was unreachable on that date and is now giving unverifiable excuses. The combination of a broken promise, avoidance behavior, and escalating delinquency significantly reduces the probability of voluntary repayment. Legal escalation appears to be the most viable next step.',
    scoreReasons: [
      'Broken PTP — committed specifically to date and amount, did not honor it',
      'Unreachable on PTP date — active avoidance behavior likely',
      'Possible change of address — complicates field and legal follow-up',
      'Legal notice already served — indicates prior escalation without result',
      '112 DPD — highest risk of slipping to NPA in current portfolio'
    ],
    fieldAction: {
      priority: 'Legal',
      channel: 'Legal',
      nextDate: 'Immediate',
      bestTime: '—',
      action: 'Escalate to legal team — initiate formal attorney notice and NPA classification review.',
      script: 'Forward complete case file to legal team with: (1) broken PTP documentation, (2) prior legal notice sent to old address, (3) field visit notes confirming suspected address change. Request attorney notice to both registered and last-known address. Simultaneously pull alternate contact numbers from KYC file and attempt via a fresh number. Do not make standard collection calls — all outreach must go through legal channel from this point.'
    }
  },
  {
    id: 5, name: 'Mohit Singh', initials: 'MS', avatarBg: '#065F46',
    loanId: 'KBL-PL-20240605', loanType: 'Personal Loan',
    dpd: '30-60', dpdDays: 35, propensity: 'Green', propensityScore: 78,
    ptpStatus: 'PTP Given', ptpDate: '25 Aug 2026', ptpAmount: '₹28,500',
    phone: '+91 54321 09876', outstandingAmount: '₹94,200',
    interactions: [
      {
        date: '23 Aug 2026', channel: 'Inbound Call', agent: 'Neha Sharma',
        duration: '3m 55s', outcome: 'PTP Confirmed (Inbound)', icon: 'phone',
        notes: 'Customer called in proactively. Confirmed ₹28,500 by 25 Aug. Very cooperative and apologetic about the delay.'
      },
      {
        date: '20 Aug 2026', channel: 'WhatsApp', agent: 'System',
        duration: '—', outcome: 'Replied — Confirmed Date', icon: 'chat',
        notes: 'Reminder sent. Customer replied within minutes: "Will pay by 25th, please note." Highly responsive.'
      },
      {
        date: '16 Aug 2026', channel: 'Outbound Call', agent: 'Rahul Mehta',
        duration: '2m 20s', outcome: 'Discussion — Awaited PTP', icon: 'phone',
        notes: 'Customer acknowledged overdue. Said he is awaiting employer reimbursement. Friendly and forthcoming throughout.'
      }
    ],
    aiSummary: 'Mohit Singh is a salaried professional who proactively reached out to commit to payment — the strongest positive signal in any collection interaction. He has been responsive across all channels, transparent about the delay (awaiting employer reimbursement), and apologetic. His inbound self-initiated call and WhatsApp response within minutes both indicate high intent. PTP date of 25 Aug is 2 days away and highly credible.',
    scoreReasons: [
      'Proactively called in to commit to payment — strongest positive behavioral signal',
      'Replied to WhatsApp within minutes — exceptional engagement level',
      'Salaried with traceable income — low flight risk',
      'Transparent about delay reason without being prompted',
      'PTP date (25 Aug) is imminent — very high probability of fulfillment'
    ],
    fieldAction: {
      priority: 'Low',
      channel: 'Call',
      nextDate: '25 Aug 2026',
      bestTime: '9:00 AM – 11:00 AM',
      action: 'PTP confirmation call — mark account resolved upon payment receipt.',
      script: 'Call to confirm ₹28,500 received. If not received by 3 PM, send one WhatsApp reminder. Customer has shown exceptional intent and proactively called in — keep tone friendly and appreciative. Once payment is confirmed, send a thank-you message and note the account positively for future credit review.'
    }
  },
  {
    id: 6, name: 'Kavitha Nair', initials: 'KN', avatarBg: '#6B21A8',
    loanId: 'KBL-HL-20210930', loanType: 'Home Loan',
    dpd: '60-90', dpdDays: 78, propensity: 'Red', propensityScore: 29,
    ptpStatus: 'No PTP', ptpDate: null, ptpAmount: null,
    phone: '+91 43210 98765', outstandingAmount: '₹5,18,600',
    interactions: [
      {
        date: '22 Aug 2026', channel: 'Outbound Call', agent: 'Suresh Pillai',
        duration: '0m 20s', outcome: 'Call Disconnected', icon: 'phone',
        notes: 'Customer answered but disconnected immediately. No interaction possible.'
      },
      {
        date: '17 Aug 2026', channel: 'Outbound Call', agent: 'Rahul Mehta',
        duration: '—', outcome: 'No Answer (×4)', icon: 'phone',
        notes: 'Called 4 times at different hours. No answer on any attempt.'
      },
      {
        date: '10 Aug 2026', channel: 'Field Visit', agent: 'Vijay Kumar',
        duration: '10 min', outcome: 'Brief Contact Made', icon: 'visit',
        notes: 'Customer opened door briefly, said she is "going through a difficult time," then closed the door. Refused to accept notice copy.'
      },
      {
        date: '30 Jul 2026', channel: 'Email + SMS', agent: 'System',
        duration: '—', outcome: 'Delivered — No Action', icon: 'email',
        notes: 'Email opened twice. SMS delivered. No response or action from customer.'
      },
      {
        date: '15 Jul 2026', channel: 'Outbound Call', agent: 'Neha Sharma',
        duration: '4m 10s', outcome: 'Partial Discussion', icon: 'phone',
        notes: 'First contact in this DPD cycle. Customer said she is facing personal difficulties. Did not share specifics. Said she would "try to manage" — no date or amount given.'
      }
    ],
    aiSummary: 'Kavitha Nair has been progressively less communicative across the collection cycle. Early engagement was brief; she has since become unresponsive — refusing calls, disconnecting, and not engaging with field agents. She acknowledged personal difficulties but has not shared documentation or a repayment plan. The combination of 78 DPD on a high-value home loan, no PTP, refusal to accept notices, and declining engagement puts this account at high risk and warrants legal and property review.',
    scoreReasons: [
      'Actively avoiding contact — disconnecting calls and refusing field agents',
      'Refused to accept notice copy during field visit',
      'No PTP given despite 78 DPD and multiple touchpoints across channels',
      'Engagement declining over time — negative behavioral trajectory',
      '₹5.18 Cr home loan at risk — property valuation and legal review recommended'
    ],
    fieldAction: {
      priority: 'High',
      channel: 'Field Visit',
      nextDate: '24 Aug 2026',
      bestTime: '7:00 AM – 9:00 AM',
      action: 'Urgent field visit — serve formal legal notice and document contact attempt.',
      script: 'Visit early morning when customer is most likely at home. Bring two copies of the legal notice — leave one with a family member or neighbor with witness signature if she refuses again. Photograph the door and document the attempt with timestamps. Also visit the registered workplace from the KYC file. Report outcome to legal team within 24 hours. Initiate property valuation process in parallel.'
    }
  }
];
