function solution(numbers, target) {
    let answer = 0;
    
    const recursion = (number, index) => {
        if(!numbers[index]) {
            if(number === target) answer += 1;
            return;
        }
        
        recursion(number + numbers[index], index + 1);
        recursion(number - numbers[index], index + 1);
    }
    
    recursion(0, 0);
    
    return answer
}