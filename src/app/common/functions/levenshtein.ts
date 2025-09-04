// Fonction pour calculer la distance de Levenshtein entre deux chaînes

export function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = new Array(m + 1)
    .fill(0)
    .map(() => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else {
        const cost = a[i - 1] !== b[j - 1] ? 1 : 0;
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + cost,
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
        );
      }
    }
  }

  return dp[m][n];
}
