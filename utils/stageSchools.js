import _ from 'lodash'
export const stagesAll = [{
  text: 'SD & MI',
  value: 'sd'
}, {
  text: 'SMP & MTs',
  value: 'smp'
}, {
  text: 'SMA/SMK & MA',
  value: 'sma'
}, {
  text: 'Universitas',
  value: 'universitas'
}, {
  text: 'Kursus',
  value: 'kursus'
}]

export const getStage = (args) => {
  switch (_.upperCase(args)) {
    case 'SD':
      return stagesAll[0]
    case 'SMP':
      return stagesAll[1]
    case 'SMA':
      return stagesAll[2]
    case 'UNIVERSITAS':
      return stagesAll[3]
    case 'KURSUS':
      return stagesAll[4]
  }
}
