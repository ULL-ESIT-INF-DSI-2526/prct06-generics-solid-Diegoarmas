/**
 * Interfaz que representa un objeto reproducible, con métodos para obtener sus datos y duración.
 * @template T El tipo de datos que representa el objeto reproducible.
 * @method data Devuelve los datos del objeto reproducible.
 * @method duration Devuelve la duración del objeto reproducible en segundos.
 */
export interface Reproducible<T> {
  data(): T;
  duration(): number;
}
