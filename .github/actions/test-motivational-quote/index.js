import * as core from '@actions/core';
import * as github from '@actions/github';

async function fetchQuote() {
  const response = await fetch('https://zenquotes.io/api/random');
  if (!response.ok) {
    throw new Error(`Failed to fetch quote: ${response.statusText}`);
  }

  const [quoteData] = await response.json();
  if (!quoteData?.q || !quoteData?.a) {
    throw new Error('Quote or author not found in API response.');
  }

  return {
    quote: quoteData.q,
    author: quoteData.a,
  };
}

async function postComment(octokit, message) {
  await octokit.rest.issues.createComment({
    issue_number: github.context.issue.number,
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    body: message,
  });
}

async function run() {
  try {
    const token = core.getInput('GITHUB_TOKEN', { required: true });
    const octokit = github.getOctokit(token);

    const { quote, author } = await fetchQuote();
    const message = `💬 "${quote}" - ${author}`;

    await postComment(octokit, message);
    core.setOutput('quote', `${quote} - ${author}`);
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
