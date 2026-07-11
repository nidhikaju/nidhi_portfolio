import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import axios from 'axios';
import { FiStar, FiGitBranch, FiGithub, FiCalendar } from 'react-icons/fi';

const GithubStats = () => {
  const username = "utkarsharma12";
  const [repos, setRepos] = useState([]);
  
  // Track selected year for the calendar
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };
    fetchRepos();
  }, [username]);

  const explicitTheme = {
    light: ['#0f172a', '#1e293b', '#3b82f6', '#8b5cf6', '#22d3ee'],
    dark: ['#0f172a', '#1e293b', '#3b82f6', '#8b5cf6', '#22d3ee'],
  };

  return (
    <section id="github-stats" className="py-24 relative px-4 z-10 bg-ai-dark/60 border-t border-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono">
            [ <span className="text-ai-accent">GITHUB_DATA</span> ]
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-accent to-ai-purple rounded"></div>
        </div>

        <div className="space-y-12">
          {/* Contribution Graph */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col items-center overflow-x-auto w-full">
            <div className="w-full flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-xl font-bold font-mono text-slate-200 flex items-center gap-2">
                <FiGithub className="text-ai-accent" /> Contribution Graph
              </h3>
              
              {/* Year Selector */}
              <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-800">
                {[currentYear, currentYear - 1, currentYear - 2, 'last'].map((yearOption) => (
                  <button
                    key={yearOption}
                    onClick={() => setSelectedYear(yearOption)}
                    className={`px-4 py-1.5 text-xs font-mono rounded-md transition-all ${
                      selectedYear === yearOption 
                        ? 'bg-ai-accent text-slate-900 font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {yearOption === 'last' ? 'Past Year' : yearOption}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center text-slate-300 p-2 min-h-[160px] items-center">
              <GitHubCalendar 
                username={username} 
                theme={explicitTheme}
                colorScheme="dark"
                blockSize={14}
                blockMargin={6}
                fontSize={14}
                year={selectedYear === 'last' ? 'last' : selectedYear}
              />
            </div>
          </div>

          {/* Repositories & Stars */}
          <div>
            <h3 className="text-xl font-bold font-mono text-slate-200 mb-6 flex items-center gap-2">
              <FiGitBranch className="text-ai-purple" /> Recent Repositories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <a 
                  key={repo.id} 
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-6 rounded-2xl border-slate-800 hover:border-ai-accent hover:-translate-y-1 transition-all duration-300 block group"
                >
                  <h4 className="text-lg font-bold text-slate-200 group-hover:text-ai-accent transition-colors font-mono truncate mb-2">
                    {repo.name}
                  </h4>
                  <p className="text-sm text-slate-400 mb-4 h-10 overflow-hidden leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-ai-purple">
                      <div className="w-2 h-2 rounded-full bg-ai-purple"></div>
                      {repo.language || 'Unknown'}
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <FiStar className="text-ai-accent" />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
