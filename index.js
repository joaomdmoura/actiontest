const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log(JSON.stringify(github.context.payload));
    const description = github.context.payload.body;
    const prTemplate = (await octokit.repos.getContent({
      owner: github.context.payload.pull_request.base.repo.owner.login,
      repo: github.context.payload.pull_request.base.repo.name,
      path: 'pull_request_template.md',
    })).data.map((review) => review.user.login);
    
    console.log(description)
    console.log(prTemplate)
    
    // let requiredReviews = [];
    // const team = JSON.parse(core.getInput('team'));
    // const githubToken = core.getInput('GITHUB_TOKEN');
    // const octokit = github.getOctokit(githubToken)
    
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