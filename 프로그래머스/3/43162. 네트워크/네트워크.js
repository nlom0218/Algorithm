function solution(n, computers) {
    let answer = 0;
    const visited = Array.from({length: n}, () => false)   
    
    const maps = {};
    
    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            if(computers[i][j] === 0 || i === j) continue;
            
            maps[i] = [...(maps[i] || []), j]
        }
    }
    
    for(let i = 0; i < n; i++) {
        if(visited[i]) continue;
        
        answer += 1;
        
        const queue = [[i]];
        let deps = 0;
        
        while(true) {
            const values = queue[deps];
            
            if(values.length === 0) break;
            
            queue[deps + 1] = [];
            
            for(let j = 0; j < values.length; j++) {
                const value = values[j]
                
                if(visited[value]) continue;
                
                visited[value] = true
                queue[deps + 1].push(...(maps[value] || []))
            }
            deps += 1        
        }
    }
    
    return answer
}