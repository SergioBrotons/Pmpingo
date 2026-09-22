import { Question } from '@/types';

export const QUESTIONS_BANK: Question[] = [
  // DIAGNOSTIC 1: People & Agile/Hybrid
  {
    id: 'Q-DIAG-01',
    domain: 'People',
    ecoTask: 'Task 1.9: Collaborate with stakeholders',
    deliveryApproach: 'Hybrid',
    difficulty: 'Standard',
    isDiagnostic: true,
    scenario: 'You are the project manager for a software solution transitioning from a predictive life cycle to a hybrid model. During the third sprint review, a key regulatory stakeholder who has not attended earlier ceremonies expresses strong frustration, stating that an essential compliance reporting requirement has been omitted from the deliverable. The development team explains that the requirement is sitting in the product backlog but was not prioritized for this sprint by the product owner.\n\nWhat should the project manager do FIRST?',
    choices: [
      { id: 'A', text: 'Submit a formal change request to the Change Control Board (CCB) to adjust the sprint scope and include the regulatory requirement immediately.' },
      { id: 'B', text: 'Facilitate an alignment discussion between the product owner and the regulatory stakeholder to review compliance priorities and evaluate backlog ordering.' },
      { id: 'C', text: 'Instruct the agile team to work overtime in the current sprint to complete the compliance requirement without impacting the agreed sprint goal.' },
      { id: 'D', text: 'Advise the stakeholder that in agile frameworks, requirements can only be raised through user stories at the beginning of the next release cycle.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'In hybrid and agile delivery, the Product Owner owns backlog prioritization and value ordering. When a regulatory stakeholder expresses concern about an omitted compliance requirement, the PM acts as a servant leader and facilitator by bringing the PO and stakeholder together to align on regulatory risk and reprioritize upcoming iterations.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'Agile sprints do not route standard backlog prioritization through a traditional CCB; the PO and agile team manage sprint scope.' },
      { choiceId: 'C', reason: 'Unplanned overtime causes team burnout, violates sustainable pace principles, and disrupts the committed sprint goal.' },
      { choiceId: 'D', reason: 'Regulatory compliance cannot be dismissed or deferred rigidly; agile embraces stakeholder feedback at every sprint review.' }
    ],
    decisionRule: 'Facilitate collaboration between the decision owner (Product Owner) and impacted stakeholder before taking directive action.',
    diagnosedMistake: 'MINDSET ERROR',
    sourceReference: 'PMBOK 8th Edition - Stakeholder Performance Domain & ECO Task 1.9'
  },

  // DIAGNOSTIC 2: Process & Change Control (Predictive)
  {
    id: 'Q-DIAG-02',
    domain: 'Process',
    ecoTask: 'Task 2.10: Manage project changes',
    deliveryApproach: 'Predictive',
    difficulty: 'Standard',
    isDiagnostic: true,
    scenario: 'In a predictive infrastructure project, a senior technical lead discovers an innovative component that can significantly reduce operational maintenance costs. The component costs the same as the original item specified in the baseline, but installing it requires modifying the installation sequence and adding three testing days.\n\nWhat should the project manager do FIRST?',
    choices: [
      { id: 'A', text: 'Approve the modification immediately since the financial cost of the component is neutral.' },
      { id: 'B', text: 'Perform an integrated impact assessment on the schedule, risk, and quality before submitting a change request.' },
      { id: 'C', text: 'Reject the proposal because the baseline scope and schedule have already been frozen.' },
      { id: 'D', text: 'Instruct the technician to implement the change and document it in the project closing lessons learned.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'Under formal predictive project governance, whenever a scope or schedule modification is proposed—even a cost-neutral or beneficial one—the project manager must first analyze the full impact across all constraints (schedule, risk, quality, resources) before taking action or taking it to the CCB.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'Cost neutrality does not exempt a change from schedule impact assessment; PMs cannot bypass baseline change governance.' },
      { choiceId: 'C', reason: 'Beneficial changes that add organizational value should be evaluated, not dogmatically rejected without assessment.' },
      { choiceId: 'D', reason: 'This is gold plating / undocumented scope creep, which undermines project governance.' }
    ],
    decisionRule: 'Always assess the holistic impact of a proposed change across all constraints before deciding or submitting to the CCB.',
    diagnosedMistake: 'FIRST/NEXT ERROR',
    sourceReference: 'PMBOK 8th Edition - Planning Performance Domain & Vargas Process Flow'
  },

  // DIAGNOSTIC 3: Process & Risk vs Issue
  {
    id: 'Q-DIAG-03',
    domain: 'Process',
    ecoTask: 'Task 2.15: Manage project issues',
    deliveryApproach: 'Universal',
    difficulty: 'Difficult',
    isDiagnostic: true,
    scenario: 'During a critical milestone review, the logistics manager reports that the primary transportation vendor has unexpectedly declared bankruptcy this morning, halting all hardware shipments destined for testing sites.\n\nWhat should the project manager do FIRST?',
    choices: [
      { id: 'A', text: 'Add the vendor bankruptcy as a new high-probability risk in the project risk register.' },
      { id: 'B', text: 'Log the situation in the issue log and assess secondary and pre-identified contingency response plans.' },
      { id: 'C', text: 'Escalate the vendor failure immediately to the project sponsor for legal action.' },
      { id: 'D', text: 'Crash the project schedule by hiring multiple local couriers without consulting procurement.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'The bankruptcy has ALREADY occurred and is currently halting operations; it is an active ISSUE, not an uncertain future RISK. The PM must immediately log it in the issue log, assess pre-planned contingency/fallback responses, and analyze the operational impact.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'A realized event is an issue, not a risk. Logging it as a risk shows fundamental Risk vs Issue confusion.' },
      { choiceId: 'C', reason: 'The PM must evaluate contingency plans and quantify the impact before escalating to executive sponsors.' },
      { choiceId: 'D', reason: 'Unilateral unapproved procurement violates procurement governance and budget controls.' }
    ],
    decisionRule: 'An active problem is an ISSUE: log it in the Issue Log and trigger contingency responses; reserve the Risk Register for uncertainties.',
    diagnosedMistake: 'RISK/ISSUE CONFUSION',
    sourceReference: 'PMBOK 8th Edition - Uncertainty & Delivery Performance Domains'
  },

  // DIAGNOSTIC 4: People & Conflict Resolution
  {
    id: 'Q-DIAG-04',
    domain: 'People',
    ecoTask: 'Task 1.1: Manage conflict',
    deliveryApproach: 'Universal',
    difficulty: 'Standard',
    isDiagnostic: true,
    scenario: 'Two senior developers on a project team are in heated disagreement regarding the software architecture for an upcoming integration module. Their dispute is causing daily standup meetings to run over time and has begun lowering team morale.\n\nWhat is the BEST action for the project manager to take?',
    choices: [
      { id: 'A', text: 'Make an executive technical decision immediately to stop the team debate and maintain the schedule.' },
      { id: 'B', text: 'Facilitate a private discussion between the two developers to explore their perspectives and help them reach a collaborative consensus.' },
      { id: 'C', text: 'Separate the developers by reassigning one of them to another project module.' },
      { id: 'D', text: 'Report the interpersonal friction to their functional resource manager for disciplinary action.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'PMI leadership doctrine emphasizes direct, collaborative problem-solving (Collaborate / Problem-Solve). The PM facilitates private discussion, encourages psychological safety, and guides the team members to reach a win-win technical consensus rather than imposing unilateral authority or avoiding the conflict.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'Forcing an executive technical choice ignores the team\'s expertise and creates lingering resentment.' },
      { choiceId: 'C', reason: 'Reassigning team members is avoidance/smoothing, which fails to resolve underlying architectural conflicts.' },
      { choiceId: 'D', reason: 'Escalating interpersonal disagreements to functional management is premature and damages trust.' }
    ],
    decisionRule: 'Address interpersonal and technical conflicts directly and privately with the individuals through collaborative problem-solving.',
    diagnosedMistake: 'TEAM/LEADERSHIP ERROR',
    sourceReference: 'PMBOK 8th Edition - Team Performance Domain & ECO Task 1.1'
  },

  // DIAGNOSTIC 5: Business Environment & Compliance
  {
    id: 'Q-DIAG-05',
    domain: 'Business Environment',
    ecoTask: 'Task 3.1: Plan and manage project compliance',
    deliveryApproach: 'Hybrid',
    difficulty: 'Difficult',
    isDiagnostic: true,
    scenario: 'While managing an e-commerce platform project near final user acceptance testing, a new data privacy regulation is enacted by the government, taking effect in 30 days. Non-compliance carries severe financial fines. The sponsor urges the project manager to release the software as scheduled and address privacy features in a future post-launch update.\n\nWhat should the project manager do?',
    choices: [
      { id: 'A', text: 'Follow the sponsor\'s directive and launch on schedule, logging the legal risk in the project archives.' },
      { id: 'B', text: 'Halt all project activities immediately and file an ethics complaint against the project sponsor.' },
      { id: 'C', text: 'Assess the specific compliance gaps, evaluate the impact of incorporating mandatory controls, and present the regulatory exposure to key decision-makers.' },
      { id: 'D', text: 'Secretly modify the release code overnight to include basic data encryption without informing the sponsor.' }
    ],
    correctAnswer: 'C',
    bestAnswerReasoning: 'Project managers have an ethical and professional duty to uphold legal and regulatory compliance. The PM must rigorously assess compliance requirements, analyze the impact on scope/schedule/budget, and transparently present the severe legal/financial exposure to the sponsor and steering committee.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'Knowingly releasing non-compliant software that incurs government penalties violates PMI Code of Ethics and professional conduct.' },
      { choiceId: 'B', reason: 'Shutting down the project and filing a complaint before professional assessment and stakeholder discussion is premature.' },
      { choiceId: 'D', reason: 'Making unauthorized covert code changes violates integrity and governance standards.' }
    ],
    decisionRule: 'Compliance and legal mandates are non-negotiable; analyze gaps and transparently guide governance rather than compromising on ethics.',
    diagnosedMistake: 'VALUE ERROR',
    sourceReference: 'PMBOK 8th Edition - Governance & Business Value & ECO Task 3.1'
  },

  // ADDITIONAL QUESTIONS FOR STUDY SESSIONS
  {
    id: 'Q-PEOP-01',
    domain: 'People',
    ecoTask: 'Task 1.2: Lead a team',
    deliveryApproach: 'Agile',
    difficulty: 'Standard',
    scenario: 'During a sprint planning meeting, team members express that user stories provided by the product owner lack clear acceptance criteria, leading to confusion regarding when work is done.\n\nWhat should the agile project manager / Scrum Master do?',
    choices: [
      { id: 'A', text: 'Write the acceptance criteria on behalf of the product owner to avoid losing sprint velocity.' },
      { id: 'B', text: 'Coach the product owner and team on defining clear Acceptance Criteria and establishing a Definition of Ready (DoR).' },
      { id: 'C', text: 'Cancel the sprint planning meeting until management appoints a more technical product owner.' },
      { id: 'D', text: 'Direct the developers to interpret the requirements based on their own best judgement.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'A servant leader coaches both the PO and the team in agile practices. Establishing a Definition of Ready (DoR) and refining acceptance criteria ensures stories meet quality standards before team commitment.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'The PM taking over the PO\'s job creates dependency and undermines role accountability.' },
      { choiceId: 'C', reason: 'Canceling meetings and requesting management intervention is premature escalation.' },
      { choiceId: 'D', reason: 'Working without clear acceptance criteria causes rework, defective deliverables, and stakeholder misalignment.' }
    ],
    decisionRule: 'Coach and facilitate role capabilities (Definition of Ready) rather than stepping in to do someone else\'s job.',
    diagnosedMistake: 'MINDSET ERROR',
    sourceReference: 'PMBOK 8th Edition - Team Performance Domain'
  },
  {
    id: 'Q-PROC-01',
    domain: 'Process',
    ecoTask: 'Task 2.8: Plan and manage scope',
    deliveryApproach: 'Predictive',
    difficulty: 'Standard',
    scenario: 'A project manager is reviewing progress with the team. A developer mentions that they added a valuable extra feature that wasn\'t in the requirements specification because it took only two hours to code and the client will love it.\n\nHow should the project manager address this?',
    choices: [
      { id: 'A', text: 'Commend the developer for proactive innovation and add the feature to the project scope baseline.' },
      { id: 'B', text: 'Explain that providing unauthorized features (gold plating) introduces untested risk and violates scope management guidelines.' },
      { id: 'C', text: 'Bill the client an additional fee for the extra feature to recover the two hours of labor.' },
      { id: 'D', text: 'Instruct the quality team to ignore testing the extra feature since it was not in the original test plan.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'Gold plating (adding extra deliverables or features outside agreed baselines) is strictly discouraged in PMP practice because it adds risk, testing overhead, and potential defects without customer sign-off.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'Rewarding gold plating encourages unauthorized scope creep across the project.' },
      { choiceId: 'C', reason: 'Billing a customer for unrequested work damages trust and contract governance.' },
      { choiceId: 'D', reason: 'Untested code running in production introduces major quality and reliability risks.' }
    ],
    decisionRule: 'Reject gold plating; deliverables must match approved requirements and baselines exactly.',
    diagnosedMistake: 'CHANGE/BASELINE ERROR',
    sourceReference: 'PMBOK 8th Edition - Scope Management & Vargas Flow'
  },
  {
    id: 'Q-PROC-02',
    domain: 'Process',
    ecoTask: 'Task 2.6: Plan and manage schedule',
    deliveryApproach: 'Predictive',
    difficulty: 'Difficult',
    scenario: 'A critical path activity in a predictive project is delayed by two weeks due to a machine breakdown. The project manager needs to bring the project back on schedule without compromising scope or quality. Executive management will not approve any budget increases.\n\nWhich schedule compression technique should the project manager consider FIRST?',
    choices: [
      { id: 'A', text: 'Crashing the schedule by approving weekend overtime.' },
      { id: 'B', text: 'Fast tracking by performing sequential critical path activities in parallel where feasible.' },
      { id: 'C', text: 'Reducing the scope of the remaining project deliverables.' },
      { id: 'D', text: 'Extending the project completion milestone date by two weeks in the schedule baseline.' }
    ],
    correctAnswer: 'B',
    bestAnswerReasoning: 'Fast tracking compresses the schedule by performing activities in parallel (which adds risk but does NOT inherently add cost). Crashing adds cost (overtime, extra labor), which is prohibited by executive budget restrictions.',
    distractorAnalysis: [
      { choiceId: 'A', reason: 'Crashing requires budget increases (overtime, additional personnel), which management explicitly rejected.' },
      { choiceId: 'C', reason: 'The scenario specifies not compromising scope.' },
      { choiceId: 'D', reason: 'Extending the baseline deadline is surrendering the schedule constraint before attempting internal compression techniques.' }
    ],
    decisionRule: 'When budget is locked, Fast Tracking is the primary compression option (accepting risk over cost); Crashing trades cost for time.',
    diagnosedMistake: 'KNOWLEDGE GAP',
    sourceReference: 'PMBOK 8th Edition - Planning Performance Domain'
  }
];
