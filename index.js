const core = require('@actions/core');
const github = require('@actions/github');

function findDiff(str1, str2){ 
  let diff= "";
  str2.split('').forEach(function(val, i){
    if (val != str1.charAt(i))
      diff += val ;         
  });
  return diff;
}

async function run() {
  try {
    const githubToken = core.getInput('GITHUB_TOKEN');
    const templatePath = core.getInput('PR_TEMPLATE_PATH');
    const octokit = github.getOctokit(githubToken);
    const description = github.context.payload.pull_request.body;
    const prTemplate = (await octokit.repos.getContent({
      owner: github.context.payload.pull_request.base.repo.owner.login,
      repo: github.context.payload.pull_request.base.repo.name,
      path: templatePath,
    })).data.content;
    
    const templateContent = (new Buffer.from(prTemplate, 'base64')).toString('utf8');

    console.log("=====================");
    console.log(templateContent);
    console.log("=====================");
    console.log(description);
    console.log("=====================");
    console.log(templateContent == description);
    console.log("=====================");
    console.log(templateContent === description)
    console.log("=====================");
    let diff = findDiff(templateContent,description);
    console.log(diff)
    console.log("=====================");
    if(description === "") {
      core.setFailed('PR Description is empty, please provide one.')
    }
    else if(templateContent == description) {
      core.setFailed('Please fill in the PR description template.')
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();