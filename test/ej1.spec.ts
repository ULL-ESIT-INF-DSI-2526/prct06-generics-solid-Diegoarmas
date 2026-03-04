import {describe, expect, it} from 'vitest';
import {
  HolocronCollection,
  JediMasterCollection,
  StarshipCollection,
} from '../src/ej1';

describe('JediMasterCollection', () => {
  it('permite búsquedas por nombre, afiliación, nivel, clase, año y planeta', () => {
    const collection = new JediMasterCollection();

    collection.add({
      name: 'Yoda',
      affiliation: 'República',
      powerLevel: 100,
      jediClass: 'Gran Maestro',
      formationYear: -800,
      originPlanet: 'Dagobah',
    });

    collection.add({
      name: 'Anakin Skywalker',
      affiliation: 'Sith',
      powerLevel: 95,
      jediClass: 'Caballero',
      formationYear: -22,
      originPlanet: 'Tatooine',
    });

    expect(collection.findByName('yoda')).toHaveLength(1);
    expect(collection.findByAffiliation('República')).toHaveLength(1);
    expect(collection.findByPowerLevel(95)).toHaveLength(1);
    expect(collection.findByClass('caballero')).toHaveLength(1);
    expect(collection.findByYear(-800)).toHaveLength(1);
    expect(collection.findByOriginPlanet('tatooine')).toHaveLength(1);
  });

  it('elimina por nombre y mantiene consistencia interna', () => {
    const collection = new JediMasterCollection();

    collection.add({
      name: 'Mace Windu',
      affiliation: 'República',
      powerLevel: 91,
      jediClass: 'Maestro',
      formationYear: -57,
      originPlanet: 'Haruun Kal',
    });

    expect(collection.count()).toBe(1);
    expect(collection.removeByName('mace windu')).toBe(true);
    expect(collection.count()).toBe(0);
    expect(collection.removeByName('mace windu')).toBe(false);
  });
});

describe('StarshipCollection', () => {
  it('modela naves y permite filtrar por todos los criterios comunes', () => {
    const collection = new StarshipCollection();

    collection.add({
      name: 'X-Wing',
      affiliation: 'República',
      powerLevel: 80,
      starshipClass: 'Caza estelar',
      constructionYear: -5,
      originPlanet: 'Incom-FreiTek',
    });

    collection.add({
      name: 'TIE Interceptor',
      affiliation: 'Imperio',
      powerLevel: 78,
      starshipClass: 'Interceptor',
      constructionYear: 3,
      originPlanet: 'Sienar',
    });

    expect(collection.findByAffiliation('Imperio').map((ship) => ship.name)).toContain(
      'TIE Interceptor',
    );
    expect(collection.findByClass('caza estelar').map((ship) => ship.name)).toContain(
      'X-Wing',
    );
    expect(collection.findByYear(3)).toHaveLength(1);
      expect(collection.findByPowerLevel(80).map((ship) => ship.name)).toContain(
        'X-Wing',
      );
      expect(
        collection.findByOriginPlanet('sienar').map((ship) => ship.name),
      ).toContain('TIE Interceptor');
  });
});

describe('HolocronCollection', () => {
  it('modela holocrones y conserva extensibilidad del diseño', () => {
    const collection = new HolocronCollection();

    collection.add({
      name: 'Holocrón de Bane',
      affiliation: 'Sith',
      powerLevel: 88,
      holocronClass: 'Saber prohibido',
      creationYear: -1000,
      originPlanet: 'Moraband',
    });

    collection.add({
      name: 'Holocrón de Kenobi',
      affiliation: 'República',
      powerLevel: 75,
      holocronClass: 'Estrategia Jedi',
      creationYear: -19,
      originPlanet: 'Coruscant',
    });

    expect(collection.getAll()).toHaveLength(2);
    expect(collection.findByPowerLevel(88)).toHaveLength(1);
    expect(collection.findByOriginPlanet('coruscant')).toHaveLength(1);
      expect(
        collection.findByAffiliation('Sith').map((holocron) => holocron.name),
      ).toContain('Holocrón de Bane');
      expect(
        collection.findByClass('saber prohibido').map((holocron) => holocron.name),
      ).toContain('Holocrón de Bane');
      expect(collection.findByYear(-19).map((holocron) => holocron.name)).toContain(
        'Holocrón de Kenobi',
      );
  });
});