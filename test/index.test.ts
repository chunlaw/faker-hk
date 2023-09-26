import Person, { randomHkid } from "../src/index"

test('expect Person', () => {
  expect(JSON.stringify(new Person(19911202), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"潤成\",\"hkid\":\"XA2021193\",\"chnSurname\":\"黃\",\"firstname\":\"Yun Shing\",\"surname\":\"Wong\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"1942-01-06T16:20:07.197Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})