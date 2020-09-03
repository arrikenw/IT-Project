const users = require('../../controllers/user');

test('adds 1 + 2 to equal 3', () => {
    expect(users.myAdd(1, 2)).toBe(3);
});