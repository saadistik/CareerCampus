import type { Career, CareerSkill, CareerMatch } from './types'

/**
 * Rule-based match score: the fraction of a career's weighted required
 * skills that the user's profile already covers, as a percentage.
 * A user skill "counts" for a required skill on a case-insensitive
 * substring match in either direction (so "SQL" matches "Advanced SQL").
 */
export function scoreCareer(requiredSkills: CareerSkill[], userSkills: string[]): number {
  if (requiredSkills.length === 0) return 0
  const userSkillsLower = userSkills.map((s) => s.toLowerCase().trim())

  const totalWeight = requiredSkills.reduce((sum, s) => sum + Number(s.weight), 0)
  if (totalWeight === 0) return 0

  const coveredWeight = requiredSkills.reduce((sum, req) => {
    const reqLower = req.skill_name.toLowerCase().trim()
    const has = userSkillsLower.some(
      (us) => us === reqLower || us.includes(reqLower) || reqLower.includes(us)
    )
    return has ? sum + Number(req.weight) : sum
  }, 0)

  return Math.round((coveredWeight / totalWeight) * 100)
}

export function rankCareers(
  careers: Career[],
  skillsByCareer: Record<string, CareerSkill[]>,
  userSkills: string[]
): CareerMatch[] {
  return careers
    .map((career) => {
      const requiredSkills = skillsByCareer[career.id] ?? []
      return {
        ...career,
        requiredSkills,
        matchPercent: scoreCareer(requiredSkills, userSkills),
      }
    })
    .sort((a, b) => b.matchPercent - a.matchPercent)
}

export function missingSkills(requiredSkills: CareerSkill[], userSkills: string[]): CareerSkill[] {
  const userSkillsLower = userSkills.map((s) => s.toLowerCase().trim())
  return requiredSkills.filter((req) => {
    const reqLower = req.skill_name.toLowerCase().trim()
    return !userSkillsLower.some(
      (us) => us === reqLower || us.includes(reqLower) || reqLower.includes(us)
    )
  })
}
