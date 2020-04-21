export function formatPrice(x, currency) {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
}

export function regexFilterBySize(key) {
  let regex = '';
  regex = regex.concat('^', key, '$');
  regex = regex.concat('|^', key, ',+');
  regex = regex.concat('|,+', key, ',+');
  regex = regex.concat('|,+', key, '$');
  return regex;
}
