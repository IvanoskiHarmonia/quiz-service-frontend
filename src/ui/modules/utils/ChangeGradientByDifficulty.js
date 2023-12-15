function ChangeGradientByDifficulty(difficulty) {
  switch (difficulty) {
    case 'EASY':
      return 'linear-gradient(to bottom, #add8e6af, white)';
    case 'MEDIUM':
      return 'linear-gradient(to bottom, #FED8B1AF, white)';
    case 'HARD':
      return 'linear-gradient(to bottom, #FF474CAF, white)';
    default:
      return 'none';
  }
}

export default ChangeGradientByDifficulty;
