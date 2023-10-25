// db.test.js
const { Country, Activity, conn } = require('../src/db');

describe('Database Configuration', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
  });

  it('should define the Country and Activity models', () => {
    expect(Country).toBeDefined();
    expect(Activity).toBeDefined();
  });

  it('should establish the relationship between Country and Activity', () => {
    // Verifica las relaciones entre los modelos
    const associations = Object.keys(Country.associations);

    expect(associations.includes('Activities')).toBe(true);
    expect(Country.associations.Activities.target).toBe(Activity);

    const activityAssociations = Object.keys(Activity.associations);

    expect(activityAssociations.includes('Countries')).toBe(true);
    expect(Activity.associations.Countries.target).toBe(Country);
  });

  afterAll(async () => {
    await conn.close();
  });
});
