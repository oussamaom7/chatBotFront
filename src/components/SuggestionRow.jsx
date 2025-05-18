import React from 'react';
import styles from '../styles/SuggestionRow.module.css';
// Optionally add icons in the future
const suggestions = [
  'What job suits me?',
  'Improve my CV',
  'Interview tips',
  'Career roadmap',
];

const SuggestionRow = ({ onSuggestion }) => (
  <div className={styles.suggestionRow}>
    {suggestions.map((s, idx) => (
      <button
        key={idx}
        className={styles.suggestionBtn}
        onClick={() => onSuggestion(s)}
      >
        {s}
      </button>
    ))}
  </div>
);

export default SuggestionRow;
