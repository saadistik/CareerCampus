-- Bring job listings up to spec (>=20, spread across all published careers)
-- and top up learning_resources so every required skill has >=3 entries.

insert into public.jobs (title, company, location, job_type, category, description, career_id)
select v.title, v.company, v.location, v.job_type, v.category, v.description, c.id
from (values
  ('Data Visualisation Analyst', 'Petronas', 'Kuala Lumpur', 'full-time', 'Data & Analytics', 'Build dashboards and visual reports for the commercial data team.', 'Data Analyst'),
  ('UX Research Intern', 'Grab', 'Petaling Jaya', 'internship', 'Design', '3-month rotation supporting user research for the driver app team.', 'UX Researcher'),
  ('Junior UX Researcher', 'Touch ''n Go', 'Cyberjaya', 'full-time', 'Design', 'Run interviews and usability tests for the e-wallet product team.', 'UX Researcher'),
  ('UX Research Assistant', 'Public Bank', 'Kuala Lumpur', 'part-time', 'Design', 'Support research sessions and synthesise findings for the digital banking team.', 'UX Researcher'),
  ('Business Analyst', 'Petronas', 'Kuala Lumpur', 'full-time', 'Business', 'Gather requirements and map processes for internal digital projects.', 'Business Analyst'),
  ('Junior Business Analyst', 'RHB Bank', 'Kuala Lumpur', 'internship', 'Business', 'Support requirements gathering and stakeholder documentation.', 'Business Analyst'),
  ('Junior Software Engineer', 'Grab', 'Petaling Jaya', 'full-time', 'Engineering', 'Build and maintain features across the marketplace platform.', 'Software Engineer'),
  ('Software Engineer Intern', 'Shopee', 'Kuala Lumpur', 'internship', 'Engineering', '3-month internship building internal tooling.', 'Software Engineer'),
  ('Financial Analyst', 'Maybank', 'Kuala Lumpur', 'full-time', 'Finance', 'Build financial models and support budgeting cycles.', 'Financial Analyst'),
  ('Finance Associate', 'CIMB', 'Kuala Lumpur', 'part-time', 'Finance', 'Support reporting and reconciliation for the finance team.', 'Financial Analyst'),
  ('Digital Marketing Executive', 'AirAsia', 'Kuala Lumpur', 'full-time', 'Marketing', 'Run campaigns across social and search for the loyalty program.', 'Marketing Executive'),
  ('Marketing Intern', 'Watsons Malaysia', 'Petaling Jaya', 'internship', 'Marketing', 'Support content creation and social scheduling.', 'Marketing Executive'),
  ('Marketing Coordinator', 'Sunway Group', 'Selangor', 'full-time', 'Marketing', 'Coordinate campaign logistics and content calendars.', 'Marketing Executive'),
  ('HR Officer', 'Sunway Group', 'Selangor', 'full-time', 'Business', 'Support recruitment and onboarding for a growing team.', 'Human Resources Officer'),
  ('HR Intern', 'Nestle Malaysia', 'Petaling Jaya', 'internship', 'Business', 'Support HR operations and employee engagement activities.', 'Human Resources Officer'),
  ('IT Support Specialist', 'Maybank', 'Kuala Lumpur', 'full-time', 'Engineering', 'Provide technical support and manage internal IT tickets.', 'IT Support Specialist'),
  ('Desktop Support Technician', 'DXN Holdings', 'Penang', 'part-time', 'Engineering', 'Troubleshoot hardware and software issues for office staff.', 'IT Support Specialist'),
  ('Graphic Designer', 'Astro Malaysia', 'Kuala Lumpur', 'full-time', 'Design', 'Design visuals for on-air and digital marketing campaigns.', 'Graphic Designer'),
  ('Junior Graphic Designer', 'Grab', 'Johor Bahru', 'internship', 'Design', 'Support the design team with social and marketing assets.', 'Graphic Designer')
) as v(title, company, location, job_type, category, description, career_title)
join public.careers c on c.title = v.career_title
where not exists (select 1 from public.jobs j where j.title = v.title and j.company = v.company);

