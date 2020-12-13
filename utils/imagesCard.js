import _ from 'lodash'

export default function (args, ctx) {
  if (!args) { return }
  const context = _.upperCase(args)
  switch (context) {
    case 'ACEH':
      return require('@/assets/img/prov-aceh.png?webp')
    case 'BALI':
      return require('@/assets/img/prov-bali.png?webp')
    case 'BANTEN':
      return require('@/assets/img/prov-banten.png?webp')
    case 'BENGKULU':
      return require('@/assets/img/prov-bengkulu.png?webp')
    case 'DI YOGYAKARTA':
      return require('@/assets/img/prov-di-yogyakarta.png?webp')
    case 'DKI JAKARTA':
      return require('@/assets/img/prov-dki-jakarta.png?webp')
    case 'GORONTALO':
      return require('@/assets/img/prov-gorontalo.png?webp')
    case 'JAMBI':
      return require('@/assets/img/prov-jambi.png?webp')
    case 'JAWA BARAT':
      return require('@/assets/img/prov-jawa-barat.png?webp')
    case 'JAWA TENGAH':
      return require('@/assets/img/prov-jawa-tengah.png?webp')
    case 'JAWA TIMUR':
      return require('@/assets/img/prov-jawa-timur.png?webp')
    case 'KALIMANTAN BARAT':
      return require('@/assets/img/prov-kalimantan-barat.png?webp')
    case 'KALIMANTAN SELATAN':
      return require('@/assets/img/prov-kalimantan-selatan.png?webp')
    case 'KALIMANTAN TENGAH':
      return require('@/assets/img/prov-kalimantan-tengah.png?webp')
    case 'KALIMANTAN TIMUR':
      return require('@/assets/img/prov-kalimantan-timur.png?webp')
    case 'KALIMANTAN UTARA':
      return require('@/assets/img/prov-kalimantan-utara.png?webp')
    case 'KEPULAUAN BANGKA BELITUNG':
      return require('@/assets/img/prov-kepulauan-bangka-belitung.png?webp')
    case 'KEPULAUAN RIAU':
      return require('@/assets/img/prov-kepulauan-riau.png?webp')
    case 'LAMPUNG':
      return require('@/assets/img/prov-lampung.png?webp')
    case 'MALUKU':
      return require('@/assets/img/prov-maluku.png?webp')
    case 'MALUKU UTARA':
      return require('@/assets/img/prov-maluku-utara.png?webp')
    case 'NUSA TENGGARA BARAT':
      return require('@/assets/img/prov-nusa-tenggara-barat.png?webp')
    case 'NUSA TENGGARA TIMUR':
      return require('@/assets/img/prov-nusa-tenggara-timur.png?webp')
    // case 'PAPUA':
    //   return require('@/assets/img/prov-papua.png?webp')
    // case 'PAPUA BARAT':
    //   return require('@/assets/img/prov-papua-barat.png?webp')
    case 'RIAU':
      return require('@/assets/img/prov-riau.png?webp')
    case 'SULAWESI BARAT':
      return require('@/assets/img/prov-sulawesi-barat.png?webp')
    case 'SULAWESI SELATAN':
      return require('@/assets/img/prov-sulawesi-selatan.png?webp')
    case 'SULAWESI TENGAH':
      return require('@/assets/img/prov-sulawesi-tengah.png?webp')
    case 'SULAWESI TENGGARA':
      return require('@/assets/img/prov-sulawesi-tenggara.png?webp')
    case 'SULAWESI UTARA':
      return require('@/assets/img/prov-sulawesi-utara.png?webp')
    case 'SUMATERA BARAT':
      return require('@/assets/img/prov-sumatera-barat.png?webp')
    case 'SUMATERA SELATAN':
      return require('@/assets/img/prov-sumatera-selatan.png?webp')
    case 'SUMATERA UTARA':
      return require('@/assets/img/prov-sumatera-utara.png?webp')
    default:
      if (ctx === 'blue') {
        return require('@/assets/img/placeholder-property-blue.png?webp')
      } else if (ctx === 'school') {
        return require('@/assets/img/placeholder-school.png')
      }
      return require('@/assets/img/placeholder-property-green.png?webp')
  }
}
