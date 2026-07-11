import axios from 'axios';

const GITHUB_USERNAME = 'utkarsharma12';

export const fetchGithubStats = async () => {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const reposRes = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    
    // Calculate total stars
    const stars = reposRes.data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
    
    // Determine top languages
    const languages = {};
    reposRes.data.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Sort languages
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return {
      public_repos: userRes.data.public_repos,
      followers: userRes.data.followers,
      stars: stars,
      top_languages: sortedLanguages
    };
  } catch (error) {
    console.error("Error fetching GitHub stats", error);
    return null;
  }
};
