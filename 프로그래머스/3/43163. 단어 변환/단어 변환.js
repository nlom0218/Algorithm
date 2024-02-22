function solution(begin, target, words) {
    if(!words.includes(target)) return 0;
    
    const queue = [[begin]];
    const visited = []
    let deps = 0;
    let isEnd = false;
    
    while(true) {
        const values = queue[deps];

        if(values.length === 0) break;
        
        queue[deps + 1] = [];
        
        for(let i = 0; i < values.length; i++) {
            const value = values[i]
            
            if(value === target) {
                isEnd = true;
                break;
            }
            
            const candidates = words.filter((word, index) => {
                if(visited[index]) return false;
                
                let diffCount = 0;
                for (let j = 0; j < value.length; j++) {
                    if (value[j] !== word[j]) diffCount += 1;
                }          
                if(diffCount === 1) visited[index] = true
                
                return diffCount === 1
            })
            
            queue[deps + 1] = [...queue[deps + 1], ...candidates]
        }
        if(isEnd) break;
        deps += 1
    }
    
    return isEnd ? deps : 0;
}