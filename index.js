const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `reviews` and `team` inputs defined in action metadata file
  const reviews = core.getInput('reviews');
  const team = core.getInput('team');

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
    core.setOutput("reviewed", false);

  // const review_owners = reviews.map(review => review.owner);

  // team.forEach(member => {
  //   let haveReviewed = reviews.includes(member);
  //   core.setOutput("reviewed", haveReviewed);
  // });
} catch (error) {
  core.setFailed(error.message);
}