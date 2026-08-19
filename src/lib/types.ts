export interface Profile {
  id: string
  full_name: string | null
  education_level: string | null
  field_of_study: string | null
  work_experience: string | null
  interests: string[]
  skills: string[]
  role: 'student' | 'admin'
}

export interface Career {
  id: string
  title: string
  category: string | null
  description: string | null
  salary_min: number | null
  salary_max: number | null
  status: 'draft' | 'published'
}

export interface CareerSkill {
  id: string
  career_id: string
  skill_name: string
  weight: number
}

export interface CareerMatch extends Career {
  matchPercent: number
  requiredSkills: CareerSkill[]
}

export interface LearningResource {
  id: string
  skill_name: string
  title: string
  url: string | null
}

export interface SavedCareer {
  user_id: string
  career_id: string
}

export interface ExperienceEntry {
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  bullets: string[]
}

export interface EducationEntry {
  degree: string
  school: string
  location: string
  graduationDate: string
  gpa: string
}

export interface ProjectEntry {
  name: string
  tech: string
  bullets: string[]
  link: string
}

export interface Resume {
  user_id: string
  full_name: string | null
  email: string | null
  phone: string | null
  location: string | null
  linkedin: string | null
  summary: string | null
  experience: ExperienceEntry[]
  education: EducationEntry[]
  projects: ProjectEntry[]
  skills: string[]
  template: 'modern' | 'classic'
}

export interface Job {
  id: string
  title: string
  company: string
  location: string | null
  job_type: 'full-time' | 'part-time' | 'internship' | null
  category: string | null
  description: string | null
  career_id: string | null
}
