-- Additional career paths, bringing total coverage beyond tech/data roles.
-- Safe to re-run: skips careers that already exist by title.

insert into public.careers (title, category, description, salary_min, salary_max, status)
select * from (values
  ('Marketing Executive', 'Marketing', 'Plan campaigns, manage social channels, and turn content into measurable growth.', 3200, 5500, 'published'),
  ('Financial Analyst', 'Finance', 'Build financial models and turn numbers into decisions for budgeting and investment.', 4000, 7500, 'published'),
  ('Human Resources Officer', 'Business', 'Support recruitment, onboarding, and day-to-day people operations for a growing team.', 3300, 5800, 'published'),
  ('IT Support Specialist', 'Engineering', 'Keep systems running and support end users with hands-on technical troubleshooting.', 2800, 4800, 'published'),
  ('Graphic Designer', 'Design', 'Turn ideas into visuals across branding, social, and marketing materials.', 3000, 5200, 'published')
) as v(title, category, description, salary_min, salary_max, status)
where not exists (select 1 from public.careers c where c.title = v.title);

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Communication', 2), ('Content creation', 1.5), ('Social media', 1.5), ('Data analysis', 1.5), ('Prioritisation', 1.5)
) as s(skill_name, weight)
where title = 'Marketing Executive'
  and not exists (select 1 from public.career_skills cs where cs.career_id = careers.id);

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Excel', 2), ('Statistics', 2), ('Data analysis', 1.5), ('Communication', 1), ('Problem solving', 1.5)
) as s(skill_name, weight)
where title = 'Financial Analyst'
  and not exists (select 1 from public.career_skills cs where cs.career_id = careers.id);

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Communication', 2.5), ('Stakeholder management', 2), ('Organisation', 1.5), ('Empathy mapping', 1), ('Prioritisation', 1)
) as s(skill_name, weight)
where title = 'Human Resources Officer'
  and not exists (select 1 from public.career_skills cs where cs.career_id = careers.id);

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Problem solving', 2), ('System design', 1), ('Git', 1), ('Communication', 2), ('Networking', 2)
) as s(skill_name, weight)
where title = 'IT Support Specialist'
  and not exists (select 1 from public.career_skills cs where cs.career_id = careers.id);

insert into public.career_skills (career_id, skill_name, weight)
select id, skill_name, weight from public.careers, (values
  ('Figma', 2.5), ('Empathy mapping', 1), ('Content creation', 1.5), ('Communication', 1.5), ('Prioritisation', 1.5)
) as s(skill_name, weight)
where title = 'Graphic Designer'
  and not exists (select 1 from public.career_skills cs where cs.career_id = careers.id);

-- a couple of learning resources for the new skill vocabulary
insert into public.learning_resources (skill_name, title, url)
select * from (values
  ('Content creation', 'Content Marketing Basics — short course', null),
  ('Social media', 'Social Media Strategy — guided project', null),
  ('Excel', 'Excel for Financial Analysis — intro module', null),
  ('Networking', 'Networking Fundamentals — self-paced', null),
  ('Organisation', 'People Operations 101 — short course', null)
) as v(skill_name, title, url)
where not exists (select 1 from public.learning_resources lr where lr.skill_name = v.skill_name);
