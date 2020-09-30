const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // `reviews` and `team` inputs defined in action metadata file
    const team = core.getInput('team');
    const githubToken = core.getInput('GITHUB_TOKEN');
    const octokit = github.getOctokit(githubToken)

    const reviews = await octokit.pulls.listReviews({
      owner: github.context.payload.pull_request.base.repo.owner.login,
      repo: github.context.payload.pull_request.base.repo.name,
      pull_number: github.context.payload.pull_request.number,
    });
    
    // const reviews = data.map((review) => review.user.login);
      
    console.log(`reviews payload: ${JSON.stringify(reviews)}`);
    console.log(`team payload: ${team}`);
    core.setOutput("reviewed", false);

    // const review_owners = reviews.map(review => review.owner);

    // team.forEach(member => {
    //   let haveReviewed = reviews.includes(member);
    //   core.setOutput("reviewed", haveReviewed);
    // });
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();