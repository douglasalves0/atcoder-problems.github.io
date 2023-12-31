async function init(){
    let button = document.getElementById('filter-button');
    button.addEventListener('click', async function(){
        let minRating = document.getElementById("min-rating").value;
        let maxRating = document.getElementById("max-rating").value;
        await filterProblems(minRating, maxRating);
    });
    filterProblems(0,5000);
}

async function filterProblems(minRating, maxRating){
    let problemsInfo = await (await fetch('https://kenkoooo.com/atcoder/resources/problems.json')).json();
    let problemsRatings = await (await fetch('https://kenkoooo.com/atcoder/resources/problem-models.json')).json();
    let problems = {};
    problemsInfo.forEach(problem => {
        problems[problem.id] = {
            name: problem.problem_index + " - " + problem.name,
            url: `https://atcoder.jp/contests/${problem.contest_id}/tasks/${problem.id}`,

        };
    });
    let problemsList = document.getElementById("problems-list");
    problemsList.innerHTML = "";
    let keysInReverse = Object.keys(problemsRatings).reverse();
    keysInReverse.forEach(problemId => {
        if(problemsRatings[problemId].difficulty < minRating) return;
        if(problemsRatings[problemId].difficulty > maxRating) return;
        if(problemsRatings[problemId].difficulty == null) return;
        if(problems[problemId] == undefined) return;
        let a = document.createElement("a");
        a.href = problems[problemId].url;
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(problems[problemId].name + " - Rating: " + problemsRatings[problemId].difficulty));
        a.appendChild(li);
        problemsList.appendChild(a);
    });
}

window.onload = init;