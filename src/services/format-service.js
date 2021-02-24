const FormatService = {
  firstUpperCaser(word) {
    const first = word[0].toUpperCase();
    return first + word.slice(1).toLowerCase();
  },
  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
};

export default FormatService;
