import { Reproducible } from "./Reproducible";

/**
 * Clase que representa un historial de objetos reproducibles, permitiendo agregar, eliminar, obtener y filtrar elementos, así como calcular la duración total.
 * @template T El tipo de objetos reproducibles que se almacenan en el historial, que debe implementar la interfaz Reproducible.
 * @method add Agrega un objeto reproducible al historial.
 * @method remove Elimina un objeto reproducible del historial por su índice.
 * @method get Obtiene un objeto reproducible del historial por su índice.
 * @method size Devuelve el número de objetos reproducibles en el historial.
 * @method filter Devuelve un nuevo historial con los objetos reproducibles que cumplen una condición dada por una función de predicado.
 * @method duration Devuelve la duración total de todos los objetos reproducibles en el historial sumando sus duraciones individuales.
 * @throws {Error} Si se intenta acceder a un índice fuera del rango del historial.
 */
export class History<T extends Reproducible<unknown>> {
  private readonly items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public remove(index: number): void {
    this.checkIndex(index);
    this.items.splice(index, 1);
  }

  public get(index: number): T {
    this.checkIndex(index);
    return this.items[index];
  }

  public size(): number {
    return this.items.length;
  }

  public filter(predicate: (item: T, index: number) => boolean): History<T> {
    const filteredHistory = new History<T>();
    this.items.forEach((item, index) => {
      if (predicate(item, index)) {
        filteredHistory.add(item);
      }
    });
    return filteredHistory;
  }

  public duration(): number {
    return this.items.reduce(
      (totalDuration, item) => totalDuration + item.duration(),
      0,
    );
  }

  private checkIndex(index: number): void {
    if (!Number.isInteger(index) || index < 0 || index >= this.items.length) {
      throw new Error("History index out of range");
    }
  }
}
