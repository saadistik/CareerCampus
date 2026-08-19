-- Starter content: careers, required skills, learning resources, jobs.
-- Safe to re-run: clears and re-inserts.

truncate table public.jobs, public.career_skills, public.learning_resources, public.careers restart identity cascade;

insert into public.careers (title, category, description, salary_min, salary_max, status) values
  ('Data Analyst', 'Data & Analytics', 'Turn raw business data into decisions — SQL, dashboards, and clear write-ups.', 3800, 6500, 'published'),
  ('UX Researcher', 'Design', 'Study how people use products and turn findings into design decisions.', 3500, 6000, 'published'),
  ('Business Analyst', 'Business', 'Bridge business needs and technical teams with process and requirements work.', 4000, 7000, 'published'),
  ('Software Engineer', 'Engineering', 'Build and maintain the systems the rest of the business runs on.', 4200, 8000, 'published'),
  ('Product Manager', 'Business', 'Own the roadmap and coordinate design, engineering, and stakeholders.', 4500, 8500, 'draft');

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('SQL', 2), ('Python', 2), ('Communication', 1), ('Data visualisation', 1.5), ('Statistics', 1.5)
) as s(skill_name, weight)
where title = 'Data Analyst';

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('User interviews', 2), ('Figma', 1.5), ('Communication', 1.5), ('Data analysis', 1), ('Empathy mapping', 1)
) as s(skill_name, weight)
where title = 'UX Researcher';

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Requirements gathering', 2), ('SQL', 1), ('Communication', 2), ('Process mapping', 1.5), ('Stakeholder management', 1.5)
) as s(skill_name, weight)
where title = 'Business Analyst';

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('JavaScript', 2), ('Python', 1.5), ('Problem solving', 2), ('Git', 1), ('System design', 1.5)
) as s(skill_name, weight)
where title = 'Software Engineer';

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Roadmapping', 2), ('Communication', 2), ('Data analysis', 1.5), ('User research', 1), ('Prioritisation', 1.5)
) as s(skill_name, weight)
where title = 'Product Manager';

insert into public.learning_resources (skill_name, title, url) values
  ('Data visualisation', 'Data Visualisation with Tableau — short course', null),
  ('Statistics', 'Statistics for Data Analysis — intro module', null),
  ('Data visualisation', 'Power BI fundamentals — guided project', null),
  ('User interviews', 'Conducting User Interviews — guided project', null),
  ('System design', 'System Design Primer — self-paced', null);

insert into public.jobs (title, company, location, job_type, category, description, career_id)
select 'Junior Data Analyst', 'Maybank', 'Kuala Lumpur', 'full-time', 'Data & Analytics',
  'Support the risk analytics team with reporting and dashboard upkeep.', id
from public.careers where title = 'Data Analyst';

insert into public.jobs (title, company, location, job_type, category, description, career_id)
select 'Data Analyst Intern', 'Grab', 'Petaling Jaya', 'internship', 'Data & Analytics',
  '3-month rotation across the marketplace analytics squad.', id
from public.careers where title = 'Data Analyst';

insert into public.jobs (title, company, location, job_type, category, description, career_id)
select 'Business Intelligence Assistant', 'AirAsia', 'Kuala Lumpur', 'full-time', 'Data & Analytics',
  'Build recurring reports for the commercial planning team.', id
from public.careers where title = 'Data Analyst';

insert into public.jobs (title, company, location, job_type, category, description, career_id)
select 'Reporting Analyst', 'CIMB', 'Kuala Lumpur', 'part-time', 'Data & Analytics',
  'Own weekly reporting cycles for the retail banking division.', id
from public.careers where title = 'Data Analyst';
