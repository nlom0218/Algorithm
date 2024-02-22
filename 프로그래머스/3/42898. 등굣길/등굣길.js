function solution(m, n, puddles) {
    const dp = Array.from({ length: n + 1 }, () => [])
    
    for(let i = 0; i < puddles.length; i++) {
        const [y, x] = puddles[i];
        
        dp[x][y] = 0;
    }
    
    dp[1][1] = 1
    
    for(let i = 0; i <= n; i++) {
        for(let j = 0; j <= m; j++) {
            if(i === 1 && j === 1) continue;
            
            if(i === 0 || j === 0) {
                dp[i][j] = 0
                
                continue;
            }
            
            if(dp[i][j] === 0) continue;
            
            dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000007;
        }
    }
    
    return dp[n][m]
}