window.KPI_DATA = {
  totalCollectionsDone: 1247,
  totalOutstanding: '28.4',
  avgCollectionRate: 73.2,
  ptpSuccessRate: 68.5,
  collectionsDoneChange: +8.3,
  outstandingChange: -4.1,
  collectionRateChange: +2.1,
  ptpSuccessChange: +1.4
};

window.DPD_BUCKETS = [
  {
    id: 'dpd-0-30', label: '0–30 DPD', range: '0-30',
    customers: 524, outstanding: '₹6.2 Cr', outstandingRaw: 6.2,
    slippageRisk: 12, color: '#16A34A', bgColor: '#DCFCE7', textColor: '#166534'
  },
  {
    id: 'dpd-30-60', label: '30–60 DPD', range: '30-60',
    customers: 318, outstanding: '₹8.7 Cr', outstandingRaw: 8.7,
    slippageRisk: 34, color: '#D97706', bgColor: '#FEF3C7', textColor: '#92400E'
  },
  {
    id: 'dpd-60-90', label: '60–90 DPD', range: '60-90',
    customers: 247, outstanding: '₹7.9 Cr', outstandingRaw: 7.9,
    slippageRisk: 58, color: '#EA580C', bgColor: '#FED7AA', textColor: '#7C2D12'
  },
  {
    id: 'dpd-90-plus', label: '90+ DPD', range: '90+',
    customers: 158, outstanding: '₹5.6 Cr', outstandingRaw: 5.6,
    slippageRisk: 81, color: '#DC2626', bgColor: '#FEE2E2', textColor: '#7F1D1D'
  }
];

window.MONTHLY_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

window.MONTHLY_COLLECTIONS = {
  labels: window.MONTHLY_LABELS,
  datasets: [
    { label: '0–30 DPD', data: [210, 195, 228, 241, 219, 253, 235, 198], color: '#16A34A' },
    { label: '30–60 DPD', data: [140, 128, 155, 168, 143, 171, 159, 132], color: '#D97706' },
    { label: '60–90 DPD', data: [95, 87, 102, 118, 98, 124, 108, 91], color: '#EA580C' },
    { label: '90+ DPD', data: [48, 52, 61, 55, 47, 63, 58, 42], color: '#DC2626' }
  ]
};

window.SLIPPAGE_TREND = {
  labels: window.MONTHLY_LABELS,
  datasets: [
    { label: '0–30 DPD', data: [10, 11, 9, 12, 11, 13, 12, 12], color: '#16A34A' },
    { label: '30–60 DPD', data: [28, 31, 30, 35, 33, 36, 34, 34], color: '#D97706' },
    { label: '60–90 DPD', data: [52, 55, 54, 59, 56, 60, 58, 58], color: '#EA580C' },
    { label: '90+ DPD', data: [75, 78, 77, 82, 80, 83, 81, 81], color: '#DC2626' }
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
    ]
  },
  {
    id: 2, name: 'Priya Sharma', initials: 'PS', avatarBg: '#7C3AED',
    loanId: 'KBL-HL-20230815', loanType: 'Home Loan',
    dpd: '30-60', dpdDays: 42, propensity: 'Amber', propensityScore: 54,
    ptpStatus: 'No PTP', ptpDate: null, ptpAmount: null,
    phone: '+91 87654 32109', outstandingAmount: '₹2,87,300',
    interactions: [
      {
        date: '20 Aug 2026', channel: 'Outbound Call', agent: 'Suresh Pillai',
        duration: '6m 15s', outcome: 'Discussed — No PTP', icon: 'phone',
        notes: 'Customer disputes an insurance premium added to her loan account. Wants branch manager resolution before paying. Not hostile, but firm.'
      },
      {
        date: '14 Aug 2026', channel: 'Outbound Call', agent: 'Neha Sharma',
        duration: '2m 48s', outcome: 'Partial Discussion', icon: 'phone',
        notes: 'Customer engaged but was distracted. Said she would call back. Did not follow through.'
      },
      {
        date: '08 Aug 2026', channel: 'Email', agent: 'System',
        duration: '—', outcome: 'Opened', icon: 'email',
        notes: 'Default notice email sent. Customer opened the email but took no action.'
      }
    ],
    aiSummary: 'Priya Sharma has a genuine billing dispute about an insurance premium charge on her home loan, which is her stated reason for withholding payment. She is communicative and not avoiding contact, but is firm about resolving the dispute before paying. The account needs escalation to the branch for dispute resolution before collection can succeed. There is moderate risk of further slippage if unresolved within 7–10 days.',
    scoreReasons: [
      'Willing to pay but citing a billing dispute — needs internal resolution first',
      'Engaged on calls but has not committed to a date or amount',
      'Dispute claim adds complexity — collection depends on branch action',
      'First notable delay in a 3-year home loan tenure',
      'No evasion or hostility — fundamentally a cooperative customer'
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];
