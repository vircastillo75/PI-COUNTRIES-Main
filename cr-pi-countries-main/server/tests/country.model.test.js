const { Country, Activity } = require('../src/db');

describe('Country Model', () => {
  beforeAll(async () => {
    await Country.sync({ force: true }); // Esto eliminará y recreará la tabla en cada ejecución de las pruebas
  });

  afterAll(async () => {
    await Country.drop();
  });

  it('should create a new country', async () => {
    const newCountry = await Country.create({
      id: 'ARG',
      name: 'Argentina',
      flag: 'flag_url',
      continent: 'South America',
      capital: 'Buenos Aires',
      subregion: 'Southern South America',
      area: '2766890',
      population: 45195777,
    });

    expect(newCountry.id).toBe('ARG');
    expect(newCountry.name).toBe('Argentina');
    expect(newCountry.flag).toBe('flag_url');
    // Asegúrate de agregar más expectativas para los otros campos
  });

  it('should not create a country without a required field', async () => {
    try {
      await Country.create({
        id: 'BRA', // Faltan otros campos requeridos
      });
    } catch (error) {
      expect(error.name).toBe('SequelizeValidationError');
    }
  });

  it('should find a country by ID', async () => {
    const foundCountry = await Country.findByPk('ARG');
    expect(foundCountry.id).toBe('ARG');
  });

  it('should update a country', async () => {
    const updatedCountry = await Country.update(
      {
        name: 'New Argentina Name',
      },
      {
        where: { id: 'ARG' },
        returning: true,
      }
    );

    expect(updatedCountry[1][0].name).toBe('New Argentina Name');
  });

  it('should delete a country', async () => {
    const deletedCountry = await Country.destroy({
      where: { id: 'ARG' },
    });
    expect(deletedCountry).toBe(1);
  });
});
