import names from "./name.json"
import surnames from "./surname.json"
import { street, dc } from "./addr.json"
import { getRoman } from "cantonese-romanisation"
import random, { gaussianRandom } from "./utils"
import { randomHkid } from "./hkid"

export class Person {
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

  constructor(seed?: number) {
    
    this.sex = (seed ?? random()) % 1865 < 865 ? 'm' : 'f'
    // @ts-ignore
    this.chnFirstname = names[this.sex][(seed ?? random()) % names[this.sex].length]
    this.hkid = randomHkid(seed ?? random())
    this.chnSurname = ((seed: number) => {
      let v = seed % 100000
      for ( let i=0;i<surnames.length;++i ) {
        if ( v < surnames[i].prob * 100000 ) {
          return surnames[i].value
        }
        v -= surnames[i].prob * 100000
      }
      return surnames[surnames.length-1].value
    })(seed ?? random())
    
    this.firstname = getRoman(this.chnFirstname).map(v => v[0].replace(/^./, v[0][0].toUpperCase())).join(" ")
    this.surname = getRoman(this.chnSurname).map(v => v[0].replace(/^./, v[0][0].toUpperCase())).join(" ")
    this.avatar = `https://avatars.githubusercontent.com/u/${(seed ?? random()) * 9999999 % 146095000}`
    this.birth = new Date(gaussianRandom(seed ?? random(), 45, 15) * -1 * 365 * 24 * 60 * 60 * 1000 + 45 * 365 * 24 * 60 * 60 * 1000)
    // @ts-ignore
    this.phone = ['5', '6', '9'].at((seed ?? random()) % 3) + ((seed ?? random()) + 9999999) % 10000000
    const _street = {...street[(seed ?? random())%street.length], no: Math.floor((seed ?? random()) / 20000) % 50 + 1 }
    // @ts-ignore
    this.address = _street.no + " " + _street.en + ", " + dc[_street.dc].en.toUpperCase()
    // @ts-ignore
    this.chnAddress = dc[_street.dc].zh + _street.zh + _street.no + "號"
  }
}
