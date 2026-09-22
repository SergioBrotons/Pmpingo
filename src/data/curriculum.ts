import { CurriculumDay } from '@/types';

export const CURRICULUM_DAYS: CurriculumDay[] = [
  {
    day: 1,
    week: 1,
    title: 'Exam Architecture & Servant Leadership',
    domain: 'People',
    ecoTask: 'Task 1.2: Lead a team',
    deliveryFocus: 'Hybrid',
    microLesson: {
      summary: 'Servant leadership places the project manager as an enabler, facilitator, and impediment remover rather than a command-and-control director.',
      whyItMatters: 'Over 50% of people domain questions penalize punitive, directive, or premature escalation behaviors.',
      predictiveTake: 'The PM aligns project constraints and provides clear direction while supporting team autonomy.',
      agileTake: 'The PM (or Scrum Master) shields the team from external noise, supports self-organization, and facilitates value delivery.',
      pmpTrap: 'Assuming servant leadership means having no authority or tolerating unresolved ethical/safety violations.',
      whatToNotice: 'Look for phrases like "team is struggling with collaboration" or "stakeholder bypasses team". The answer is almost always facilitate, empower, or remove blocker.'
    },
    questionIds: ['Q-DIAG-01', 'Q-PEOP-01', 'Q-PEOP-02']
  },
  {
    day: 2,
    week: 1,
    title: 'Managing Conflict & Escalation Hierarchy',
    domain: 'People',
    ecoTask: 'Task 1.1: Manage conflict',
    deliveryFocus: 'Universal',
    microLesson: {
      summary: 'Conflict is inevitable and should be addressed directly, starting with the individuals involved before any escalation.',
      whyItMatters: 'Thomas-Kilmann modes (Collaborate, Compromise, Accommodate, Force, Avoid) appear frequently in subtle situational forms.',
      predictiveTake: 'Use ground rules, team charter, and direct discussion before revising management plans or involving sponsors.',
      agileTake: 'Enable the self-organizing team to work through conflict during retrospective or 1-on-1 coaching.',
      pmpTrap: 'Escalating immediately to HR, functional managers, or the sponsor without the PM facilitating a resolution first.',
      whatToNotice: 'Is the conflict personal or technical? Collaboration / Problem-solving is the preferred long-term win-win mode.'
    },
    questionIds: ['Q-PEOP-03', 'Q-PEOP-04', 'Q-DIAG-02']
  },
  {
    day: 3,
    week: 1,
    title: 'Agile Mindset vs Predictive Governance',
    domain: 'Process',
    ecoTask: 'Task 2.13: Determine appropriate project methodology',
    deliveryFocus: 'Agile',
    microLesson: {
      summary: 'Predictive plans upfront with formal change control; Adaptive expects change, prioritizes value via backlog, and welcomes customer collaboration.',
      whyItMatters: 'Choosing a predictive tool (e.g. formal CCB change request) inside an agile sprint review is the #1 failure mode on the exam.',
      predictiveTake: 'Detailed WBS, scope baseline, variance analysis, formal CCB approvals.',
      agileTake: 'Product backlog, user stories, Sprint planning, continuous refinement with Product Owner.',
      pmpTrap: 'Applying CCB processes inside a standard Sprint backlog adjustment.',
      whatToNotice: 'Notice the delivery environment mentioned in the first sentence: "In a hybrid project...", "During an agile iteration...".'
    },
    questionIds: ['Q-DIAG-03', 'Q-PROC-01', 'Q-PROC-02']
  },
  {
    day: 4,
    week: 1,
    title: 'Risk vs Issue — The Boundary Line',
    domain: 'Process',
    ecoTask: 'Task 2.3: Assess and manage risks & Task 2.15: Manage project issues',
    deliveryFocus: 'Universal',
    microLesson: {
      summary: 'A RISK is an uncertain future event with positive or negative impact. An ISSUE is a realized event happening NOW that requires immediate containment.',
      whyItMatters: 'Confusing these leads to taking preventative risk planning actions for a burning fire, or logging an emergency issue for a distant possibility.',
      predictiveTake: 'Risk Register (probability x impact, responses) vs Issue Log (owner, action items, target date).',
      agileTake: 'Spikes, risk-adjusted backlog, and impediments log / daily standup blockers.',
      pmpTrap: 'Selecting "update risk register" when the supplier has ALREADY gone bankrupt.',
      whatToNotice: '"Might happen / potential" = RISK. "Has occurred / is currently impacting" = ISSUE.'
    },
    questionIds: ['Q-PROC-03', 'Q-PROC-04', 'Q-DIAG-04']
  },
  {
    day: 5,
    week: 1,
    title: 'Business Value & Compliance Governance',
    domain: 'Business Environment',
    ecoTask: 'Task 3.1: Plan and manage project compliance',
    deliveryFocus: 'Predictive',
    microLesson: {
      summary: 'Compliance requirements (legal, health, regulatory) are non-negotiable and take precedence over schedule speed.',
      whyItMatters: 'Business environment accounts for 8% of the exam but carries high-stakes fail gates regarding ethics and legal mandates.',
      predictiveTake: 'Compliance management plan, quality audits, regulatory sign-offs.',
      agileTake: 'Definition of Done (DoD) including compliance acceptance criteria.',
      pmpTrap: 'Treating a regulatory legal requirement as an optional user story that can be deprioritized without consequences.',
      whatToNotice: 'When safety or regulatory fines are at stake, analysis and non-negotiable compliance take priority.'
    },
    questionIds: ['Q-BUS-01', 'Q-BUS-02', 'Q-DIAG-05']
  },
  {
    day: 6,
    week: 1,
    title: 'Team Empowerment & Ground Rules',
    domain: 'People',
    ecoTask: 'Task 1.4: Empower team members and stakeholders',
    deliveryFocus: 'Agile',
    microLesson: {
      summary: 'High-performing teams establish their own team charter and ground rules to govern behavior, communication, and decision boundaries.',
      whyItMatters: 'When team members breach etiquette, the PM does not punish—the PM refers the team back to their mutually agreed ground rules.',
      predictiveTake: 'Team charter created during project kickoff.',
      agileTake: 'Working agreements generated and refined in sprint retrospectives.',
      pmpTrap: 'PM imposing rules unilaterally from above.',
      whatToNotice: '"Team members are speaking over each other in meetings" -> Review team ground rules.'
    },
    questionIds: ['Q-PEOP-05', 'Q-PEOP-06']
  },
  {
    day: 7,
    week: 1,
    title: 'Week 1 Boss: Foundations Mastery Sprint',
    domain: 'Process',
    ecoTask: 'Task 2.9: Integrate project planning activities',
    deliveryFocus: 'Hybrid',
    microLesson: {
      summary: 'Integration is the primary responsibility of the project manager: balancing scope, schedule, budget, risk, and stakeholder expectations.',
      whyItMatters: 'Consolidates all lessons from Week 1 into multi-variable scenarios.',
      predictiveTake: 'Project Management Plan integration.',
      agileTake: 'Coordinating cross-team dependencies and release planning.',
      pmpTrap: 'Looking at one constraint in isolation without assessing ripple effects on others.',
      whatToNotice: 'Does the scenario ask for FIRST, NEXT, or BEST? Analyze before taking action.'
    },
    questionIds: ['Q-BOSS-01', 'Q-BOSS-02', 'Q-BOSS-03']
  }
];
