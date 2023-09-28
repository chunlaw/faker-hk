import FakeHker from "../src/index"

test('expect Person', () => {
  expect(JSON.stringify(new FakeHker(19911202), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"永鏗\",\"hkid\":\"XA2021193\",\"chnSurname\":\"區\",\"firstname\":\"Wing Hang\",\"surname\":\"Au\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"1950-01-04T16:20:07.197Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})