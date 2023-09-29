import names from "./name.json"
import surnames from "./surname.json"
import { street, dc } from "./addr.json"
import { getRoman } from "cantonese-romanisation"
import random, { gaussianRandom } from "./utils"
import { randomHkid } from "./hkid"

export interface FakeHKerOption {
  seeds?: number | number[];
  avgBirthTs?: number;
  ageStd?: number;
}

const getFirstUpperCase = (v: string): string => {
  return v.replace(/^./, v[0].toUpperCase())
}

export default class FakeHKer {
  firstname: string
  surname: string
  chnSurname: string
  chnFirstname: string
  sex: string;
  hkid: string;
  birth: Date;
  avatar: string;
  phone: string;
  address: string;
  chnAddress: string;

  constructor({seeds, avgBirthTs = 376099200000, ageStd = 15}: FakeHKerOption = {}) {
    const _seeds: number[] = []
    if ( seeds === undefined || ( Array.isArray(seeds) && seeds.length === 0 ) ) {
      for ( let i=0;i<20;++i ) {
        _seeds.push(random())
      }
    } else if ( Array.isArray(seeds) ) {
      for ( let i=0;i<20;++i ) {
        _seeds.push(seeds[i%seeds.length])
      }
    } else {
      for ( let i=0;i<20;++i ) {
        _seeds.push(seeds)
      }
    }

    let _seedIdx = 0;
    this.sex = _seeds[_seedIdx++] % 1865 < 865 ? 'm' : 'f'
    // @ts-ignore
    this.chnFirstname = names[this.sex][_seeds[_seedIdx++] % names[this.sex].length]
    this.hkid = randomHkid(_seeds[_seedIdx++])
    this.chnSurname = ((seed: number) => {
      let v = seed % 100000
      for ( let i=0;i<surnames.length;++i ) {
        if ( v < surnames[i].prob * 100000 ) {
          return surnames[i].value
        }
        v -= surnames[i].prob * 100000
      }
      return surnames[surnames.length-1].value
    })(_seeds[_seedIdx++])
    
    this.firstname = getRoman(this.chnFirstname).map(v => getFirstUpperCase(v[_seeds[_seedIdx++] % v.length])).join(" ")
    this.surname = getRoman(this.chnSurname).map(v => getFirstUpperCase(v[(_seeds[_seedIdx++]) % v.length])).join(" ")
    this.avatar = `https://avatars.githubusercontent.com/u/${(_seeds[_seedIdx++]) * 9999999 % 146095000}`
    this.birth = new Date(gaussianRandom(_seeds[_seedIdx++], avgBirthTs, ageStd * 365.25 * 24 * 60 * 60 * 1000))
    // @ts-ignore
    this.phone = ['5', '6', '9'].at(_seeds[_seedIdx++] % 3) + (_seeds[_seedIdx++] + 9999999) % 10000000
    const _street = {...street[_seeds[_seedIdx++]%street.length], no: Math.floor(_seeds[_seedIdx++] / 20000) % 50 + 1 }
    // @ts-ignore
    this.address = _street.no + " " + _street.en + ", " + dc[_street.dc].en.toUpperCase()
    // @ts-ignore
    this.chnAddress = dc[_street.dc].zh + _street.zh + _street.no + "號"
  }
}
