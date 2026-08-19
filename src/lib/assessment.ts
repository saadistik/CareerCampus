export interface AssessmentOption {
  label: string
  tags: string[]
}

export interface AssessmentQuestion {
  id: string
  question: string
  options: AssessmentOption[]
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    question: 'Which of these activities energises you most?',
    options: [
      { label: 'Finding patterns in a messy spreadsheet', tags: ['Data analysis', 'SQL', 'Statistics'] },
      { label: 'Sketching how a screen should look and flow', tags: ['Figma', 'User interviews'] },
      { label: 'Explaining a tricky idea so someone else gets it', tags: ['Communication', 'Stakeholder management'] },
      { label: 'Debugging why something stopped working', tags: ['Problem solving', 'JavaScript', 'Git'] },
    ],
  },
  {
    id: 'q2',
    question: 'A project just got messy. What do you reach for first?',
    options: [
      { label: 'A spreadsheet or query to see what actually happened', tags: ['SQL', 'Data analysis'] },
      { label: 'A conversation with everyone affected', tags: ['Stakeholder management', 'Communication'] },
      { label: 'A written plan that breaks the work into steps', tags: ['Requirements gathering', 'Process mapping'] },
      { label: 'The code or system itself', tags: ['Problem solving', 'System design'] },
    ],
  },
  {
    id: 'q3',
    question: 'Which output would you be proudest to ship?',
    options: [
      { label: 'A dashboard that changes how the team makes decisions', tags: ['Data visualisation', 'SQL'] },
      { label: 'A research finding that reshapes a product', tags: ['User interviews', 'Empathy mapping'] },
      { label: 'A roadmap the whole company aligns behind', tags: ['Roadmapping', 'Prioritisation'] },
      { label: 'A feature that thousands of people use daily', tags: ['JavaScript', 'System design'] },
    ],
  },
  {
    id: 'q4',
    question: 'How do you prefer to work with numbers?',
    options: [
      { label: 'Constantly — I want the data in front of me', tags: ['Statistics', 'Python'] },
      { label: 'Occasionally, to support a decision', tags: ['Data analysis'] },
      { label: 'Rarely — I focus on people and process instead', tags: ['Communication'] },
      { label: 'Only when reviewing metrics for something I built', tags: ['Problem solving'] },
    ],
  },
  {
    id: 'q5',
    question: 'Pick the meeting you would least want to skip.',
    options: [
      { label: 'A readout of last week\'s data', tags: ['Data analysis', 'Statistics'] },
      { label: 'A usability test with a real user', tags: ['User interviews'] },
      { label: 'A planning session that sets priorities', tags: ['Roadmapping', 'Prioritisation'] },
      { label: 'A code review', tags: ['Git', 'Problem solving'] },
    ],
  },
  {
    id: 'q6',
    question: 'What kind of feedback lands hardest for you?',
    options: [
      { label: '"Your analysis changed my mind"', tags: ['Data analysis', 'Communication'] },
      { label: '"You really understood what users needed"', tags: ['User interviews', 'Empathy mapping'] },
      { label: '"That process finally makes sense now"', tags: ['Process mapping', 'Requirements gathering'] },
      { label: '"This actually works, nice job"', tags: ['Problem solving', 'JavaScript'] },
    ],
  },
  {
    id: 'q7',
    question: 'Which tool would you be happiest using every day?',
    options: [
      { label: 'SQL / a BI tool', tags: ['SQL', 'Data visualisation'] },
      { label: 'Figma / a whiteboard', tags: ['Figma'] },
      { label: 'A roadmap or project tracker', tags: ['Roadmapping'] },
      { label: 'A code editor', tags: ['JavaScript', 'Git'] },
    ],
  },
  {
    id: 'q8',
    question: 'When a stakeholder disagrees with you, you usually:',
    options: [
      { label: 'Pull up the data to make the case', tags: ['Data analysis', 'SQL'] },
      { label: 'Ask more questions to understand their view', tags: ['Communication', 'Stakeholder management'] },
      { label: 'Propose a smaller step both sides can agree on', tags: ['Process mapping', 'Prioritisation'] },
      { label: 'Prototype something to make the tradeoff concrete', tags: ['System design', 'Figma'] },
    ],
  },
  {
    id: 'q9',
    question: 'How do you like to learn something new?',
    options: [
      { label: 'Work through a dataset or problem set', tags: ['Statistics', 'Python'] },
      { label: 'Watch how real people struggle with something', tags: ['User interviews'] },
      { label: 'Read the process end-to-end before starting', tags: ['Requirements gathering'] },
      { label: 'Build a small version and iterate', tags: ['Problem solving', 'System design'] },
    ],
  },
  {
    id: 'q10',
    question: 'Which failure would bother you most?',
    options: [
      { label: 'Shipping a report with a data error', tags: ['Statistics', 'Data analysis'] },
      { label: 'Designing something users find confusing', tags: ['Empathy mapping', 'Figma'] },
      { label: 'Missing a deadline because scope wasn\'t clear', tags: ['Requirements gathering', 'Prioritisation'] },
      { label: 'Shipping code that breaks in production', tags: ['Git', 'Problem solving'] },
    ],
  },
]
