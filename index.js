const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log(JSON.stringify(github.context.payload));
    
    // let requiredReviews = [];
    // const team = JSON.parse(core.getInput('team'));
    // const githubToken = core.getInput('GITHUB_TOKEN');
    // const octokit = github.getOctokit(githubToken)
    // const reviews = (await octokit.pulls.listReviews({
    //   owner: github.context.payload.pull_request.base.repo.owner.login,
    //   repo: github.context.payload.pull_request.base.repo.name,
    //   pull_number: github.context.payload.pull_request.number,
    // })).data.map((review) => review.user.login);
    

    // team.forEach(member => {
    //   requiredReviews.push(reviews.includes(member));
    // });

    // if(!requiredReviews.includes(true)) {
    //   core.setFailed(`Expect at leat one review from the team: ${JSON.stringify(team)}`);
    // }
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();