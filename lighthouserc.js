module.exports = {
  ci: {
    collect: {
      staticDistDir: './',
      url: ['index.html'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', {minScore: 0.8}],
        'categories:accessibility': ['error', {minScore: 0.9}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['warn', {minScore: 0.8}],
        'categories:pwa': ['warn', {minScore: 0.7}],
        'first-contentful-paint': ['warn', {maxNumericValue: 2000}],
        'interactive': ['warn', {maxNumericValue: 3500}],
        'max-potential-fid': ['warn', {maxNumericValue: 100}],
        'cumulative-layout-shift': ['warn', {maxNumericValue: 0.1}],
        'largest-contentful-paint': ['warn', {maxNumericValue: 2500}],
      },
    },
  },
};