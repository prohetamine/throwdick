const types = {
  '0': ['d', 'd'],
  '1': ['k', 'k'],
  '2': ['M', ' Million'],
  '3': ['M', ' Milliard'],
  '4': ['B', ' Billion'],
  '5': ['T', ' Trillion'],
  '6': ['Q', ' Quadrillion'],
  '7': ['Q', ' Quintillion'],
  '8': ['S', ' Sextillion'],
  '9': ['S', ' Septillion'],
  '10': ['O', ' Octillion'],
  '11': ['N', ' Nonillion'],
  '12': ['D', ' Decillion'],
  '13': ['U', ' Undecillion'],
  '14': ['D', ' Duodecillion'],
  '15': ['T', ' Tredecillion'],
  '16': ['Q', ' Quattuordecillion'],
  '17': ['Q', ' Quindecillion'],
  '18': ['S', ' Sexdecillion'],
  '19': ['S', ' Septendecillion'],
  '20': ['O', ' Octodecillion'],
  '21': ['N', ' Novemdecillion'],
  '22': ['V', ' Vigintillion'],
  '23': ['C', ' Centillion'],
  '24': ['FK', ' Fuckillion'],
  '25': ['Dk', ' Dickillion'],
}

const normalizeCount = count => {
  const numbers = count.toString().split('').reverse().map((e, i) => i % 3 === 0 ? e+',' : e).reverse().join('').replace(/,$/gi, '').split(',').map(e => parseInt(e)).reverse()

  if (numbers.length > 26) {
    return ['🔥 Infinity Dicks 🔥', '']
  } else {
    const counts = numbers.map((numb, i) => {
      return [
        numb > 0 ? numb + '' + types[i][0] : '',
        numb > 0 ? numb + '' + types[i][1] : ''
      ]
    })

    const countsReverse = counts.reverse()

    return [
      [
        countsReverse[0][0],
        countsReverse[0][1]
      ],
      parseInt(
        counts
          .map(e => e[0])
          .filter(f => f)
          .slice(1)
          .join(' ')
      ) > 0
        ? '+ ' + counts.map(e => e[0]).filter(f => f).slice(1).slice(-3).join(' ')
        : ''
    ]
  }
}

export default normalizeCount
