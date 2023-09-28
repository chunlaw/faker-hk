import FakeHker from "../src/index"

test('expect Person', () => {
  expect(JSON.stringify(new FakeHker({seed: 19911202}), null, 0))
    .toBe("{\"sex\":\"m\",\"chnFirstname\":\"永鏗\",\"hkid\":\"XA2021193\",\"chnSurname\":\"區\",\"firstname\":\"Wing Hang\",\"surname\":\"Au\",\"avatar\":\"https://avatars.githubusercontent.com/u/1158798\",\"birth\":\"2009-12-03T07:41:10.880Z\",\"phone\":\"69911201\",\"address\":\"46 TUEN LUNG STREET, TUEN MUN DISTRICT\",\"chnAddress\":\"屯門區屯隆街46號\"}")
})