import { Profession, SkillsMatrix } from './data';

/**
 * Flatten SkillsMatrix into a single array of numbers for similarity calculation
 */
function flattenSkills(matrix: SkillsMatrix): number[] {
  return [
    matrix.management.decisionMaking,
    matrix.management.delegation,
    matrix.management.strategicThinking,
    matrix.cognitive.analytical,
    matrix.cognitive.criticalThinking,
    matrix.cognitive.algorithmicLogic,
    matrix.social.eq,
    matrix.social.negotiation,
    matrix.social.teamwork,
    matrix.techCreative.digitalLiteracy,
    matrix.techCreative.visualization
  ];
}

/**
 * Cosine Similarity calculation between two vectors.
 */
export function calculateCosineSimilarity(userVector: number[], profVector: number[]): number {
  let dotProduct = 0;
  let mA = 0;
  let mB = 0;

  for (let i = 0; i < userVector.length; i++) {
    dotProduct += userVector[i] * profVector[i];
    mA += userVector[i] * userVector[i];
    mB += profVector[i] * profVector[i];
  }

  mA = Math.sqrt(mA);
  mB = Math.sqrt(mB);

  if (mA === 0 || mB === 0) return 0;

  return dotProduct / (mA * mB);
}

export function getTopMatches(userScores: any, professions: Profession[], limit: number = 3) {
  const userMatrix: SkillsMatrix = {
    management: {
      decisionMaking: userScores.management?.decisionMaking || 0,
      delegation: userScores.management?.delegation || 0,
      strategicThinking: userScores.management?.strategicThinking || 0,
    },
    cognitive: {
      analytical: userScores.cognitive?.analytical || 0,
      criticalThinking: userScores.cognitive?.criticalThinking || 0,
      algorithmicLogic: userScores.cognitive?.algorithmicLogic || 0,
    },
    social: {
      eq: userScores.social?.eq || 0,
      negotiation: userScores.social?.negotiation || 0,
      teamwork: userScores.social?.teamwork || 0,
    },
    techCreative: {
      digitalLiteracy: userScores.techCreative?.digitalLiteracy || 0,
      visualization: userScores.techCreative?.visualization || 0,
    }
  };

  const userVector = flattenSkills(userMatrix);

  const scoredProfessions = professions.map(prof => {
    const profVector = flattenSkills(prof.requirements);
    const similarity = calculateCosineSimilarity(userVector, profVector);
    return { ...prof, similarity };
  });

  return scoredProfessions
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Calculate similarity for school professions based on 5 skills
 */
export function getSchoolTopMatches(userScores: any, professions: any[], limit: number = 3) {
  const userVector = [
    userScores.logic || 0,
    userScores.communication || 0,
    userScores.creativity || 0,
    userScores.leadership || 0,
    userScores.technical || 0
  ];

  const scoredProfessions = professions.map(prof => {
    const profVector = [
      prof.skills.logic,
      prof.skills.communication,
      prof.skills.creativity,
      prof.skills.leadership,
      prof.skills.technical
    ];
    const similarity = calculateCosineSimilarity(userVector, profVector);
    return { ...prof, similarity };
  });

  return scoredProfessions
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

/**
 * Calculate average scores for the 4 main blocks for visualization
 */
export function calculateBlockScores(userScores: any) {
  const blocks = [
    { 
      name: 'Boshqaruv', 
      value: (
        (userScores.management?.decisionMaking || 0) + 
        (userScores.management?.delegation || 0) + 
        (userScores.management?.strategicThinking || 0)
      ) / 3 
    },
    { 
      name: 'Kognitiv', 
      value: (
        (userScores.cognitive?.analytical || 0) + 
        (userScores.cognitive?.criticalThinking || 0) + 
        (userScores.cognitive?.algorithmicLogic || 0)
      ) / 3 
    },
    { 
      name: 'Ijtimoiy', 
      value: (
        (userScores.social?.eq || 0) + 
        (userScores.social?.negotiation || 0) + 
        (userScores.social?.teamwork || 0)
      ) / 3 
    },
    { 
      name: 'Texnik/Ijodiy', 
      value: (
        (userScores.techCreative?.digitalLiteracy || 0) + 
        (userScores.techCreative?.visualization || 0)
      ) / 2 
    }
  ];
  return blocks;
}
