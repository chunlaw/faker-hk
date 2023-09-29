import FakeHker from "../src/index"

test('expect Person 19911202', () => {
  expect(JSON.stringify(new FakeHker({seeds: 19911202}), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"永鏗\",\"hkid\":\"XA2021193\",\"chnSurname\":\"區\",\"firstname\":\"Wing Hang\",\"surname\":\"Au\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"2009-12-03T07:41:10.880Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})

test('expect Person 19911202', () => {
  expect(JSON.stringify(new FakeHker({seeds: [19911202]}), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"永鏗\",\"hkid\":\"XA2021193\",\"chnSurname\":\"區\",\"firstname\":\"Wing Hang\",\"surname\":\"Au\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"2009-12-03T07:41:10.880Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})

test('expect Person 19631005 19911016 19911202 19960107', () => {
  expect(JSON.stringify(new FakeHker({seeds: [19631005, 19911016, 19911202, 19960107]}), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"毅賢\",\"hkid\":\"XA2021193\",\"chnSurname\":\"梁\",\"firstname\":\"Ngai Yin\",\"surname\":\"Leung\",\"avatar\":\"https://avatars.githubusercontent.com/u/71144893\",\"birth\":\"1967-07-08T19:09:04.275Z\",\"phone\":\"69911201\",\"address\":\"32 WING YIP STREET, KWUN TONG DISTRICT\",\"chnAddress\":\"觀塘區榮業街32號\"}")
})

test('expect Person 19911202, birth std: half year', () => {
  expect(JSON.stringify(new FakeHker({seeds: 19911202, avgBirthTs: (new Date("1991-12-02")).getTime(), ageStd: 0.5}), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"永鏗\",\"hkid\":\"XA2021193\",\"chnSurname\":\"區\",\"firstname\":\"Wing Hang\",\"surname\":\"Au\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"1992-11-06T22:39:22.362Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})

test('expect Person 19911202, birth std: 0.1 year', () => {
  expect(JSON.stringify(new FakeHker({seeds: 19911202, avgBirthTs: (new Date("1991-12-02")).getTime(), ageStd: 0.1}), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"永鏗\",\"hkid\":\"XA2021193\",\"chnSurname\":\"區\",\"firstname\":\"Wing Hang\",\"surname\":\"Au\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"1992-02-08T04:31:52.472Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})