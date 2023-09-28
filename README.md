Faker HK
=========

Faker HK is a tool to generate fake Hongkongers' profile in ethnic Chinese. The package draws over 2 million naming combinations with proper Cantonese Romanisation. The package is based on [Cantonese Romanisation](https://github.com/chunlaw/cantonese-romanisation) and [hkid](https://github.com/tsekityam/hkid). 

Demo is available [here](https://faker-hk.chunlaw.io/).

## Install
```
npm install faker-hk
```
or
```
yarn add faker-hk
```

## Usage

__new Person(seed?: number)__
```ts
import Person from "faker-hk";
// @return: a random person profile
console.log(new Person())

// @return a profile with seed specified
console.log(JSON.stringify(new Person(19911202)))
/*
{
    "sex": "m",
    "chnFirstname": "潤成",
    "hkid": "XA2021193",
    "chnSurname": "黃",
    "firstname": "Yun Shing",
    "surname": "Wong",
    "avatar": "https://avatars.githubusercontent.com/u/19911202",
    "birth": "1942-01-06T16:20:07.197Z",
    "phone": "69911201",
    "address": "45 TUEN LUNG STREET, TUEN MUN DISTRICT",
    "chnAddress": "屯門區屯隆街45號"
}
*/
```

## Dictionary

If you would like to update the dictionary, you may checkout `./dictionary/*.json` in the repository.

## Contribute
Project owner [chunlaw](https://github.com/chunlaw) is the initiator of the whole project. Everyone is welcome to contribute.

## License

MIT license