insert into public.learning_resources (skill_name, title, url)
select * from (values
  ('Communication', 'Business Communication Essentials — short course', null),
  ('Communication', 'Public Speaking for Professionals — self-paced', null),
  ('Communication', 'Effective Workplace Communication — guided project', null),

  ('Data analysis', 'Data Analysis Fundamentals — intro module', null),
  ('Data analysis', 'Excel Data Analysis Toolkit — guided project', null),
  ('Data analysis', 'Applied Data Analysis with Python — short course', null),

  ('Empathy mapping', 'Empathy Mapping for UX — guided project', null),
  ('Empathy mapping', 'User-Centred Design Basics — short course', null),
  ('Empathy mapping', 'Design Thinking Fundamentals — self-paced', null),

  ('Figma', 'Figma for Beginners — guided project', null),
  ('Figma', 'UI Design in Figma — short course', null),
  ('Figma', 'Prototyping with Figma — self-paced', null),

  ('Git', 'Git & GitHub Essentials — self-paced', null),
  ('Git', 'Version Control Fundamentals — short course', null),
  ('Git', 'Collaborative Git Workflows — guided project', null),

  ('JavaScript', 'JavaScript Fundamentals — short course', null),
  ('JavaScript', 'Modern JavaScript (ES6+) — self-paced', null),
  ('JavaScript', 'Build a Project with JavaScript — guided project', null),

  ('Prioritisation', 'Prioritisation Frameworks (RICE, MoSCoW) — short course', null),
  ('Prioritisation', 'Time & Task Prioritisation — self-paced', null),
  ('Prioritisation', 'Product Prioritisation Workshop — guided project', null),

  ('Problem solving', 'Structured Problem Solving — short course', null),
  ('Problem solving', 'Root Cause Analysis Basics — self-paced', null),
  ('Problem solving', 'Problem Solving for Engineers — guided project', null),

  ('Process mapping', 'Process Mapping Fundamentals — short course', null),
  ('Process mapping', 'Business Process Modelling — self-paced', null),
  ('Process mapping', 'Workflow Mapping Workshop — guided project', null),

  ('Python', 'Python for Beginners — short course', null),
  ('Python', 'Python for Data Analysis — guided project', null),
  ('Python', 'Automating Tasks with Python — self-paced', null),

  ('Roadmapping', 'Product Roadmapping Basics — short course', null),
  ('Roadmapping', 'Roadmap Planning Workshop — guided project', null),
  ('Roadmapping', 'Strategic Roadmapping — self-paced', null),

  ('SQL', 'SQL Fundamentals — short course', null),
  ('SQL', 'SQL for Data Analysis — guided project', null),
  ('SQL', 'Advanced SQL Queries — self-paced', null),

  ('Stakeholder management', 'Stakeholder Management Essentials — short course', null),
  ('Stakeholder management', 'Managing Stakeholder Expectations — self-paced', null),
  ('Stakeholder management', 'Stakeholder Communication Workshop — guided project', null),

  ('User research', 'User Research Methods — short course', null),
  ('User research', 'Conducting Effective User Research — guided project', null),
  ('User research', 'Research Synthesis Basics — self-paced', null),

  ('Content creation', 'Content Writing Essentials — short course', null),
  ('Content creation', 'Content Strategy Basics — self-paced', null),

  ('Excel', 'Excel Formulas & Functions — self-paced', null),
  ('Excel', 'Excel for Business Analysis — guided project', null),

  ('Networking', 'Computer Networking Basics — short course', null),
  ('Networking', 'IT Networking Certification Prep — self-paced', null),

  ('Organisation', 'Organisational Skills for Professionals — short course', null),
  ('Organisation', 'People Operations Fundamentals — self-paced', null),

  ('Requirements gathering', 'Requirements Elicitation Techniques — short course', null),
  ('Requirements gathering', 'Writing Effective Requirements — guided project', null),

  ('Social media', 'Social Media Marketing Basics — short course', null),
  ('Social media', 'Social Media Content Calendar Workshop — guided project', null),

  ('Statistics', 'Intro to Statistics — short course', null),
  ('Statistics', 'Applied Statistics with Python — self-paced', null),

  ('System design', 'System Design Fundamentals — short course', null),
  ('System design', 'Designing Scalable Systems — guided project', null),

  ('User interviews', 'User Interview Techniques — short course', null),
  ('User interviews', 'Synthesising Interview Insights — self-paced', null),

  ('Data visualisation', 'Data Storytelling with Charts — self-paced', null)
) as v(skill_name, title, url)
where not exists (
  select 1 from public.learning_resources lr
  where lower(lr.skill_name) = lower(v.skill_name) and lr.title = v.title
);
